const state = {
  params: {},
  outboundFlights: [],
  returnFlights: [],
  cabin: 'economica',
  sortBy: 'precio',
  stops: [0, 1],
  timeRanges: ['morning', 'afternoon', 'night'],
  selectedOutbound: null,   // vuelo de ida seleccionado
  selectedReturn:   null,   // vuelo de vuelta seleccionado
};

// ─── PARSE URL PARAMS ─────────────────────────────────────────────────────────

function parseSearchParams() {
  const urlParams = new URLSearchParams(window.location.search);

  function extractCode(str) {
    if (!str) return '';
    const match = str.match(/\(([A-Z]{3})\)/);
    return match ? match[1] : str.toUpperCase().trim();
  }

  return {
    originRaw:      urlParams.get('origin')      || '',
    destinationRaw: urlParams.get('destination') || '',
    origin:         extractCode(urlParams.get('origin')      || ''),
    destination:    extractCode(urlParams.get('destination') || ''),
    dateStart:      urlParams.get('dateStart')   || '',
    dateEnd:        urlParams.get('dateEnd')     || '',
    passengers:     parseInt(urlParams.get('passengers') || '1'),
    trip:           urlParams.get('trip')        || 'round',
  };
}

// ─── UPDATE SUMMARY BAR ───────────────────────────────────────────────────────

function updateSummaryBar(params) {
  const originCity      = params.originRaw.replace(/\s*\([A-Z]{3}\)/, '').trim() || params.origin;
  const destinationCity = params.destinationRaw.replace(/\s*\([A-Z]{3}\)/, '').trim() || params.destination;

  document.getElementById('summaryOrigin').textContent      = originCity || params.origin;
  document.getElementById('summaryDestination').textContent = destinationCity || params.destination;
  document.getElementById('summaryDate').textContent        = params.dateStart || 'Fecha flexible';
  document.getElementById('summaryPassengers').textContent  = `${params.passengers} ${params.passengers === 1 ? 'pasajero' : 'pasajeros'}`;
  document.getElementById('summaryTrip').textContent        = params.trip === 'round' ? 'Ida y vuelta' : params.trip === 'oneway' ? 'Solo ida' : 'Multidestino';
  document.getElementById('outboundTitle').textContent      = `Vuelo de ida · ${originCity || params.origin} → ${destinationCity || params.destination}`;

  if (params.trip === 'round') {
    document.getElementById('returnTitle').textContent = `Vuelo de vuelta · ${destinationCity || params.destination} → ${originCity || params.origin}`;
  }
}

// ─── APPLY FILTERS ────────────────────────────────────────────────────────────

function applyFilters(flights) {
  let result = [...flights];

  result = result.filter(f => state.stops.includes(f.stops.length));

  result = result.filter(f => {
    const hour = parseInt(f.departure.split(':')[0]);
    if (state.timeRanges.includes('morning')   && hour >= 0  && hour < 12) return true;
    if (state.timeRanges.includes('afternoon') && hour >= 12 && hour < 18) return true;
    if (state.timeRanges.includes('night')     && hour >= 18 && hour < 24) return true;
    return false;
  });

  result = sortFlights(result, state.sortBy);
  return result;
}

// ─── RENDER FLIGHT CARD ───────────────────────────────────────────────────────

