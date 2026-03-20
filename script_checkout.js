/**
 * script_checkout.js
 * Lógica completa del checkout de vuelos
 * Pasos: Vuelo → Pasajeros → Asientos → Equipaje → Pago → Confirmación
 */

// ─── ESTADO GLOBAL ────────────────────────────────────────────────────────────

const checkout = {
  params:       {},       // parámetros de la URL
  flight:       null,     // vuelo de ida
  returnFlight: null,     // vuelo de vuelta (si aplica)
  cabin:        'economica',
  passengers:   1,
  passengerData:  [],     // datos de cada pasajero
  selectedSeats:  [],     // asiento por pasajero
  baggage:        [],     // equipaje por pasajero
  basePrice:      0,      // precio base total (vuelo × pasajeros)
  baggageTotal:   0,      // costo adicional equipaje
  currentStep:    1,
};

const BAGGAGE_PRICES = {
  hand:    0,
  bag23:   89000,
  bag32:   149000,
};

// ─── PARSE PARAMS ─────────────────────────────────────────────────────────────

function parseCheckoutParams() {
  const urlParams = new URLSearchParams(window.location.search);
  return {
    flightId:   urlParams.get('flightId')   || '',
    cabin:      urlParams.get('cabin')      || 'economica',
    passengers: parseInt(urlParams.get('passengers') || '1'),
    dateStart:  urlParams.get('dateStart')  || '',
    dateEnd:    urlParams.get('dateEnd')    || '',
    trip:       urlParams.get('trip')       || 'oneway',
    direction:  urlParams.get('direction')  || 'outbound',
  };
}

// ─── STEPPER ──────────────────────────────────────────────────────────────────

function goToStep(step) {
  // Hide all steps
  document.querySelectorAll('.checkout-step').forEach(el => el.classList.add('hidden'));

  // Show target step
  document.getElementById(`step${step}`).classList.remove('hidden');

  // Update stepper UI
  document.querySelectorAll('.step').forEach((el, i) => {
    const n = i + 1;
    el.classList.remove('active', 'completed');
    if (n < step)  el.classList.add('completed');
    if (n === step) el.classList.add('active');
  });

  // Update step lines
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
  const price  = flight.prices[cabin];
  const total  = price * checkout.passengers;

  checkout.basePrice = total;
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
      ${date ? `
      <div class="summary-meta-item">
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
        </div>
        ` : ''}
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

    // Reset errors
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
  renderSeatMap();
}

// ─── STEP 3: SEAT MAP ─────────────────────────────────────────────────────────

// ─── SEAT CONFIG POR AVIÓN ───────────────────────────────────────────────────
// Reemplaza generateOccupiedSeats y renderSeatMap en script_checkout.js

function getSeatConfig() {
  const aircraft = checkout.flight.aircraft;
  const is787    = aircraft.includes('787');

  if (is787) {
    return {
      is787: true,
      totalRows: 40,
      execRows: 8,
      // Económica: 2-4-2 → A B | C D E F | G H
      econCols:  ['A','B','C','D','E','F','G','H'],
      econAisles: [2, 6],   // índices DESPUÉS de los cuales va un pasillo
      // Ejecutiva: 1-2-1 → A | C D | G
      execCols:  ['A','C','D','G'],
      execAisles: [1, 3],
    };
  } else {
    return {
      is787: false,
      totalRows: 30,
      execRows: 4,
      // Económica: 3-3 → A B C | D E F
      econCols:  ['A','B','C','D','E','F'],
      econAisles: [3],
      // Ejecutiva: misma distribución pero asientos más anchos
      execCols:  ['A','B','C','D','E','F'],
      execAisles: [3],
    };
  }
}

function generateOccupiedSeats() {
  const config    = getSeatConfig();
  const occupied  = new Set();
  const available = checkout.flight.seatsLeft[checkout.cabin];

  const totalExec  = config.execRows * config.execCols.length;
  const totalEcon  = (config.totalRows - config.execRows) * config.econCols.length;
  const totalSeats = totalExec + totalEcon;
  const count      = Math.max(0, totalSeats - available);

  let seed = 0;
  for (let i = 0; i < checkout.flight.id.length; i++) {
    seed += checkout.flight.id.charCodeAt(i);
  }

  let attempts = 0;
  while (occupied.size < count && attempts < count * 10) {
    attempts++;
    seed = (seed * 9301 + 49297) % 233280;
    const row = (seed % config.totalRows) + 1;
    seed = (seed * 9301 + 49297) % 233280;
    const isExecRow = row <= config.execRows;
    const colSet    = isExecRow ? config.execCols : config.econCols;
    const col       = colSet[seed % colSet.length];
    occupied.add(`${row}${col}`);
  }

  return occupied;
}

