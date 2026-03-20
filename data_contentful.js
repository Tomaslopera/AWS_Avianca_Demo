const CONTENTFUL_SPACE_ID     = "d4f15mm5mss6";
const CONTENTFUL_ACCESS_TOKEN = "VogJJxEWc-IPYeYGA7-pzICU6FYP90gwOSqoOtBKmJE";
const CONTENTFUL_ENV          = 'master';

const CONTENTFUL_BASE = `https://cdn.contentful.com/spaces/${CONTENTFUL_SPACE_ID}/environments/${CONTENTFUL_ENV}`;

// ─── HELPERS ──────────────────────────────────────────────────────────────────

function resolveAssetUrl(assetLink, assetsMap) {
  if (!assetLink || !assetLink.sys) return '';
  const asset = assetsMap[assetLink.sys.id];
  if (!asset) return '';
  const url = asset.fields?.file?.url;
  if (!url) return '';
  return url.startsWith('//') ? `https:${url}` : url;
}

async function fetchEntries(contentType) {
  const url = `${CONTENTFUL_BASE}/entries?content_type=${contentType}&limit=1000&include=1`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${CONTENTFUL_ACCESS_TOKEN}` }
  });
  if (!res.ok) throw new Error(`Contentful HTTP ${res.status} — ${contentType}`);
  const data = await res.json();

  const assetsMap = {};
  (data.includes?.Asset || []).forEach(a => { assetsMap[a.sys.id] = a; });

  return { items: data.items, assetsMap };
}

// ─── DESTINATIONS (tu código original, sin cambios) ───────────────────────────

async function loadDestinations() {
  const limit   = 1000;
  let skip      = 0;
  let allItems  = [];
  let assetsMap = {};
  let total     = null;

  do {
    const url = `${CONTENTFUL_BASE}/entries?content_type=destination&limit=${limit}&skip=${skip}&include=1`;
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${CONTENTFUL_ACCESS_TOKEN}` }
    });
    if (!res.ok) throw new Error(`Contentful HTTP ${res.status}`);

    const data = await res.json();
    total    = data.total;
    allItems = allItems.concat(data.items);

    if (data.includes && data.includes.Asset) {
      data.includes.Asset.forEach(asset => {
        assetsMap[asset.sys.id] = asset;
      });
    }

    skip += limit;
  } while (allItems.length < total);

  const destinations = allItems.map(entry => {
    const f = entry.fields;
    return {
      name:        f.name        ?? '',
      code:        f.code        ?? '',
      country:     f.country     ?? '',
      type:        f.type        ?? '',
      region:      f.type === 'national' ? 'CO' : 'INT',
      image:       resolveAssetUrl(f.media, assetsMap),
      attractions: f.attractions ?? [],
    };
  });

  destinations.sort((a, b) => {
    if (a.type === b.type) return a.name.localeCompare(b.name, 'es');
    return a.type === 'national' ? -1 : 1;
  });

  const tourismData = {};
  destinations.forEach(dest => {
    tourismData[dest.name] = (dest.attractions || []).map(attr => ({
      name:        attr.name        ?? '',
      description: attr.description ?? '',
      tag:         attr.tag         ?? '',
      image:       dest.image,
    }));
  });

  window.destinations = destinations;
  window.tourismData  = tourismData;
}

// ─── HERO CONFIG ──────────────────────────────────────────────────────────────

async function loadHeroConfig() {
  const { items, assetsMap } = await fetchEntries('heroConfig');

  const path = window.location.pathname;

  let currentPage;
  if (path.includes('ofertas')) {
    currentPage = 'ofertas';
  } else if (path.includes('tu_reserva')) {
    currentPage = 'tu_reserva';
  } else {
    currentPage = 'home';
  }

  const entry = items.find(i => i.fields.page === currentPage);
  if (!entry) return;

  const imageUrl = resolveAssetUrl(entry.fields.backgroundImage, assetsMap);
  if (!imageUrl) return;

  const heroBg   = document.querySelector('.hero-background');
  const pageHero = document.querySelector('.page-hero');

  if (heroBg) {
    heroBg.style.backgroundImage    = `url('${imageUrl}')`;
    heroBg.style.backgroundSize     = 'cover';
    heroBg.style.backgroundPosition = 'center';
  }

  if (pageHero) {
    pageHero.style.backgroundImage    = `url('${imageUrl}')`;
    pageHero.style.backgroundSize     = 'cover';
    pageHero.style.backgroundPosition = 'center';
  }
}

// ─── PROMO BANNERS ────────────────────────────────────────────────────────────

async function loadPromoBanners() {
  const container = document.querySelector('.banner-grid');
  if (!container) return;

  const { items, assetsMap } = await fetchEntries('promoBanner');

  const sorted = items.sort((a, b) => {
    const order = { large: 0, red: 1 };
    return (order[a.fields.variant] ?? 9) - (order[b.fields.variant] ?? 9);
  });

  container.innerHTML = '';

  sorted.forEach(entry => {
    const f        = entry.fields;
    const imageUrl = resolveAssetUrl(f.backgroundImage, assetsMap);
    const card     = document.createElement('div');
    card.className = `promo-banner-card ${f.variant ?? ''}`;

    if (f.variant === 'large') {
      card.innerHTML = `
        <div class="banner-image" ${imageUrl ? `style="background-image:url('${imageUrl}')"` : ''}>
          <div class="banner-content">
            ${f.badge ? `<div class="banner-badge">${f.badge}</div>` : ''}
            <h2>${f.title ?? ''}<br><strong>${f.subtitle ?? ''}</strong></h2>
          </div>
        </div>
      `;
    } else {
      card.innerHTML = `
        <div class="banner-content-right">
          <h3>${f.title ?? ''}</h3>
          <p>${f.description ?? ''}</p>
          <button class="btn-white">${f.buttonText ?? ''}</button>
        </div>
      `;
    }

    container.appendChild(card);
  });
}

