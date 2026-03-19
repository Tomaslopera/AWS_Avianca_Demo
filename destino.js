/**
 * destino.js
 * Lógica de la página destino.html — sin cambios de diseño.
 * Espera window._contentfulDataReady antes de inicializar.
 */

function initDestinoPage() {
  const params        = new URLSearchParams(window.location.search);
  const cityNameParam = params.get('city');

  if (!cityNameParam) return;

  const cityName = decodeURIComponent(cityNameParam).trim();

  const cityData = (window.destinations || []).find(
    c => c.name.toLowerCase() === cityName.toLowerCase()
  );

  if (!cityData) {
    console.warn('Ciudad no encontrada:', cityName);
    return;
  }

  // ── Título ──────────────────────────────────────────────────────────────────
  const title = document.getElementById('destinationTitle');
  if (title) title.textContent = cityData.name;

  // ── Hero background (imagen desde Contentful media) ──────────────────────
  const heroBackground = document.querySelector('.city-destination-hero .hero-background');
  if (heroBackground && cityData.image) {
    heroBackground.style.backgroundImage    = `url('${cityData.image}')`;
    heroBackground.style.backgroundSize     = 'cover';
    heroBackground.style.backgroundPosition = 'center';
  }

  // ── Pre-rellenar destino en el search widget ─────────────────────────────
  const destinationInput = document.getElementById('destinationInput');
  if (destinationInput) {
    destinationInput.value = `${cityData.name} (${cityData.code})`;
  }

  // ── Tourism grid ─────────────────────────────────────────────────────────
  const tourismGrid = document.getElementById('tourismGrid');
  if (!tourismGrid) return;

  const places = (window.tourismData || {})[cityData.name] || [];

  if (places.length === 0) {
    tourismGrid.innerHTML = '<p style="text-align:center;color:#999;padding:40px 0;">No hay atracciones disponibles para este destino.</p>';
    return;
  }

  places.forEach(place => {
    const card = document.createElement('div');
    card.className = 'tourism-card';

    // Imagen de la atracción (que en nuestro caso es la del destino como fallback)
    if (place.image) {
      card.style.backgroundImage = `url('${place.image}')`;
    }

    card.innerHTML = `
      <div class="tourism-overlay"></div>
      <div class="tourism-content">
        <h4>${place.name}</h4>
        <p>${place.description}</p>
      </div>
    `;

    tourismGrid.appendChild(card);
  });
}

// ─── ARRANQUE SEGURO ──────────────────────────────────────────────────────────

function startWhenReady() {
  if (window._contentfulDataReady) {
    initDestinoPage();
  } else {
    document.addEventListener('contentfulDataReady', initDestinoPage, { once: true });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startWhenReady);
} else {
  startWhenReady();
}