function renderSeatMap() {
  const container = document.getElementById('seatSelectorContainer');
  container.innerHTML = '';

  const config   = getSeatConfig();
  const occupied = generateOccupiedSeats();

  if (checkout.selectedSeats.length === 0) {
    checkout.selectedSeats = new Array(checkout.passengers).fill(null);
  }

  for (let p = 0; p < checkout.passengers; p++) {
    const block = document.createElement('div');
    block.className = 'seat-selector-block';

    const passengerName = checkout.passengerData[p]
      ? `${checkout.passengerData[p].firstName} ${checkout.passengerData[p].lastName}`
      : `Pasajero ${p + 1}`;

    // Header de columnas para económica
    const econHeaderCells = buildHeaderRow(config.econCols, config.econAisles);
    // Header de columnas para ejecutiva
    const execHeaderCells = buildHeaderRow(config.execCols, config.execAisles);

    block.innerHTML = `
      <div class="seat-selector-title">
        <div class="passenger-number-badge">${p + 1}</div>
        ${passengerName}
        <span style="font-size:12px;color:#888;font-weight:400;margin-left:8px;">
          ${checkout.flight.aircraft}
        </span>
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
            ${execHeaderCells}
          </div>
          ` : ''}

        </div>
      </div>

      <div class="selected-seat-info" id="seatInfo_${p}" style="display:none;">
        ✅ Asiento seleccionado: <strong id="seatInfoText_${p}"></strong>
      </div>
    `;

    container.appendChild(block);

    const mapEl = document.getElementById(`seatMap_${p}`);

    // Separador entre ejecutiva y económica
    let econHeaderAdded = false;

    for (let row = 1; row <= config.totalRows; row++) {
      const isExecRow = row <= config.execRows;
      const cols      = isExecRow ? config.execCols    : config.econCols;
      const aisles    = isExecRow ? config.execAisles  : config.econAisles;

      // Agregar header de económica cuando empieza
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
        // Pasillo ANTES de este índice
        if (aisles.includes(colIdx)) {
          const aisle = document.createElement('div');
          aisle.className = 'seat-aisle';
          rowEl.appendChild(aisle);
        }

        const seatId       = `${row}${col}`;
        const isOcc        = occupied.has(seatId);
        const isSelByOther = checkout.selectedSeats.some((s, idx) => s === seatId && idx !== p);

        const seat = document.createElement('div');
        seat.className = `seat${isExecRow ? ' exec-size' : ''}`;
        seat.textContent = col;
        seat.dataset.seat      = seatId;
        seat.dataset.passenger = p;

        if (isOcc || isSelByOther) {
          // queda gris/ocupado — sin clase adicional
        } else if (checkout.selectedSeats[p] === seatId) {
          seat.classList.add('selected');
        } else if (isExecRow) {
          seat.classList.add('executive', 'available');
        } else {
          seat.classList.add('available');
        }

        if (!isOcc && !isSelByOther) {
          seat.addEventListener('click', () => {
            selectSeat(p, seatId, isExecRow);
            renderSeatMap();
          });
        }

        rowEl.appendChild(seat);
      });

      mapEl.appendChild(rowEl);
    }

    // Info asiento seleccionado
    if (checkout.selectedSeats[p]) {
      const infoEl = document.getElementById(`seatInfo_${p}`);
      const textEl = document.getElementById(`seatInfoText_${p}`);
      infoEl.style.display = 'block';
      const rowNum  = parseInt(checkout.selectedSeats[p]);
      const isExec  = rowNum <= config.execRows;
      textEl.textContent = `${checkout.selectedSeats[p]} · ${isExec ? 'Ejecutiva' : 'Económica'} · Fila ${rowNum}`;
    }
  }
}

// Helper: genera las celdas del header de columnas con pasillos
function buildHeaderRow(cols, aisles) {
  let html = '';
  cols.forEach((col, idx) => {
    if (aisles.includes(idx)) {
      html += `<div class="seat-aisle"></div>`;
    }
    html += `<div class="seat-col-label">${col}</div>`;
  });
  return html;
}


function selectSeat(passengerIdx, seatId, isExec) {
  if (checkout.selectedSeats[passengerIdx] === seatId) {
    checkout.selectedSeats[passengerIdx] = null;
    checkout.seatUpgrades = checkout.seatUpgrades || {};
    checkout.seatUpgrades[passengerIdx] = 0;
  } else {
    checkout.selectedSeats[passengerIdx] = seatId;
    checkout.seatUpgrades = checkout.seatUpgrades || {};
    // Si eligió ejecutiva pero pagó económica, cobrar diferencia
    if (isExec && checkout.cabin === 'economica') {
      const diff = checkout.flight.prices['ejecutiva'] - checkout.flight.prices['economica'];
      checkout.seatUpgrades[passengerIdx] = diff > 0 ? diff : 0;
    } else {
      checkout.seatUpgrades[passengerIdx] = 0;
    }
  }
  // Recalcular total de upgrades
  checkout.upgradeTotal = Object.values(checkout.seatUpgrades || {}).reduce((a, b) => a + b, 0);
  updatePriceSidebar();
}

function validateSeatsAndNext() {
  const unselected = checkout.selectedSeats.filter(s => !s);
  if (unselected.length > 0) {
    alert(`Por favor selecciona asiento para todos los pasajeros (${checkout.passengers - (checkout.passengers - unselected.length)} pendientes).`);
    return;
  }
  nextStep();
  renderBaggageOptions();
}

// ─── STEP 4: BAGGAGE ──────────────────────────────────────────────────────────

function renderBaggageOptions() {
  const container = document.getElementById('baggageContainer');
  container.innerHTML = '';

  // Inicializar equipaje
  if (checkout.baggage.length === 0) {
    checkout.baggage = new Array(checkout.passengers).fill('hand');
  }

  for (let p = 0; p < checkout.passengers; p++) {
    const passengerName = checkout.passengerData[p]
      ? `${checkout.passengerData[p].firstName} ${checkout.passengerData[p].lastName}`
      : `Pasajero ${p + 1}`;

    const block = document.createElement('div');
    block.className = 'baggage-passenger-block';

    block.innerHTML = `
      <div class="baggage-passenger-title">
        <span class="passenger-number-badge" style="width:24px;height:24px;font-size:12px;border-radius:50%;background:#E30613;color:white;display:inline-flex;align-items:center;justify-content:center;margin-right:8px;">${p+1}</span>
        ${passengerName}
      </div>
      <div class="baggage-options">

        <div class="baggage-option ${checkout.baggage[p] === 'hand' ? 'selected' : ''}"
             onclick="selectBaggage(${p}, 'hand', this)">
          <div class="baggage-option-left">
            <div class="baggage-icon"></div>
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

        <div class="baggage-option ${checkout.baggage[p] === 'bag23' ? 'selected' : ''}"
             onclick="selectBaggage(${p}, 'bag23', this)">
          <div class="baggage-option-left">
            <div class="baggage-icon"></div>
            <div>
              <div class="baggage-name">Maleta bodega 23kg</div>
              <div class="baggage-desc">1 maleta de hasta 23kg en bodega</div>
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:12px;">
            <div class="baggage-price">+ ${formatPrice(BAGGAGE_PRICES.bag23)}</div>
            <div class="baggage-checkbox">${checkout.baggage[p] === 'bag23' ? '✓' : ''}</div>
          </div>
        </div>

        <div class="baggage-option ${checkout.baggage[p] === 'bag32' ? 'selected' : ''}"
             onclick="selectBaggage(${p}, 'bag32', this)">
          <div class="baggage-option-left">
            <div class="baggage-icon"></div>
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

  // Update UI for this passenger's block
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
    return sum + (BAGGAGE_PRICES[type] || 0);
  }, 0);
}

