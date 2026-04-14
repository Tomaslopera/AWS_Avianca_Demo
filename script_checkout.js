/**
 * script_checkout.js
 * Checkout completo: ida simple o ida y vuelta en un solo flujo
 * Pasos: Vuelo → Pasajeros → Asientos (ida) → [Asientos vuelta] → Equipaje → Pago → Confirmación
 */

// ─── ESTADO GLOBAL ────────────────────────────────────────────────────────────

const checkout = {
  params:            {},
  flight:            null,
  returnFlight:      null,
  cabin:             'economica',
  passengers:        1,
  passengerData:     [],
  selectedSeats:     [],
  selectedReturnSeats: [],
  
  baggage:           [],
  basePrice:         0,
  baggageTotal:      0,
  upgradeTotal:      0,
  seatUpgrades:      {},
  currentStep:       1,
  isRound:           false,
};

const BAGGAGE_PRICES = { hand: 0, bag23: 89000, bag32: 149000 };

// ─── PARSE PARAMS ─────────────────────────────────────────────────────────────

function parseCheckoutParams() {
  const p = new URLSearchParams(window.location.search);
  return {
    outboundId: p.get('outboundId') || p.get('flightId') || '',
    returnId:   p.get('returnId')   || '',
    cabin:      p.get('cabin')      || 'economica',
    passengers: parseInt(p.get('passengers') || '1'),
    dateStart:  p.get('dateStart')  || '',
    dateEnd:    p.get('dateEnd')    || '',
    trip:       p.get('trip')       || 'oneway',
  };
}

// ─── STEPPER ──────────────────────────────────────────────────────────────────

function buildStepper() {
  // Si es ida y vuelta, insertar paso extra "Asientos vuelta"
  const stepperContainer = document.querySelector('.stepper-container');
  if (checkout.isRound) {
    // Insertar después del paso 3 (asientos)
    const line = document.createElement('div');
    line.className = 'step-line';
    line.id = 'stepLine3b';
    const step = document.createElement('div');
    step.className = 'step';
    step.dataset.step = '3b';
    step.innerHTML = `
      <div class="step-circle" id="stepCircle3b">4</div>
      <span class="step-label">Asientos vuelta</span>
    `;
    // Renumerar pasos 4 y 5 a 5 y 6
    document.querySelectorAll('.step').forEach(el => {
      const n = parseInt(el.dataset.step);
      if (n >= 4) {
        el.dataset.step = n + 1;
        el.querySelector('.step-circle').textContent = n + 1;
      }
    });
    document.querySelectorAll('.step-line').forEach((el, i) => {
      if (i >= 2) el.id = `stepLine${i + 2}`;
    });
    // Insertar después del 3er step-line
    const lines = stepperContainer.querySelectorAll('.step-line');
    lines[2].insertAdjacentElement('afterend', step);
    step.insertAdjacentElement('afterend', line);
  }
}

