/**
 * script_tu_reserva.js
 * Busca reservas guardadas en localStorage por código + documento
 * Migrable a backend: reemplazar localStorage.getItem por fetch('/api/reservations')
 */

// ─── BUSCAR RESERVA ───────────────────────────────────────────────────────────

document.getElementById('reservationForm').addEventListener('submit', (e) => {
  e.preventDefault();

  const inputs    = document.querySelectorAll('#reservationForm input[type="text"]');
  const code      = inputs[0]?.value.trim().toUpperCase();
  const docNumber = inputs[1]?.value.trim();

  if (!code || !docNumber) {
    showError('Por favor completa el código de reserva y tu número de documento.');
    return;
  }

  const reservations = JSON.parse(localStorage.getItem('avianca_reservations') || '[]');
  const found = reservations.find(r =>
    r.code === code &&
    r.passengerData?.some(p => p.docNumber === docNumber)
  );

  if (!found) {
    showError('No encontramos una reserva con ese código y documento. Verifica los datos e intenta de nuevo.');
    return;
  }

  hideError();
  renderReservationResult(found);
});

// ─── MOSTRAR RESULTADO ────────────────────────────────────────────────────────

function renderReservationResult(r) {
  const resultSection = document.getElementById('reservationResult');
  resultSection.classList.remove('hidden');

  const cabinLabel = r.cabin === 'economica' ? 'Económica' : 'Ejecutiva';
  const mainPax    = r.passengerData[0];
  const totalFmt   = `COP ${r.total.toLocaleString('es-CO')}`;

  const baggageLabels = {
    hand:  'Equipaje de mano',
    bag23: 'Maleta 23kg',
    bag32: 'Maleta 32kg',
  };

  const baggageInfo = r.baggage?.length
    ? r.baggage.map((b, i) => {
        const name = r.passengerData[i]
          ? `${r.passengerData[i].firstName} ${r.passengerData[i].lastName}`
          : `Pasajero ${i + 1}`;
        return `<div style="font-size:13px;color:#555;">${name}: ${baggageLabels[b] || b}</div>`;
      }).join('')
    : '';

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
        <div class="info-value">${mainPax.firstName} ${mainPax.lastName}</div>
      </div>
      <div class="reservation-info-item">
        <div class="info-label">Documento</div>
        <div class="info-value">${mainPax.docType} ${mainPax.docNumber}</div>
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
        <div class="info-value">${mainPax.email || '—'}</div>
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
        ${r.seatsOutbound?.length ? `<span>Asientos: ${r.seatsOutbound.join(', ')}</span>` : ''}
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
        ${r.seatsReturn?.length ? `<span>Asientos: ${r.seatsReturn.join(', ')}</span>` : ''}
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
    errorEl.id = 'reservationError';
    errorEl.className = 'reservation-error';
    document.querySelector('.reservation-card').appendChild(errorEl);
  }
  errorEl.textContent = msg;
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