function renderFlightCard(flight, listId) {
  const price      = flight.prices[state.cabin];
  const seatsLeft  = flight.seatsLeft[state.cabin];
  const isDirect   = flight.stops.length === 0;
  const passengers = state.params.passengers || 1;
  const totalPrice = price * passengers;

  const seatsClass = seatsLeft <= 5 ? 'low' : 'ok';
  const seatsText  = seatsLeft <= 5
    ? `¡Solo ${seatsLeft} asientos!`
    : `${seatsLeft} asientos disponibles`;

  const stopsLabel = isDirect
    ? '<span class="path-stops direct">Directo</span>'
    : `<span class="path-stops withstop">${flight.stops.length} escala</span>`;

  const stopDetails = flight.stops.map(stop => `
    <div class="stop-detail">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
      </svg>
      Escala en ${stop.city} (${stop.code}) · ${stop.layover} · Sale ${stop.departure}
    </div>
  `).join('');

  const dateRef = listId === 'outbound'
    ? (state.params.dateStart ? `<span class="flight-date-ref">${state.params.dateStart}</span>` : '')
    : (state.params.dateEnd   ? `<span class="flight-date-ref">${state.params.dateEnd}</span>`   : '');

  // Detectar si este vuelo está seleccionado
  const isSelected = listId === 'outbound'
    ? state.selectedOutbound?.id === flight.id
    : state.selectedReturn?.id   === flight.id;

  const card = document.createElement('div');
  card.className = `flight-card${isSelected ? ' selected' : ''}`;
  card.dataset.flightId = flight.id;
  card.dataset.listId   = listId;

  card.innerHTML = `
    <div class="flight-main">
      <div class="flight-airline">
        <div class="airline-logo">AV</div>
        <span class="flight-number">${flight.flightNumber}</span>
        ${dateRef}
      </div>

      <div class="flight-schedule">
        <div class="schedule-time">
          <span class="time-value">${flight.departure}</span>
          <span class="time-code">${flight.origin}</span>
        </div>

        <div class="flight-path">
          <span class="path-duration">${flight.duration}</span>
          <div class="path-line">
            <div class="path-dot"></div>
            <div class="path-line-bar">
              <svg class="path-plane" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21 16v-2l-8-5V3.5A1.5 1.5 0 0 0 11.5 2A1.5 1.5 0 0 0 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
              </svg>
            </div>
            <div class="path-dot"></div>
          </div>
          ${stopsLabel}
        </div>

        <div class="schedule-time">
          <span class="time-value">${flight.arrival}</span>
          <span class="time-code">${flight.destination}</span>
        </div>
      </div>

      <div class="flight-info">
        <span class="info-aircraft">${flight.aircraft}</span>
        <span class="info-seats ${seatsClass}">${seatsText}</span>
      </div>

      <div class="flight-pricing">
        <div>
          <div class="pricing-from">Desde</div>
          <div class="pricing-amount">${formatPrice(price)}</div>
          <div class="pricing-cabin">${state.cabin === 'economica' ? 'Económica' : 'Ejecutiva'} · por persona</div>
          <div class="pricing-total">
            Total ${passengers} ${passengers === 1 ? 'pasajero' : 'pasajeros'}: <strong>${formatPrice(totalPrice)}</strong>
          </div>
          <div class="pricing-taxes">Impuestos incluidos</div>
        </div>
        <button class="btn-select-flight${isSelected ? ' btn-selected' : ''}">
          ${isSelected ? '✓ Seleccionado' : 'Seleccionar'}
        </button>
      </div>
    </div>

    ${stopDetails ? `<div class="stop-details-wrapper">${stopDetails}</div>` : ''}
  `;

  card.querySelector('.btn-select-flight').addEventListener('click', (e) => {
    e.stopPropagation();
    selectFlight(flight, listId);
  });

  card.addEventListener('click', () => {
    selectFlight(flight, listId);
  });

  return card;
}

// ─── SELECT FLIGHT ────────────────────────────────────────────────────────────