// ─── LIFEMILES CARDS ──────────────────────────────────────────────────────────

async function loadLifemilesCards() {
  const grid = document.querySelector('.lifemiles-grid');
  if (!grid) return;

  const { items, assetsMap } = await fetchEntries('lifemilesCard');
  const sorted = items.sort((a, b) => (a.fields.order ?? 0) - (b.fields.order ?? 0));

  grid.innerHTML = '';

  sorted.forEach(entry => {
    const f        = entry.fields;
    const imageUrl = resolveAssetUrl(f.backgroundImage, assetsMap);
    const card     = document.createElement('div');
    card.className = 'lifemiles-card';

    if (imageUrl) card.style.backgroundImage = `url('${imageUrl}')`;

    card.innerHTML = `
      <div class="lifemiles-overlay"></div>
      <div class="lifemiles-content">
        <h4>${f.title ?? ''}</h4>
        <p>${f.description ?? ''}</p>
        <button class="btn-white">${f.buttonText ?? ''}</button>
      </div>
    `;

    grid.appendChild(card);
  });
}

// ─── INTEREST CARDS ───────────────────────────────────────────────────────────

async function loadInterestCards() {
  const grid = document.querySelector('.interest-grid');
  if (!grid) return;

  const { items, assetsMap } = await fetchEntries('interestCard');
  const sorted = items.sort((a, b) => (a.fields.order ?? 0) - (b.fields.order ?? 0));

  grid.innerHTML = '';

  sorted.forEach(entry => {
    const f        = entry.fields;
    const imageUrl = resolveAssetUrl(f.backgroundImage, assetsMap);
    const card     = document.createElement('div');
    card.className = 'interest-card';

    if (imageUrl) card.style.backgroundImage = `url('${imageUrl}')`;

    card.innerHTML = `
      <div class="interest-overlay"></div>
      <div class="interest-content">
        <h4>${f.title ?? ''}</h4>
        <p>${f.description ?? ''}</p>
      </div>
    `;

    grid.appendChild(card);
  });
}

// ─── PREPARE CARDS ────────────────────────────────────────────────────────────

async function loadPrepareCards() {
  const grid = document.querySelector('.prepare-grid');
  if (!grid) return;

  const { items, assetsMap } = await fetchEntries('prepareCard');
  const sorted = items.sort((a, b) => (a.fields.order ?? 0) - (b.fields.order ?? 0));

  grid.innerHTML = '';

  sorted.forEach(entry => {
    const f        = entry.fields;
    const imageUrl = resolveAssetUrl(f.backgroundImage, assetsMap);
    const card     = document.createElement('div');
    card.className = 'prepare-card';

    if (imageUrl) card.style.backgroundImage = `url('${imageUrl}')`;

    card.innerHTML = `
      <div class="prepare-overlay"></div>
      <div class="prepare-content">
        <h4>${f.title ?? ''}</h4>
        <p>${f.description ?? ''}</p>
      </div>
    `;

    grid.appendChild(card);
  });
}

// ─── EXPERIENCE CARDS ─────────────────────────────────────────────────────────

async function loadExperienceCards() {
  const grid = document.querySelector('.experience-grid');
  if (!grid) return;

  const { items, assetsMap } = await fetchEntries('experienceCard');
  const sorted = items.sort((a, b) => (a.fields.order ?? 0) - (b.fields.order ?? 0));

  grid.innerHTML = '';

  sorted.forEach(entry => {
    const f        = entry.fields;
    const imageUrl = resolveAssetUrl(f.backgroundImage, assetsMap);
    const card     = document.createElement('div');
    card.className = 'experience-card';

    if (imageUrl) card.style.backgroundImage = `url('${imageUrl}')`;

    card.innerHTML = `
      <div class="experience-overlay"></div>
      <div class="experience-content">
        <h4>${f.title ?? ''}</h4>
        <p>${f.description ?? ''}</p>
      </div>
    `;

    grid.appendChild(card);
  });
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────

async function loadContentfulData() {
  try {
    await loadDestinations();

    await Promise.all([
      loadHeroConfig(),
      loadPromoBanners(),
      loadLifemilesCards(),
      loadInterestCards(),
      loadPrepareCards(),
      loadExperienceCards(),
    ]);

    window._contentfulDataReady = true;
    document.dispatchEvent(new Event('contentfulDataReady'));
    console.log(`✅ Contentful: ${window.destinations.length} destinos + contenido estático cargado`);

  } catch (err) {
    console.error('❌ Error cargando Contentful:', err);
    window.destinations         = [];
    window.tourismData          = {};
    window._contentfulDataReady = true;
    document.dispatchEvent(new Event('contentfulDataReady'));
  }
}

loadContentfulData();