function goToStep(step) {
  document.querySelectorAll('.checkout-step').forEach(el => el.classList.add('hidden'));
  document.getElementById(`step${step}`).classList.remove('hidden');

  const allSteps = [...document.querySelectorAll('.step')];
  allSteps.forEach((el, i) => {
    el.classList.remove('active', 'completed');
    if (i + 1 < step)  el.classList.add('completed');
    if (i + 1 === step) el.classList.add('active');
  });

  document.querySelectorAll('.step-line').forEach((el, i) => {
    el.classList.toggle('completed', i + 1 < step);
  });

  checkout.currentStep = step;
  updatePriceSidebar();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function nextStep() { goToStep(checkout.currentStep + 1); }
function prevStep() { goToStep(checkout.currentStep - 1); }

// ─── STEP 1: FLIGHT SUMMARY ───────────────────────────────────────────────────

function renderFlightSummary() {
  const flight = checkout.flight;
  const cabin  = checkout.cabin;

  checkout.basePrice = flight.prices[cabin] * checkout.passengers;
  if (checkout.returnFlight) {
    checkout.basePrice += checkout.returnFlight.prices[cabin] * checkout.passengers;
  }

  renderSummaryCard(flight, 'flightSummaryCard', 'ida');

  if (checkout.returnFlight) {
    const returnCard = document.getElementById('returnSummaryCard');
    returnCard.style.display = 'block';
    renderSummaryCard(checkout.returnFlight, 'returnSummaryCard', 'vuelta');
  }
}

function renderSummaryCard(flight, containerId, direction) {
  const isDirect   = flight.stops.length === 0;
  const stopsClass = isDirect ? 'direct' : 'withstop';
  const stopsText  = isDirect ? 'Directo' : `${flight.stops.length} escala`;
  const cabinLabel = checkout.cabin === 'economica' ? 'Económica' : 'Ejecutiva';
  const date       = direction === 'ida' ? checkout.params.dateStart : checkout.params.dateEnd;

  const stopRows = flight.stops.map(s => `
    <div class="summary-meta-item">
      <span class="summary-meta-label">Escala</span>
      <span class="summary-meta-value">${s.city} (${s.code}) · ${s.layover}</span>
    </div>
  `).join('');

  document.getElementById(containerId).innerHTML = `
    <div class="summary-badge ${direction === 'vuelta' ? 'return' : ''}">
      ${direction === 'ida' ? '✈ Vuelo de ida' : '↩ Vuelo de vuelta'}
    </div>
    <div class="summary-route-row">
      <div>
        <div class="summary-time">${flight.departure}</div>
        <div class="summary-code">${flight.origin} · ${flight.originCity}</div>
      </div>
      <div class="summary-arrow">
        <div class="summary-duration">${flight.duration}</div>
        <div class="summary-arrow-line"></div>
        <span class="summary-stops-badge ${stopsClass}">${stopsText}</span>
      </div>
      <div style="text-align:right">
        <div class="summary-time">${flight.arrival}</div>
        <div class="summary-code">${flight.destination} · ${flight.destinationCity}</div>
      </div>
    </div>
    <div class="summary-meta">
      <div class="summary-meta-item">
        <span class="summary-meta-label">Vuelo</span>
        <span class="summary-meta-value">${flight.flightNumber}</span>
      </div>
      <div class="summary-meta-item">
        <span class="summary-meta-label">Avión</span>
        <span class="summary-meta-value">${flight.aircraft}</span>
      </div>
      <div class="summary-meta-item">
        <span class="summary-meta-label">Clase</span>
        <span class="summary-meta-value">${cabinLabel}</span>
      </div>
      ${date ? `<div class="summary-meta-item">
        <span class="summary-meta-label">Fecha</span>
        <span class="summary-meta-value">${date}</span>
      </div>` : ''}
      <div class="summary-meta-item">
        <span class="summary-meta-label">Pasajeros</span>
        <span class="summary-meta-value">${checkout.passengers}</span>
      </div>
      ${stopRows}
    </div>
  `;
}

// ─── STEP 2: PASSENGERS FORM ──────────────────────────────────────────────────

function renderPassengersForm() {
  const container = document.getElementById('passengersForm');
  container.innerHTML = '';

  for (let i = 0; i < checkout.passengers; i++) {
    const block = document.createElement('div');
    block.className = 'passenger-form-block';
    block.innerHTML = `
      <div class="passenger-form-title">
        <div class="passenger-number-badge">${i + 1}</div>
        Pasajero ${i + 1}${i === 0 ? ' (Principal)' : ''}
      </div>
      <div class="form-grid">
        <div class="form-field">
          <label>Nombre(s) *</label>
          <input type="text" id="p${i}_firstName" placeholder="Nombres">
        </div>
        <div class="form-field">
          <label>Apellidos *</label>
          <input type="text" id="p${i}_lastName" placeholder="Apellidos">
        </div>
        <div class="form-field">
          <label>Tipo de documento *</label>
          <select id="p${i}_docType">
            <option value="CC">Cédula de ciudadanía</option>
            <option value="CE">Cédula de extranjería</option>
            <option value="PA">Pasaporte</option>
            <option value="TI">Tarjeta de identidad</option>
          </select>
        </div>
        <div class="form-field">
          <label>Número de documento *</label>
          <input type="text" id="p${i}_docNumber" placeholder="Número">
        </div>
        <div class="form-field">
          <label>Fecha de nacimiento *</label>
          <input type="date" id="p${i}_birthDate">
        </div>
        <div class="form-field">
          <label>Nacionalidad</label>
          <select id="p${i}_nationality">
            <option value="CO">Colombia</option>
            <option value="VE">Venezuela</option>
            <option value="PE">Perú</option>
            <option value="EC">Ecuador</option>
            <option value="AR">Argentina</option>
            <option value="BR">Brasil</option>
            <option value="MX">México</option>
            <option value="US">Estados Unidos</option>
            <option value="ES">España</option>
            <option value="OTHER">Otro</option>
          </select>
        </div>
        ${i === 0 ? `
        <div class="form-field">
          <label>Email de contacto *</label>
          <input type="email" id="p${i}_email" placeholder="correo@ejemplo.com">
        </div>
        <div class="form-field">
          <label>Teléfono de contacto *</label>
          <input type="tel" id="p${i}_phone" placeholder="+57 300 000 0000">
        </div>` : ''}
      </div>
    `;
    container.appendChild(block);
  }
}

function validatePassengersAndNext() {
  const data = [];
  let valid  = true;

  for (let i = 0; i < checkout.passengers; i++) {
    const firstName = document.getElementById(`p${i}_firstName`);
    const lastName  = document.getElementById(`p${i}_lastName`);
    const docNumber = document.getElementById(`p${i}_docNumber`);

    [firstName, lastName, docNumber].forEach(el => el.classList.remove('error'));

    if (!firstName.value.trim()) { firstName.classList.add('error'); valid = false; }
    if (!lastName.value.trim())  { lastName.classList.add('error');  valid = false; }
    if (!docNumber.value.trim()) { docNumber.classList.add('error'); valid = false; }

    if (i === 0) {
      const email = document.getElementById(`p${i}_email`);
      const phone = document.getElementById(`p${i}_phone`);
      if (!email.value.trim()) { email.classList.add('error'); valid = false; }
      if (!phone.value.trim()) { phone.classList.add('error'); valid = false; }
    }

    data.push({
      firstName:   document.getElementById(`p${i}_firstName`).value.trim(),
      lastName:    document.getElementById(`p${i}_lastName`).value.trim(),
      docType:     document.getElementById(`p${i}_docType`).value,
      docNumber:   document.getElementById(`p${i}_docNumber`).value.trim(),
      birthDate:   document.getElementById(`p${i}_birthDate`).value,
      nationality: document.getElementById(`p${i}_nationality`).value,
      email:       i === 0 ? document.getElementById(`p${i}_email`).value.trim() : '',
      phone:       i === 0 ? document.getElementById(`p${i}_phone`).value.trim() : '',
    });
  }

  if (!valid) {
    alert('Por favor completa todos los campos obligatorios marcados en rojo.');
    return;
  }

  checkout.passengerData = data;
  nextStep();
  renderSeatMap('outbound');
}

// ─── STEP 3 & 4: SEAT MAP ─────────────────────────────────────────────────────

function getSeatConfig(flight) {
  const is787 = flight.aircraft.includes('787');
  if (is787) {
    return {
      is787: true, totalRows: 40, execRows: 8,
      econCols: ['A','B','C','D','E','F','G','H'], econAisles: [2, 6],
      execCols: ['A','C','D','G'], execAisles: [1, 3],
    };
  }
  return {
    is787: false, totalRows: 30, execRows: 4,
    econCols: ['A','B','C','D','E','F'], econAisles: [3],
    execCols: ['A','B','C','D','E','F'], execAisles: [3],
  };
}

function generateOccupiedSeats(flight) {
  const config    = getSeatConfig(flight);
  const occupied  = new Set();
  const available = flight.seatsLeft[checkout.cabin];

  const totalExec  = config.execRows * config.execCols.length;
  const totalEcon  = (config.totalRows - config.execRows) * config.econCols.length;
  const totalSeats = totalExec + totalEcon;
  const count      = Math.max(0, totalSeats - available);

  let seed = 0;
  for (let i = 0; i < flight.id.length; i++) seed += flight.id.charCodeAt(i);

  let attempts = 0;
  while (occupied.size < count && attempts < count * 10) {
    attempts++;
    seed = (seed * 9301 + 49297) % 233280;
    const row       = (seed % config.totalRows) + 1;
    seed = (seed * 9301 + 49297) % 233280;
    const isExecRow = row <= config.execRows;
    const colSet    = isExecRow ? config.execCols : config.econCols;
    const col       = colSet[seed % colSet.length];
    occupied.add(`${row}${col}`);
  }
  return occupied;
}

function buildHeaderRow(cols, aisles) {
  let html = '';
  cols.forEach((col, idx) => {
    if (aisles.includes(idx)) html += `<div class="seat-aisle"></div>`;
    html += `<div class="seat-col-label">${col}</div>`;
  });
  return html;
}

function renderSeatMap(direction) {
  // direction: 'outbound' | 'return'
  const flight     = direction === 'outbound' ? checkout.flight : checkout.returnFlight;
  const seatsArray = direction === 'outbound' ? checkout.selectedSeats : checkout.selectedReturnSeats;
  const container  = document.getElementById('seatSelectorContainer');
  const stepTitle  = document.getElementById('seatStepTitle');

  if (stepTitle) {
    stepTitle.textContent = direction === 'outbound'
      ? `Asientos — Vuelo de ida (${flight.origin} → ${flight.destination})`
      : `Asientos — Vuelo de vuelta (${flight.origin} → ${flight.destination})`;
  }

  container.innerHTML = '';
  container.dataset.direction = direction;

  const config   = getSeatConfig(flight);
  const occupied = generateOccupiedSeats(flight);

  if (seatsArray.length === 0) {
    for (let i = 0; i < checkout.passengers; i++) seatsArray.push(null);
  }

  for (let p = 0; p < checkout.passengers; p++) {
    const block = document.createElement('div');
    block.className = 'seat-selector-block';

    const passengerName = checkout.passengerData[p]
      ? `${checkout.passengerData[p].firstName} ${checkout.passengerData[p].lastName}`
      : `Pasajero ${p + 1}`;

    block.innerHTML = `
      <div class="seat-selector-title">
        <div class="passenger-number-badge">${p + 1}</div>
        ${passengerName}
        <span style="font-size:12px;color:#888;font-weight:400;margin-left:8px;">${flight.aircraft}</span>
      </div>
      <div class="seat-legend">
        <div class="legend-item"><div class="legend-dot available"></div> Disponible</div>
        <div class="legend-item"><div class="legend-dot occupied"></div> Ocupado</div>
        <div class="legend-item"><div class="legend-dot selected"></div> Seleccionado</div>
        <div class="legend-item"><div class="legend-dot executive"></div> Ejecutiva (+upgrade)</div>
      </div>
      <div class="seat-map">
        <div class="seat-map-plane" id="seatMap_${p}">
          ${config.execRows > 0 ? `
          <div class="seat-section-label">✦ Clase Ejecutiva — Filas 1–${config.execRows}</div>
          <div class="seat-row seat-header-row">
            <div class="seat-row-number"></div>
            ${buildHeaderRow(config.execCols, config.execAisles)}
          </div>` : ''}
        </div>
      </div>
      <div class="selected-seat-info" id="seatInfo_${p}" style="display:none;">
        ✅ Asiento seleccionado: <strong id="seatInfoText_${p}"></strong>
      </div>
    `;

    container.appendChild(block);

    const mapEl = document.getElementById(`seatMap_${p}`);
    let econHeaderAdded = false;

    for (let row = 1; row <= config.totalRows; row++) {
      const isExecRow = row <= config.execRows;
      const cols      = isExecRow ? config.execCols   : config.econCols;
      const aisles    = isExecRow ? config.execAisles : config.econAisles;

      if (!isExecRow && !econHeaderAdded) {
        econHeaderAdded = true;
        const divider = document.createElement('div');
        divider.className = 'seat-section-label econ';
        divider.textContent = `✈ Clase Económica — Filas ${config.execRows + 1}–${config.totalRows}`;
        mapEl.appendChild(divider);
        const econHeader = document.createElement('div');
        econHeader.className = 'seat-row seat-header-row';
        econHeader.innerHTML = `<div class="seat-row-number"></div>${buildHeaderRow(config.econCols, config.econAisles)}`;
        mapEl.appendChild(econHeader);
      }

      const rowEl = document.createElement('div');
      rowEl.className = `seat-row${isExecRow ? ' exec-row' : ''}`;
      const rowNum = document.createElement('div');
      rowNum.className = 'seat-row-number';
      rowNum.textContent = row;
      rowEl.appendChild(rowNum);

      cols.forEach((col, colIdx) => {
        if (aisles.includes(colIdx)) {
          const aisle = document.createElement('div');
          aisle.className = 'seat-aisle';
          rowEl.appendChild(aisle);
        }

        const seatId       = `${row}${col}`;
        const isOcc        = occupied.has(seatId);
        const isSelByOther = seatsArray.some((s, idx) => s === seatId && idx !== p);
        const seat         = document.createElement('div');
        seat.className     = `seat${isExecRow ? ' exec-size' : ''}`;
        seat.textContent   = col;
        seat.dataset.seat  = seatId;

        if (isOcc || isSelByOther) {
          // ocupado
        } else if (seatsArray[p] === seatId) {
          seat.classList.add('selected');
        } else if (isExecRow) {
          seat.classList.add('executive', 'available');
        } else {
          seat.classList.add('available');
        }

        if (!isOcc && !isSelByOther) {
          seat.addEventListener('click', () => {
            selectSeat(p, seatId, isExecRow, direction);
            renderSeatMap(direction);
          });
        }

        rowEl.appendChild(seat);
      });

      mapEl.appendChild(rowEl);
    }

    if (seatsArray[p]) {
      const infoEl = document.getElementById(`seatInfo_${p}`);
      const textEl = document.getElementById(`seatInfoText_${p}`);
      infoEl.style.display = 'block';
      const rowNum = parseInt(seatsArray[p]);
      textEl.textContent = `${seatsArray[p]} · ${rowNum <= config.execRows ? 'Ejecutiva' : 'Económica'} · Fila ${rowNum}`;
    }
  }
}

function selectSeat(passengerIdx, seatId, isExecRow, direction) {
  const seatsArray = direction === 'outbound' ? checkout.selectedSeats : checkout.selectedReturnSeats;

  if (seatsArray[passengerIdx] === seatId) {
    seatsArray[passengerIdx] = null;
    checkout.seatUpgrades[`${direction}_${passengerIdx}`] = 0;
  } else {
    seatsArray[passengerIdx] = seatId;
    if (isExecRow && checkout.cabin === 'economica') {
      const flight = direction === 'outbound' ? checkout.flight : checkout.returnFlight;
      const diff   = flight.prices['ejecutiva'] - flight.prices['economica'];
      checkout.seatUpgrades[`${direction}_${passengerIdx}`] = diff > 0 ? diff : 0;
    } else {
      checkout.seatUpgrades[`${direction}_${passengerIdx}`] = 0;
    }
  }

  checkout.upgradeTotal = Object.values(checkout.seatUpgrades).reduce((a, b) => a + b, 0);
  updatePriceSidebar();
}

function validateSeatsAndNext() {
  const direction  = document.getElementById('seatSelectorContainer').dataset.direction;
  const seatsArray = direction === 'outbound' ? checkout.selectedSeats : checkout.selectedReturnSeats;
  const unselected = seatsArray.filter(s => !s);

  if (unselected.length > 0) {
    alert(`Por favor selecciona asiento para todos los pasajeros.`);
    return;
  }

  // Si es ida y vuelta y acaba de seleccionar ida → ir a asientos vuelta
  if (direction === 'outbound' && checkout.isRound) {
    nextStep();
    renderSeatMap('return');
    return;
  }

  // Si es vuelta o solo ida → ir a equipaje
  nextStep();
  renderBaggageOptions();
}

// ─── STEP 4/5: BAGGAGE ────────────────────────────────────────────────────────

function renderBaggageOptions() {
  const container = document.getElementById('baggageContainer');
  container.innerHTML = '';

  if (checkout.baggage.length === 0) {
    const defaultBaggage = checkout.cabin === 'ejecutiva' ? 'bag23' : 'hand';
    checkout.baggage = new Array(checkout.passengers).fill(defaultBaggage);
  }

  for (let p = 0; p < checkout.passengers; p++) {
    const passengerName = checkout.passengerData[p]
      ? `${checkout.passengerData[p].firstName} ${checkout.passengerData[p].lastName}`
      : `Pasajero ${p + 1}`;

    const block = document.createElement('div');
    block.className = 'baggage-passenger-block';
    block.innerHTML = `
      <div class="baggage-passenger-title">
        <span style="width:24px;height:24px;font-size:12px;border-radius:50%;background:#E30613;color:white;display:inline-flex;align-items:center;justify-content:center;margin-right:8px;">${p+1}</span>
        ${passengerName}
      </div>
      <div class="baggage-options">
        <div class="baggage-option ${checkout.baggage[p] === 'hand' ? 'selected' : ''}" onclick="selectBaggage(${p}, 'hand', this)">
          <div class="baggage-option-left">
            <div class="baggage-icon">👜</div>
            <div>
              <div class="baggage-name">Equipaje de mano</div>
              <div class="baggage-desc">1 artículo personal + 1 equipaje de mano (10kg)</div>
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:12px;">
            <div class="baggage-price free">Incluido</div>
            <div class="baggage-checkbox">${checkout.baggage[p] === 'hand' ? '✓' : ''}</div>
          </div>
        </div>
        <div class="baggage-option ${checkout.baggage[p] === 'bag23' ? 'selected' : ''}" onclick="selectBaggage(${p}, 'bag23', this)">
          <div class="baggage-option-left">
            <div class="baggage-icon">🧳</div>
            <div>
              <div class="baggage-name">Maleta bodega 23kg</div>
              <div class="baggage-desc">1 maleta de hasta 23kg en bodega</div>
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:12px;">
            <div class="baggage-price ${checkout.cabin === 'ejecutiva' ? 'free' : ''}">
              ${checkout.cabin === 'ejecutiva' ? 'Incluido' : '+ ' + formatPrice(BAGGAGE_PRICES.bag23)}
            </div>
            <div class="baggage-checkbox">${checkout.baggage[p] === 'bag23' ? '✓' : ''}</div>
          </div>
        </div>
        <div class="baggage-option ${checkout.baggage[p] === 'bag32' ? 'selected' : ''}" onclick="selectBaggage(${p}, 'bag32', this)">
          <div class="baggage-option-left">
            <div class="baggage-icon">🧳</div>
            <div>
              <div class="baggage-name">Maleta bodega 32kg</div>
              <div class="baggage-desc">1 maleta de hasta 32kg en bodega</div>
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:12px;">
            <div class="baggage-price">+ ${formatPrice(BAGGAGE_PRICES.bag32)}</div>
            <div class="baggage-checkbox">${checkout.baggage[p] === 'bag32' ? '✓' : ''}</div>
          </div>
        </div>
      </div>
    `;
    container.appendChild(block);
  }
  updateBaggageTotal();
}

function selectBaggage(passengerIdx, type, clickedEl) {
  checkout.baggage[passengerIdx] = type;
  const block = clickedEl.closest('.baggage-passenger-block');
  block.querySelectorAll('.baggage-option').forEach(opt => {
    opt.classList.remove('selected');
    opt.querySelector('.baggage-checkbox').textContent = '';
  });
  clickedEl.classList.add('selected');
  clickedEl.querySelector('.baggage-checkbox').textContent = '✓';
  updateBaggageTotal();
  updatePriceSidebar();
}

function updateBaggageTotal() {
  checkout.baggageTotal = checkout.baggage.reduce((sum, type) => {
    if (checkout.cabin === 'ejecutiva' && type === 'bag23') return sum;
    return sum + (BAGGAGE_PRICES[type] || 0);
  }, 0);
}

// ─── PAYMENT ──────────────────────────────────────────────────────────────────

function initPaymentForm() {
  const cardNumber = document.getElementById('cardNumber');
  const cardName   = document.getElementById('cardName');
  const cardExpiry = document.getElementById('cardExpiry');

  cardNumber.addEventListener('input', e => {
    let val = e.target.value.replace(/\D/g, '').substring(0, 16);
    val = val.match(/.{1,4}/g)?.join(' ') || val;
    e.target.value = val;
    document.getElementById('previewNumber').textContent = val || '•••• •••• •••• ••••';
  });
  cardName.addEventListener('input', e => {
    document.getElementById('previewName').textContent = e.target.value.toUpperCase() || 'NOMBRE APELLIDO';
  });
  cardExpiry.addEventListener('input', e => {
    let val = e.target.value.replace(/\D/g, '').substring(0, 4);
    if (val.length >= 2) val = val.substring(0, 2) + '/' + val.substring(2);
    e.target.value = val;
    document.getElementById('previewExpiry').textContent = val || 'MM/AA';
  });
}

function confirmPurchase() {
  const cardNumber = document.getElementById('cardNumber').value.replace(/\s/g, '');
  const cardName   = document.getElementById('cardName').value.trim();
  const cardExpiry = document.getElementById('cardExpiry').value.trim();
  const cardCvv    = document.getElementById('cardCvv').value.trim();

  if (!cardNumber || cardNumber.length < 16) { alert('Número de tarjeta inválido.'); return; }
  if (!cardName)                              { alert('Ingresa el nombre del titular.'); return; }
  if (!cardExpiry || cardExpiry.length < 5)   { alert('Ingresa la fecha de vencimiento.'); return; }
  if (!cardCvv    || cardCvv.length < 3)      { alert('Ingresa el CVV.'); return; }

  const btn = document.querySelector('.btn-confirm');
  btn.textContent = 'Procesando...';
  btn.disabled = true;

  setTimeout(showConfirmation, 1500);
}

// ─── CONFIRMATION ─────────────────────────────────────────────────────────────

function generateBookingCode() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  return Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

// ─── GUARDAR RESERVA EN localStorage ─────────────────────────────────────────
// Pega esta función en script_checkout.js ANTES de showConfirmation()
// Y llama a saveReservation(code, total) dentro de showConfirmation()

function saveReservation(code, total) {
  const reservation = {
    code,
    date:          new Date().toLocaleDateString('es-CO'),
    cabin:         checkout.cabin,
    passengers:    checkout.passengers,
    passengerData: checkout.passengerData,
    outbound: {
      flightNumber: checkout.flight.flightNumber,
      origin:       checkout.flight.originCity,
      destination:  checkout.flight.destinationCity,
      departure:    checkout.flight.departure,
      arrival:      checkout.flight.arrival,
      date:         checkout.params.dateStart || 'Flexible',
    },
    return: checkout.returnFlight ? {
      flightNumber: checkout.returnFlight.flightNumber,
      origin:       checkout.returnFlight.originCity,
      destination:  checkout.returnFlight.destinationCity,
      departure:    checkout.returnFlight.departure,
      arrival:      checkout.returnFlight.arrival,
      date:         checkout.params.dateEnd || 'Flexible',
    } : null,
    seatsOutbound: [...checkout.selectedSeats],
    seatsReturn:   [...checkout.selectedReturnSeats],
    baggage:       [...checkout.baggage],
    total,
  };

  const existing = JSON.parse(localStorage.getItem('avianca_reservations') || '[]');
  existing.push(reservation);
  localStorage.setItem('avianca_reservations', JSON.stringify(existing));
}

function showConfirmation() {
  const code  = generateBookingCode();
  const total = checkout.basePrice + checkout.baggageTotal + (checkout.upgradeTotal || 0);
  saveReservation(code, total);

  document.getElementById('bookingCode').textContent = code;

  const mainPax    = checkout.passengerData[0];
  const cabin      = checkout.cabin === 'economica' ? 'Económica' : 'Ejecutiva';
  const seatsIda   = checkout.selectedSeats.join(', ');
  const seatsVuelta = checkout.isRound ? checkout.selectedReturnSeats.join(', ') : null;

  document.getElementById('confirmationDetails').innerHTML = `
    <div class="confirmation-detail-row">
      <span class="confirmation-detail-label">Pasajero principal</span>
      <span class="confirmation-detail-value">${mainPax?.firstName} ${mainPax?.lastName}</span>
    </div>
    <div class="confirmation-detail-row">
      <span class="confirmation-detail-label">Vuelo de ida</span>
      <span class="confirmation-detail-value">${checkout.flight.flightNumber} · ${checkout.flight.originCity} → ${checkout.flight.destinationCity}</span>
    </div>
    ${checkout.returnFlight ? `
    <div class="confirmation-detail-row">
      <span class="confirmation-detail-label">Vuelo de vuelta</span>
      <span class="confirmation-detail-value">${checkout.returnFlight.flightNumber} · ${checkout.returnFlight.originCity} → ${checkout.returnFlight.destinationCity}</span>
    </div>` : ''}
    <div class="confirmation-detail-row">
      <span class="confirmation-detail-label">Fecha ida</span>
      <span class="confirmation-detail-value">${checkout.params.dateStart || 'Flexible'}</span>
    </div>
    ${checkout.isRound ? `
    <div class="confirmation-detail-row">
      <span class="confirmation-detail-label">Fecha vuelta</span>
      <span class="confirmation-detail-value">${checkout.params.dateEnd || 'Flexible'}</span>
    </div>` : ''}
    <div class="confirmation-detail-row">
      <span class="confirmation-detail-label">Clase</span>
      <span class="confirmation-detail-value">${cabin}</span>
    </div>
    <div class="confirmation-detail-row">
      <span class="confirmation-detail-label">Asientos ida</span>
      <span class="confirmation-detail-value">${seatsIda}</span>
    </div>
    ${seatsVuelta ? `
    <div class="confirmation-detail-row">
      <span class="confirmation-detail-label">Asientos vuelta</span>
      <span class="confirmation-detail-value">${seatsVuelta}</span>
    </div>` : ''}
    <div class="confirmation-detail-row">
      <span class="confirmation-detail-label">Pasajeros</span>
      <span class="confirmation-detail-value">${checkout.passengers}</span>
    </div>
    <div class="confirmation-detail-row">
      <span class="confirmation-detail-label">Total pagado</span>
      <span class="confirmation-detail-value" style="color:#E30613;font-size:16px;">${formatPrice(total)}</span>
    </div>
  `;

  document.querySelector('.stepper-bar').style.display = 'none';
  goToStep(checkout.isRound ? 7 : 6);
}

// ─── PRICE SIDEBAR ────────────────────────────────────────────────────────────

function updatePriceSidebar() {
  const breakdown  = document.getElementById('priceBreakdown');
  const grandTotal = document.getElementById('grandTotal');
  const flight     = checkout.flight;
  if (!flight) return;

  const cabin      = checkout.cabin;
  const price      = flight.prices[cabin];
  const passengers = checkout.passengers;
  const rows       = [];

  rows.push(`
    <div class="price-row">
      <span class="price-row-label">Vuelo de ida × ${passengers}</span>
      <span class="price-row-value">${formatPrice(price * passengers)}</span>
    </div>`);

  if (checkout.returnFlight) {
    const rPrice = checkout.returnFlight.prices[cabin];
    rows.push(`
      <div class="price-row">
        <span class="price-row-label">Vuelo de vuelta × ${passengers}</span>
        <span class="price-row-value">${formatPrice(rPrice * passengers)}</span>
      </div>`);
  }

  if (checkout.baggageTotal > 0) {
    rows.push(`
      <div class="price-row">
        <span class="price-row-label">Equipaje adicional</span>
        <span class="price-row-value extra">+ ${formatPrice(checkout.baggageTotal)}</span>
      </div>`);
  }

  if (checkout.upgradeTotal > 0) {
    rows.push(`
      <div class="price-row">
        <span class="price-row-label">Upgrade a Ejecutiva</span>
        <span class="price-row-value extra">+ ${formatPrice(checkout.upgradeTotal)}</span>
      </div>`);
  }

  breakdown.innerHTML = rows.join('');
  const total = checkout.basePrice + checkout.baggageTotal + (checkout.upgradeTotal || 0);
  grandTotal.textContent = formatPrice(total);
}

function formatPrice(price) {
  return `COP ${price.toLocaleString('es-CO')}`;
}

// ─── INIT ─────────────────────────────────────────────────────────────────────

function initCheckout() {
  const params = parseCheckoutParams();
  checkout.params     = params;
  checkout.cabin      = params.cabin;
  checkout.passengers = params.passengers;
  checkout.isRound    = !!params.returnId;

  const flight = getFlightById(params.outboundId);
  if (!flight) { alert('No se encontró el vuelo.'); window.history.back(); return; }
  checkout.flight = flight;

  if (checkout.isRound) {
    const returnFlight = getFlightById(params.returnId);
    if (returnFlight) checkout.returnFlight = returnFlight;
  }

  checkout.basePrice = flight.prices[checkout.cabin] * checkout.passengers;
  if (checkout.returnFlight) {
    checkout.basePrice += checkout.returnFlight.prices[checkout.cabin] * checkout.passengers;
  }

  // Agregar paso extra de asientos vuelta si es ida y vuelta
  if (checkout.isRound) {
    addReturnSeatsStep();
  }

  renderFlightSummary();
  renderPassengersForm();
  initPaymentForm();
  updatePriceSidebar();
  goToStep(1);
}

function addReturnSeatsStep() {
  // Insertar step3b en el HTML dinámicamente
  const step3 = document.getElementById('step3');

  // Actualizar el botón de step3 para que llame validateSeatsAndNext
  // (ya lo hace, no necesita cambio)

  // Crear step para asientos de vuelta
  const step3b = document.createElement('div');
  step3b.className = 'checkout-step hidden';
  step3b.id = 'step4'; // paso 4 ahora es asientos vuelta

  // Renumerar step4 → step5, step5 → step6, step6 → step7
  ['6','5','4'].forEach(n => {
    const el = document.getElementById(`step${n}`);
    if (el) el.id = `step${parseInt(n) + 1}`;
  });

  step3b.innerHTML = `
    <h2 class="step-title" id="seatStepTitleReturn">Asientos — Vuelo de vuelta</h2>
    <p class="step-subtitle">Selecciona un asiento para cada pasajero en el vuelo de vuelta.</p>
    <div id="seatSelectorContainerReturn"></div>
    <div class="step-actions">
      <button class="btn-back" onclick="prevStep()">← Volver</button>
      <button class="btn-next" onclick="validateReturnSeatsAndNext()">Continuar con equipaje →</button>
    </div>
  `;

  step3.insertAdjacentElement('afterend', step3b);

  // Agregar al stepper
  const stepper = document.querySelector('.stepper-container');
  const steps   = stepper.querySelectorAll('.step');
  const lines   = stepper.querySelectorAll('.step-line');

  // Renumerar pasos 4 y 5 en el stepper
  steps[3].querySelector('.step-circle').textContent = '5';
  steps[4].querySelector('.step-circle').textContent = '6';
  steps[3].dataset.step = '5';
  steps[4].dataset.step = '6';

  // Insertar nuevo paso después del paso 3
  const newLine = document.createElement('div');
  newLine.className = 'step-line';
  const newStep = document.createElement('div');
  newStep.className = 'step';
  newStep.dataset.step = '4';
  newStep.innerHTML = `<div class="step-circle">4</div><span class="step-label">Asientos vuelta</span>`;

  lines[2].insertAdjacentElement('afterend', newStep);
  newStep.insertAdjacentElement('afterend', newLine);
}

function validateReturnSeatsAndNext() {
  // Renderizar en el contenedor correcto
  const container = document.getElementById('seatSelectorContainerReturn');
  if (!container) { nextStep(); renderBaggageOptions(); return; }

  // Usar selectedReturnSeats
  const unselected = checkout.selectedReturnSeats.filter(s => !s);
  if (unselected.length > 0) {
    alert('Por favor selecciona asiento de vuelta para todos los pasajeros.');
    return;
  }

  nextStep();
  renderBaggageOptions();
}

function renderReturnSeatMap() {
  const container = document.getElementById('seatSelectorContainerReturn');
  if (!container || !checkout.returnFlight) return;
  container.innerHTML = '';

  const flight   = checkout.returnFlight;
  const config   = getSeatConfig(flight);
  const occupied = generateOccupiedSeats(flight);

  if (checkout.selectedReturnSeats.length === 0) {
    for (let i = 0; i < checkout.passengers; i++) checkout.selectedReturnSeats.push(null);
  }

  for (let p = 0; p < checkout.passengers; p++) {
    const block = document.createElement('div');
    block.className = 'seat-selector-block';
    const passengerName = checkout.passengerData[p]
      ? `${checkout.passengerData[p].firstName} ${checkout.passengerData[p].lastName}`
      : `Pasajero ${p + 1}`;

    block.innerHTML = `
      <div class="seat-selector-title">
        <div class="passenger-number-badge">${p + 1}</div>
        ${passengerName}
        <span style="font-size:12px;color:#888;font-weight:400;margin-left:8px;">${flight.aircraft}</span>
      </div>
      <div class="seat-legend">
        <div class="legend-item"><div class="legend-dot available"></div> Disponible</div>
        <div class="legend-item"><div class="legend-dot occupied"></div> Ocupado</div>
        <div class="legend-item"><div class="legend-dot selected"></div> Seleccionado</div>
        <div class="legend-item"><div class="legend-dot executive"></div> Ejecutiva (+upgrade)</div>
      </div>
      <div class="seat-map">
        <div class="seat-map-plane" id="returnSeatMap_${p}">
          ${config.execRows > 0 ? `
          <div class="seat-section-label">✦ Clase Ejecutiva — Filas 1–${config.execRows}</div>
          <div class="seat-row seat-header-row">
            <div class="seat-row-number"></div>
            ${buildHeaderRow(config.execCols, config.execAisles)}
          </div>` : ''}
        </div>
      </div>
      <div class="selected-seat-info" id="returnSeatInfo_${p}" style="display:none;">
        ✅ Asiento vuelta seleccionado: <strong id="returnSeatInfoText_${p}"></strong>
      </div>
    `;
    container.appendChild(block);

    const mapEl = document.getElementById(`returnSeatMap_${p}`);
    let econHeaderAdded = false;

    for (let row = 1; row <= config.totalRows; row++) {
      const isExecRow = row <= config.execRows;
      const cols   = isExecRow ? config.execCols   : config.econCols;
      const aisles = isExecRow ? config.execAisles : config.econAisles;

      if (!isExecRow && !econHeaderAdded) {
        econHeaderAdded = true;
        const divider = document.createElement('div');
        divider.className = 'seat-section-label econ';
        divider.textContent = `✈ Clase Económica — Filas ${config.execRows + 1}–${config.totalRows}`;
        mapEl.appendChild(divider);
        const econHeader = document.createElement('div');
        econHeader.className = 'seat-row seat-header-row';
        econHeader.innerHTML = `<div class="seat-row-number"></div>${buildHeaderRow(config.econCols, config.econAisles)}`;
        mapEl.appendChild(econHeader);
      }

      const rowEl = document.createElement('div');
      rowEl.className = `seat-row${isExecRow ? ' exec-row' : ''}`;
      const rowNum = document.createElement('div');
      rowNum.className = 'seat-row-number';
      rowNum.textContent = row;
      rowEl.appendChild(rowNum);

      cols.forEach((col, colIdx) => {
        if (aisles.includes(colIdx)) {
          const aisle = document.createElement('div');
          aisle.className = 'seat-aisle';
          rowEl.appendChild(aisle);
        }

        const seatId       = `${row}${col}`;
        const isOcc        = occupied.has(seatId);
        const isSelByOther = checkout.selectedReturnSeats.some((s, idx) => s === seatId && idx !== p);
        const seat         = document.createElement('div');
        seat.className     = `seat${isExecRow ? ' exec-size' : ''}`;
        seat.textContent   = col;

        if (isOcc || isSelByOther) {
          // ocupado
        } else if (checkout.selectedReturnSeats[p] === seatId) {
          seat.classList.add('selected');
        } else if (isExecRow) {
          seat.classList.add('executive', 'available');
        } else {
          seat.classList.add('available');
        }

        if (!isOcc && !isSelByOther) {
          seat.addEventListener('click', () => {
            selectSeat(p, seatId, isExecRow, 'return');
            renderReturnSeatMap();
          });
        }
        rowEl.appendChild(seat);
      });
      mapEl.appendChild(rowEl);
    }

    if (checkout.selectedReturnSeats[p]) {
      const infoEl = document.getElementById(`returnSeatInfo_${p}`);
      const textEl = document.getElementById(`returnSeatInfoText_${p}`);
      infoEl.style.display = 'block';
      const rowNum = parseInt(checkout.selectedReturnSeats[p]);
      textEl.textContent = `${checkout.selectedReturnSeats[p]} · ${rowNum <= config.execRows ? 'Ejecutiva' : 'Económica'} · Fila ${rowNum}`;
    }
  }
}

// Override nextStep para step3 cuando es ida y vuelta
const _originalNextStep = nextStep;
function validateSeatsAndNext() {
  const container  = document.getElementById('seatSelectorContainer');
  const direction  = container?.dataset.direction || 'outbound';
  const seatsArray = direction === 'outbound' ? checkout.selectedSeats : checkout.selectedReturnSeats;
  const unselected = seatsArray.filter(s => !s);

  if (unselected.length > 0) {
    alert('Por favor selecciona asiento para todos los pasajeros.');
    return;
  }

  if (direction === 'outbound' && checkout.isRound) {
    nextStep();
    renderReturnSeatMap();
    return;
  }

  nextStep();
  renderBaggageOptions();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCheckout);
} else {
  initCheckout();
}