function selectFlight(flight, listId) {
  const isRound = state.params.trip === 'round';

  if (listId === 'outbound') {
    // Si ya estaba seleccionado, deseleccionar
    if (state.selectedOutbound?.id === flight.id) {
      state.selectedOutbound = null;
    } else {
      state.selectedOutbound = flight;
      // Si es solo ida, ir directo al checkout
      if (!isRound) {
        goToCheckout();
        return;
      }
      // Si es ida y vuelta, hacer scroll al bloque de vuelta
      setTimeout(() => {
        const returnBlock = document.getElementById('returnBlock');
        if (returnBlock) returnBlock.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  } else {
    if (state.selectedReturn?.id === flight.id) {
      state.selectedReturn = null;
    } else {
      state.selectedReturn = flight;
    }
  }

  renderResults();
  updateContinueBar();
}

// ─── CONTINUE BAR ─────────────────────────────────────────────────────────────

function updateContinueBar() {
  const bar     = document.getElementById('continueBar');
  const isRound = state.params.trip === 'round';

  const hasOutbound = !!state.selectedOutbound;
  const hasReturn   = !!state.selectedReturn;
  const canContinue = isRound ? (hasOutbound && hasReturn) : hasOutbound;

  if (!bar) return;

  if (!hasOutbound && !hasReturn) {
    bar.style.display = 'none';
    return;
  }

  bar.style.display = 'block';

  const outboundText = hasOutbound
    ? `✓ Ida: ${state.selectedOutbound.flightNumber} · ${state.selectedOutbound.departure} → ${state.selectedOutbound.arrival}`
    : '— Selecciona vuelo de ida';

  const returnText = isRound
    ? (hasReturn
        ? `✓ Vuelta: ${state.selectedReturn.flightNumber} · ${state.selectedReturn.departure} → ${state.selectedReturn.arrival}`
        : '— Selecciona vuelo de vuelta')
    : '';

  const price      = state.selectedOutbound ? state.selectedOutbound.prices[state.cabin] : 0;
  const rPrice     = (isRound && state.selectedReturn) ? state.selectedReturn.prices[state.cabin] : 0;
  const total      = (price + rPrice) * state.params.passengers;

  document.getElementById('continueOutbound').textContent = outboundText;
  document.getElementById('continueReturn').textContent   = returnText;
  document.getElementById('continueReturn').style.display = isRound ? 'block' : 'none';
  document.getElementById('continueTotal').textContent    = canContinue ? `Total: ${formatPrice(total)}` : '';

  const btn = document.getElementById('btnContinueCheckout');
  btn.disabled = !canContinue;
  btn.style.opacity = canContinue ? '1' : '0.5';
  btn.textContent = canContinue
    ? `Continuar con ${isRound ? '2 vuelos' : '1 vuelo'} →`
    : isRound
      ? (hasOutbound ? 'Ahora selecciona el vuelo de vuelta' : 'Selecciona los vuelos')
      : 'Selecciona un vuelo';
}

function goToCheckout() {
  const params = new URLSearchParams({
    outboundId: state.selectedOutbound.id,
    returnId:   state.selectedReturn ? state.selectedReturn.id : '',
    cabin:      state.cabin,
    passengers: state.params.passengers,
    dateStart:  state.params.dateStart || '',
    dateEnd:    state.params.dateEnd   || '',
    trip:       state.params.trip,
  });
  window.location.href = `checkout.html?${params.toString()}`;
}

// ─── RENDER RESULTS ───────────────────────────────────────────────────────────

function renderResults() {
  const outboundFiltered = applyFilters(state.outboundFlights);
  const outboundList     = document.getElementById('outboundList');
  const outboundCount    = document.getElementById('outboundCount');
  const emptyState       = document.getElementById('emptyState');
  const outboundBlock    = document.getElementById('outboundBlock');

  outboundList.innerHTML = '';

  if (outboundFiltered.length === 0) {
    outboundBlock.style.display = 'none';
    emptyState.style.display    = 'block';
  } else {
    outboundBlock.style.display = 'block';
    emptyState.style.display    = 'none';
    outboundCount.textContent   = `${outboundFiltered.length} ${outboundFiltered.length === 1 ? 'vuelo' : 'vuelos'}`;
    outboundFiltered.forEach(flight => {
      outboundList.appendChild(renderFlightCard(flight, 'outbound'));
    });
  }

  if (state.params.trip === 'round') {
    const returnBlock    = document.getElementById('returnBlock');
    const returnFiltered = applyFilters(state.returnFlights);
    const returnList     = document.getElementById('returnList');
    const returnCount    = document.getElementById('returnCount');

    returnBlock.style.display = 'block';
    returnList.innerHTML      = '';
    returnCount.textContent   = `${returnFiltered.length} ${returnFiltered.length === 1 ? 'vuelo' : 'vuelos'}`;

    // Bloquear visualmente hasta que se seleccione ida
    returnBlock.style.opacity = state.selectedOutbound ? '1' : '0.45';
    returnBlock.style.pointerEvents = state.selectedOutbound ? 'auto' : 'none';

    const returnHint = document.getElementById('returnHint');
    if (returnHint) {
      returnHint.style.display = state.selectedOutbound ? 'none' : 'block';
    }

    if (returnFiltered.length === 0) {
      returnList.innerHTML = `
        <div style="padding:32px;text-align:center;color:#888;">
          No hay vuelos de vuelta disponibles para esta ruta.
        </div>
      `;
    } else {
      returnFiltered.forEach(flight => {
        returnList.appendChild(renderFlightCard(flight, 'return'));
      });
    }
  }
}

// ─── INIT FILTERS ─────────────────────────────────────────────────────────────

function initFilters() {
  document.querySelectorAll('input[name="sortBy"]').forEach(radio => {
    radio.addEventListener('change', e => {
      state.sortBy = e.target.value;
      renderResults();
    });
  });

  document.querySelectorAll('input[name="stops"]').forEach(cb => {
    cb.addEventListener('change', () => {
      state.stops = [...document.querySelectorAll('input[name="stops"]:checked')]
        .map(c => parseInt(c.value));
      renderResults();
    });
  });

  document.querySelectorAll('input[name="timeRange"]').forEach(cb => {
    cb.addEventListener('change', () => {
      state.timeRanges = [...document.querySelectorAll('input[name="timeRange"]:checked')]
        .map(c => c.value);
      renderResults();
    });
  });

  document.querySelectorAll('input[name="cabin"]').forEach(radio => {
    radio.addEventListener('change', e => {
      state.cabin = e.target.value;
      renderResults();
    });
  });

  document.getElementById('btnClearFilters').addEventListener('click', () => {
    document.querySelectorAll('input[name="stops"]').forEach(cb => cb.checked = true);
    document.querySelectorAll('input[name="timeRange"]').forEach(cb => cb.checked = true);
    document.querySelector('input[name="sortBy"][value="precio"]').checked = true;
    document.querySelector('input[name="cabin"][value="economica"]').checked = true;

    state.stops      = [0, 1];
    state.timeRanges = ['morning', 'afternoon', 'night'];
    state.sortBy     = 'precio';
    state.cabin      = 'economica';

    renderResults();
  });
}

// ─── INIT MODIFY PANEL ────────────────────────────────────────────────────────

function initModifyPanel() {
  const btn   = document.getElementById('btnModify');
  const panel = document.getElementById('modifyPanel');
  const p     = state.params;

  btn.addEventListener('click', () => {
    panel.classList.toggle('open');
  });

  flatpickr('#modDateStart', { dateFormat: 'd/m/Y', minDate: 'today' });
  flatpickr('#modDateEnd',   { dateFormat: 'd/m/Y', minDate: 'today' });

  setupCityFilters('modOriginDropdown',      'modOriginFilter');
  setupCityFilters('modDestinationDropdown', 'modDestinationFilter');
  setupCityInput('modOriginInput',      'modOriginDropdown');
  setupCityInput('modDestinationInput', 'modDestinationDropdown');

  const tripRadio = document.querySelector(`input[name="tripMod"][value="${p.trip}"]`);
  if (tripRadio) tripRadio.checked = true;

  const modToggle   = document.getElementById('modPassengersToggle');
  const modDropdown = document.getElementById('modPassengersDropdown');
  const modValue    = document.getElementById('modPassengersValue');
  let modCounts = { modAdult: p.passengers || 1, modChild: 0, modBaby: 0 };

  if (p.passengers) modValue.value = p.passengers;

  modToggle.addEventListener('click', e => {
    e.stopPropagation();
    modDropdown.style.display = modDropdown.style.display === 'block' ? 'none' : 'block';
  });

  modDropdown.querySelectorAll('.counter button').forEach(btn => {
    btn.addEventListener('click', () => {
      const type = btn.dataset.type;
      const op   = btn.dataset.op;
      if (op === '+') modCounts[type]++;
      if (op === '-' && modCounts[type] > 0) {
        if (type === 'modAdult' && modCounts[type] === 1) return;
        modCounts[type]--;
      }
      document.getElementById(type + 'Count').textContent = modCounts[type];
    });
  });

  modDropdown.querySelector('.confirm-passengers').addEventListener('click', () => {
    modValue.value = modCounts.modAdult + modCounts.modChild + modCounts.modBaby;
    modDropdown.style.display = 'none';
  });

  document.addEventListener('click', e => {
    if (!modToggle.contains(e.target) && !modDropdown.contains(e.target)) {
      modDropdown.style.display = 'none';
    }
  });

  document.getElementById('modifySearchForm').addEventListener('submit', e => {
    e.preventDefault();
    const newOrigin      = document.getElementById('modOriginInput').value.trim();
    const newDestination = document.getElementById('modDestinationInput').value.trim();
    const newDateStart   = document.getElementById('modDateStart').value.trim();
    const newDateEnd     = document.getElementById('modDateEnd').value.trim();
    const newPassengers  = document.getElementById('modPassengersValue').value.trim();
    const newTrip        = document.querySelector('input[name="tripMod"]:checked')?.value || 'round';

    if (!newOrigin || !newDestination) {
      alert('Por favor completa origen y destino.');
      return;
    }

    const params = new URLSearchParams({
      origin: newOrigin, destination: newDestination,
      dateStart: newDateStart, dateEnd: newDateEnd,
      passengers: newPassengers, trip: newTrip,
    });
    window.location.href = `resultados.html?${params.toString()}`;
  });

  setTimeout(() => {
    document.getElementById('modOriginInput').value      = p.originRaw      || '';
    document.getElementById('modDestinationInput').value = p.destinationRaw || '';
    if (p.dateStart) document.getElementById('modDateStart').value = p.dateStart;
    if (p.dateEnd)   document.getElementById('modDateEnd').value   = p.dateEnd;
  }, 100);
}

// ─── INIT ─────────────────────────────────────────────────────────────────────

function initResultados() {
  const params = parseSearchParams();
  state.params = params;

  state.outboundFlights = searchFlights(params.origin, params.destination);
  if (params.trip === 'round') {
    state.returnFlights = searchFlights(params.destination, params.origin);
  }

  updateSummaryBar(params);
  initFilters();
  initModifyPanel();
  renderResults();
  updateContinueBar();

  // Botón continuar
  document.getElementById('btnContinueCheckout').addEventListener('click', (e) => {
    e.preventDefault();
    const isRound    = state.params.trip === 'round';
    const canContinue = isRound
      ? (!!state.selectedOutbound && !!state.selectedReturn)
      : !!state.selectedOutbound;

    if (canContinue) goToCheckout();
  });
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('idToken');
      localStorage.removeItem('accessToken');
      const COGNITO_DOMAIN = 'https://us-east-1wai3cb0pm.auth.us-east-1.amazoncognito.com';
      const CLIENT_ID      = '1vpm1sda0irgatmcvq9iseb9b8';
      const CALLBACK_URL   = 'https://d1cq6wgq3znilx.cloudfront.net';
      window.location.href = `${COGNITO_DOMAIN}/logout?client_id=${CLIENT_ID}&logout_uri=${encodeURIComponent(CALLBACK_URL)}`;
    });
  }
}

function startWhenReady() {
  if (window._contentfulDataReady) {
    initResultados();
  } else {
    document.addEventListener('contentfulDataReady', initResultados, { once: true });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startWhenReady);
} else {
  startWhenReady();
}