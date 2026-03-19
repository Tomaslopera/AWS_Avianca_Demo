/**
 * script_ofertas.js
 * Lógica de la página ofertas.html — sin cambios de diseño.
 * Espera window._contentfulDataReady antes de inicializar.
 */

// ─── PRECIOS POR PAÍS ─────────────────────────────────────────────────────────

function generatePriceByCountry(country) {
  let min, max;

  switch (country) {
    case 'Colombia':
      min = 70000;   max = 220000;   break;
    case 'Argentina': case 'Bolivia': case 'Brasil':
    case 'Chile':     case 'Ecuador': case 'Guyana':
    case 'Paraguay':  case 'Perú':    case 'Uruguay': case 'Venezuela':
      min = 450000;  max = 950000;   break;
    case 'Costa Rica': case 'El Salvador': case 'Guatemala':
    case 'Honduras':   case 'Nicaragua':   case 'Panamá':
    case 'Aruba':      case 'Curazao':     case 'Puerto Rico':
    case 'República Dominicana':
      min = 700000;  max = 1400000;  break;
    case 'Estados Unidos': case 'Canadá': case 'México':
      min = 900000;  max = 2200000;  break;
    case 'España': case 'Francia': case 'Reino Unido':
      min = 2800000; max = 5500000;  break;
    default:
      min = 500000;  max = 1000000;
  }

  return Math.floor(Math.random() * (max - min) + min);
}

// ─── SELECTORES ───────────────────────────────────────────────────────────────

function loadOriginSelector() {
  const select = document.getElementById('originSelector');
  if (!select) return;

  destinations
    .filter(city => city.country === 'Colombia')
    .forEach(city => {
      const option = document.createElement('option');
      option.value       = city.name;
      option.textContent = city.name;
      if (city.name === 'Bogotá') option.selected = true;
      select.appendChild(option);
    });
}

function loadCountrySelector() {
  const selector = document.getElementById('countrySelector');
  if (!selector) return;

  const countries = [...new Set(destinations.map(d => d.country))].sort();

  countries.forEach(country => {
    const option = document.createElement('option');
    option.value       = country;
    option.textContent = country;
    selector.appendChild(option);
  });
}

// ─── RENDER CARDS ─────────────────────────────────────────────────────────────

const internationalHubs = ['Bogotá', 'Medellín', 'Cali'];

function renderOffers(selectedOrigin, selectedCountry) {
  const grid = document.getElementById('offersGrid');
  if (!grid) return;
  grid.innerHTML = '';

  const filtered = destinations.filter(city => {
    if (city.name === selectedOrigin) return false;

    const isInternational = city.type === 'international' || city.region === 'INT';
    if (isInternational && !internationalHubs.includes(selectedOrigin)) return false;

    if (selectedCountry && selectedCountry !== 'ALL') {
      if (city.country !== selectedCountry) return false;
    }

    return true;
  });

  filtered.forEach(city => {
    const price = generatePriceByCountry(city.country);
    const card  = document.createElement('div');
    card.className = 'offer-card';

    card.innerHTML = `
      <div class="offer-image" style="background-image:url('${city.image}')"></div>
      <div class="offer-info">
        <div>
          <h4>${city.name}</h4>
          <h5>${city.country}</h5>
          <p>Por trayecto desde</p>
        </div>
        <div>
          <span class="badge">Acumula millas</span>
          <strong>COP ${price.toLocaleString('es-CO')}</strong>
        </div>
      </div>
    `;

    card.addEventListener('click', () => {
      window.location.href = `destino.html?city=${encodeURIComponent(city.name)}`;
    });

    grid.appendChild(card);
  });
}

// ─── INICIALIZACIÓN ───────────────────────────────────────────────────────────

function initOfertasPage() {
  loadOriginSelector();
  loadCountrySelector();

  const originSelector  = document.getElementById('originSelector');
  const countrySelector = document.getElementById('countrySelector');
  const originLabel     = document.getElementById('originCityLabel');

  if (!originSelector || !countrySelector) return;

  function updateOffers() {
    renderOffers(originSelector.value, countrySelector.value);
  }

  originSelector.addEventListener('change', () => {
    if (originLabel) originLabel.textContent = originSelector.value;
    updateOffers();
  });

  countrySelector.addEventListener('change', updateOffers);

  updateOffers();
}

// ─── ARRANQUE SEGURO ──────────────────────────────────────────────────────────
// Funciona sin importar si Contentful cargó antes o después que este script.

function startWhenReady() {
  if (window._contentfulDataReady) {
    initOfertasPage();
  } else {
    document.addEventListener('contentfulDataReady', initOfertasPage, { once: true });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startWhenReady);
} else {
  startWhenReady();
}