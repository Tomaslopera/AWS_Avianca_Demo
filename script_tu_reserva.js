/**
 * script_tu_reserva.js
 * Consulta reservas desde la API (GET /bookings/{code})
 */

const API_BASE = 'https://qxsi6eee0k.execute-api.us-east-1.amazonaws.com';
const BOOKINGS_PATH = 'lambda-bookings';

// ─── BUSCAR RESERVA ───────────────────────────────────────────────────────────

document.getElementById('reservationForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const inputs    = document.querySelectorAll('#reservationForm input[type="text"]');
  const code      = inputs[0]?.value.trim().toUpperCase();
  const docNumber = inputs[1]?.value.trim();

  if (!code || !docNumber) {
    showError('Por favor completa el código de reserva y tu número de documento.');
    return;
  }

  const btn = e.target.querySelector('button[type="submit"]');
  btn.textContent = 'Buscando...';
  btn.disabled    = true;

  try {
    const res = await fetch(`${API_BASE}/${BOOKINGS_PATH}/${code}`, {
      headers: { 'Authorization': localStorage.getItem('idToken') || '' },
    });

    if (res.status === 404) {
      showError('No encontramos una reserva con ese código. Verifica los datos e intenta de nuevo.');
      return;
    }
    if (!res.ok) throw new Error(`Error ${res.status}`);

    const data = await res.json();
    const rows = data.booking || [];

    if (!rows.length) {
      showError('No encontramos una reserva con ese código. Verifica los datos e intenta de nuevo.');
      return;
    }

    hideError();
    renderReservationResult(rows);
  } catch (err) {
    showError(`Error al consultar: ${err.message}`);
  } finally {
    btn.textContent = 'Buscar reserva';
    btn.disabled    = false;
  }
});

// ─── PARSEAR RESPUESTA API ─────────────────────────────────────────────────────