// ─── STEP 5: PAYMENT ──────────────────────────────────────────────────────────

function initPaymentForm() {
  const cardNumber  = document.getElementById('cardNumber');
  const cardName    = document.getElementById('cardName');
  const cardExpiry  = document.getElementById('cardExpiry');

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

  if (!cardNumber || cardNumber.length < 16) {
    alert('Por favor ingresa un número de tarjeta válido.');
    return;
  }
  if (!cardName) {
    alert('Por favor ingresa el nombre del titular.');
    return;
  }
  if (!cardExpiry || cardExpiry.length < 5) {
    alert('Por favor ingresa la fecha de vencimiento.');
    return;
  }
  if (!cardCvv || cardCvv.length < 3) {
    alert('Por favor ingresa el CVV.');
    return;
  }

  // Simular procesamiento
  const btn = document.querySelector('.btn-confirm');
  btn.textContent = 'Procesando...';
  btn.disabled = true;

  setTimeout(() => {
    showConfirmation();
  }, 1500);
}

// ─── STEP 6: CONFIRMATION ─────────────────────────────────────────────────────

function generateBookingCode() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  return Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

function showConfirmation() {
  const code = generateBookingCode();
  document.getElementById('bookingCode').textContent = code;

  const flight   = checkout.flight;
  const cabin    = checkout.cabin === 'economica' ? 'Económica' : 'Ejecutiva';
  const mainPax  = checkout.passengerData[0];
  const seats    = checkout.selectedSeats.join(', ');
  const total = checkout.basePrice + checkout.baggageTotal + (checkout.upgradeTotal || 0);

  document.getElementById('confirmationDetails').innerHTML = `
    <div class="confirmation-detail-row">
      <span class="confirmation-detail-label">Pasajero principal</span>
      <span class="confirmation-detail-value">${mainPax?.firstName} ${mainPax?.lastName}</span>
    </div>
    <div class="confirmation-detail-row">
      <span class="confirmation-detail-label">Vuelo</span>
      <span class="confirmation-detail-value">${flight.flightNumber} · ${flight.originCity} → ${flight.destinationCity}</span>
    </div>
    <div class="confirmation-detail-row">
      <span class="confirmation-detail-label">Fecha</span>
      <span class="confirmation-detail-value">${checkout.params.dateStart || 'Flexible'}</span>
    </div>
    <div class="confirmation-detail-row">
      <span class="confirmation-detail-label">Clase</span>
      <span class="confirmation-detail-value">${cabin}</span>
    </div>
    <div class="confirmation-detail-row">
      <span class="confirmation-detail-label">Asientos</span>
      <span class="confirmation-detail-value">${seats}</span>
    </div>
    <div class="confirmation-detail-row">
      <span class="confirmation-detail-label">Pasajeros</span>
      <span class="confirmation-detail-value">${checkout.passengers}</span>
    </div>
    <div class="confirmation-detail-row">
      <span class="confirmation-detail-label">Total pagado</span>
      <span class="confirmation-detail-value" style="color:#E30613;font-size:16px;">${formatPrice(total)}</span>
    </div>
  `;

  // Hide stepper on confirmation
  document.querySelector('.stepper-bar').style.display = 'none';

  goToStep(6);
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
    </div>
  `);

  if (checkout.returnFlight) {
    const rPrice = checkout.returnFlight.prices[cabin];
    rows.push(`
      <div class="price-row">
        <span class="price-row-label">Vuelo de vuelta × ${passengers}</span>
        <span class="price-row-value">${formatPrice(rPrice * passengers)}</span>
      </div>
    `);
  }

  if (checkout.baggageTotal > 0) {
    rows.push(`
      <div class="price-row">
        <span class="price-row-label">Equipaje adicional</span>
        <span class="price-row-value extra">+ ${formatPrice(checkout.baggageTotal)}</span>
      </div>
    `);
  }

  if (checkout.upgradeTotal > 0) {
    rows.push(`
        <div class="price-row">
        <span class="price-row-label">Upgrade a Ejecutiva</span>
        <span class="price-row-value extra">+ ${formatPrice(checkout.upgradeTotal)}</span>
        </div>
    `);
  }

  breakdown.innerHTML = rows.join('');

  const total = checkout.basePrice + checkout.baggageTotal + (checkout.upgradeTotal || 0);
  grandTotal.textContent = formatPrice(total);
}

// ─── FORMAT PRICE ─────────────────────────────────────────────────────────────

function formatPrice(price) {
  return `COP ${price.toLocaleString('es-CO')}`;
}

// ─── INIT ─────────────────────────────────────────────────────────────────────

function initCheckout() {
  const params = parseCheckoutParams();
  checkout.params     = params;
  checkout.cabin      = params.cabin;
  checkout.passengers = params.passengers;

  // Get flight
  const flight = getFlightById(params.flightId);
  if (!flight) {
    alert('No se encontró el vuelo seleccionado.');
    window.history.back();
    return;
  }
  checkout.flight = flight;

  // Calculate base price
  checkout.basePrice = flight.prices[checkout.cabin] * checkout.passengers;

  // Init UI
  renderFlightSummary();
  renderPassengersForm();
  initPaymentForm();
  updatePriceSidebar();
  goToStep(1);
}

// Esperar a que flights_data.js esté disponible
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCheckout);
} else {
  initCheckout();
}