function parseApiBooking(rows) {
  const first       = rows[0];
  const outboundRow = rows.find(r => r.leg_type === 'outbound');
  const returnRow   = rows.find(r => r.leg_type === 'return');

  // Unique passengers keyed by name (rows are flat: passenger × leg)
  const passengerMap = new Map();
  rows.forEach(r => {
    const key = `${r.first_name}|${r.last_name}`;
    if (!passengerMap.has(key)) {
      passengerMap.set(key, {
        first_name:    r.first_name,
        last_name:     r.last_name,
        is_lead:       r.is_lead,
        baggage_type:  r.baggage_type,
        baggage_price: r.baggage_price,
        seats:         {},
      });
    }
    passengerMap.get(key).seats[r.leg_type] = r.seat_code;
  });

  const passengers = [...passengerMap.values()];

  const formatDate = iso => {
    if (!iso) return '';
    const [y, m, d] = iso.split('-');
    return `${d}/${m}/${y}`;
  };

  const formatCreated = iso => {
    if (!iso) return '';
    return new Date(iso).toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const buildLeg = row => row ? {
    flightNumber: row.flight_number,
    origin:       `${row.origin_city} (${row.origin_iata})`,
    destination:  `${row.destination_city} (${row.destination_iata})`,
    departure:    row.departure,
    arrival:      row.arrival,
    date:         formatDate(row.flight_date),
  } : null;

  return {
    code:          first.booking_code,
    status:        first.status,
    cabin:         first.cabin,
    passengers:    first.passengers_count,
    email:         first.contact_email,
    total:         first.total_cop,
    date:          formatCreated(first.created_at),
    outbound:      buildLeg(outboundRow),
    return:        buildLeg(returnRow),
    seatsOutbound: passengers.map(p => p.seats['outbound']).filter(Boolean),
    seatsReturn:   passengers.map(p => p.seats['return']).filter(Boolean),
    passengerList: passengers,
  };
}

// ─── MOSTRAR RESULTADO ────────────────────────────────────────────────────────

function renderReservationResult(rows) {
  const r             = parseApiBooking(rows);
  const resultSection = document.getElementById('reservationResult');
  resultSection.classList.remove('hidden');

  const cabinLabel = r.cabin === 'economica' ? 'Económica' : 'Ejecutiva';
  const totalFmt   = `COP ${r.total.toLocaleString('es-CO')}`;
  const leadPax    = r.passengerList.find(p => p.is_lead) || r.passengerList[0];

  const baggageLabels = { hand: 'Solo equipaje de mano', bag23: 'Maleta 23 kg', bag32: 'Maleta 32 kg' };

  const baggageInfo = r.passengerList.map(p =>
    `<div style="font-size:13px;color:#555;">${p.first_name} ${p.last_name}: ${baggageLabels[p.baggage_type] || p.baggage_type}</div>`
  ).join('');

  resultSection.querySelector('.result-card').innerHTML = `

    <!-- Header -->
    <div class="reservation-result-header">
      <div class="reservation-result-icon"></div>
      <div>
        <h3>Reserva encontrada</h3>
        <div class="reservation-code">${r.code}</div>
        <div class="reservation-date">Comprada el ${r.date}</div>
      </div>
    </div>

    <!-- Resumen general -->
    <div class="reservation-info-grid">
      <div class="reservation-info-item">
        <div class="info-label">Pasajero principal</div>
        <div class="info-value">${leadPax.first_name} ${leadPax.last_name}</div>
      </div>
      <div class="reservation-info-item">
        <div class="info-label">Estado</div>
        <div class="info-value">${r.status === 'confirmed' ? 'Confirmada' : r.status}</div>
      </div>
      <div class="reservation-info-item">
        <div class="info-label">Pasajeros</div>
        <div class="info-value">${r.passengers}</div>
      </div>
      <div class="reservation-info-item">
        <div class="info-label">Clase</div>
        <div class="info-value">${cabinLabel}</div>
      </div>
      <div class="reservation-info-item">
        <div class="info-label">Total pagado</div>
        <div class="info-value info-value-price">${totalFmt}</div>
      </div>
      <div class="reservation-info-item">
        <div class="info-label">Contacto</div>
        <div class="info-value">${r.email || '—'}</div>
      </div>
    </div>

    <!-- Vuelo de ida -->
    <div class="reservation-flight-card">
      <div class="reservation-flight-badge">✈ Vuelo de ida</div>
      <div class="reservation-flight-route">
        <div>
          <div class="reservation-flight-time">${r.outbound.departure}</div>
          <div class="reservation-flight-city">${r.outbound.origin}</div>
        </div>
        <div class="reservation-flight-arrow">
          <div class="reservation-flight-number">${r.outbound.flightNumber}</div>
          <div class="reservation-flight-line"></div>
        </div>
        <div style="text-align:right">
          <div class="reservation-flight-time">${r.outbound.arrival}</div>
          <div class="reservation-flight-city">${r.outbound.destination}</div>
        </div>
      </div>
      <div class="reservation-flight-meta">
        <span>${r.outbound.date}</span>
        ${r.seatsOutbound.length ? `<span>Asientos: ${r.seatsOutbound.join(', ')}</span>` : ''}
      </div>
    </div>

    <!-- Vuelo de vuelta (si aplica) -->
    ${r.return ? `
    <div class="reservation-flight-card return">
      <div class="reservation-flight-badge return">↩ Vuelo de vuelta</div>
      <div class="reservation-flight-route">
        <div>
          <div class="reservation-flight-time">${r.return.departure}</div>
          <div class="reservation-flight-city">${r.return.origin}</div>
        </div>
        <div class="reservation-flight-arrow">
          <div class="reservation-flight-number">${r.return.flightNumber}</div>
          <div class="reservation-flight-line"></div>
        </div>
        <div style="text-align:right">
          <div class="reservation-flight-time">${r.return.arrival}</div>
          <div class="reservation-flight-city">${r.return.destination}</div>
        </div>
      </div>
      <div class="reservation-flight-meta">
        <span>${r.return.date}</span>
        ${r.seatsReturn.length ? `<span>Asientos: ${r.seatsReturn.join(', ')}</span>` : ''}
      </div>
    </div>` : ''}

    <!-- Equipaje -->
    ${baggageInfo ? `
    <div class="reservation-baggage">
      <div class="reservation-section-title">Equipaje</div>
      ${baggageInfo}
    </div>` : ''}

    <!-- Acciones -->
    <div class="reservation-actions">
      <button class="btn-print" onclick="window.print()">Imprimir itinerario</button>
    </div>
  `;

  resultSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ─── MANEJO DE ERRORES ────────────────────────────────────────────────────────

function showError(msg) {
  let errorEl = document.getElementById('reservationError');
  if (!errorEl) {
    errorEl = document.createElement('div');
    errorEl.id        = 'reservationError';
    errorEl.className = 'reservation-error';
    document.querySelector('.reservation-card').appendChild(errorEl);
  }
  errorEl.textContent  = msg;
  errorEl.style.display = 'block';
}

function hideError() {
  const errorEl = document.getElementById('reservationError');
  if (errorEl) errorEl.style.display = 'none';
}

// ─── LOGOUT ───────────────────────────────────────────────────────────────────

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
