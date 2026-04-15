const CONTENTFUL_SPACE_ID     = "d4f15mm5mss6";
const CONTENTFUL_ACCESS_TOKEN = "VogJJxEWc-IPYeYGA7-pzICU6FYP90gwOSqoOtBKmJE";
const CONTENTFUL_ENV          = 'master';

const CONTENTFUL_BASE = `https://cdn.contentful.com/spaces/${CONTENTFUL_SPACE_ID}/environments/${CONTENTFUL_ENV}`;

// ─── HELPER: resuelve campos con o sin locale wrapper ─────────────────────────
function resolveField(fields, key) {
  const val = fields[key];
  if (val === undefined || val === null) return null;
  if (val && typeof val === 'object' && !Array.isArray(val) && 'en-US' in val) {
    return val['en-US'];
  }
  return val;
}

function resolveAssetUrl(assetLink, assetsMap) {
  if (!assetLink || !assetLink.sys) return '';
  const asset = assetsMap[assetLink.sys.id];
  if (!asset) return '';
  const fileField = asset.fields?.file;
  // Maneja ambos formatos: con y sin locale wrapper en assets
  const url = (fileField && typeof fileField === 'object' && 'en-US' in fileField)
    ? fileField['en-US']?.url
    : fileField?.url;
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

// ─── DESTINATIONS ─────────────────────────────────────────────────────────────

async function loadDestinations() {
  const limit   = 1000;
  let skip      = 0;
  let allItems  = [];
  let assetsMap = {};
  let total     = null;

  do {
    const url = `${CONTENTFUL_BASE}/entries?content_type=destination&limit=${limit}&skip=${skip}&include=1`;
    const res = await fetch(url, { headers: { Authorization: `Bearer ${CONTENTFUL_ACCESS_TOKEN}` } });
    if (!res.ok) throw new Error(`Contentful HTTP ${res.status}`);

    const data = await res.json();
    total    = data.total;
    allItems = allItems.concat(data.items);
    if (data.includes?.Asset) {
      data.includes.Asset.forEach(asset => { assetsMap[asset.sys.id] = asset; });
    }
    skip += limit;
  } while (allItems.length < total);

  const destinations = allItems.map(entry => {
    const f = entry.fields;
    return {
      name:        resolveField(f, 'name')        ?? '',
      code:        resolveField(f, 'code')        ?? '',
      country:     resolveField(f, 'country')     ?? '',
      type:        resolveField(f, 'type')        ?? '',
      region:      resolveField(f, 'type') === 'national' ? 'CO' : 'INT',
      image:       resolveAssetUrl(resolveField(f, 'media'), assetsMap),
      attractions: resolveField(f, 'attractions') ?? [],
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

  let currentPage = 'home';
  if (path.includes('ofertas'))    currentPage = 'ofertas';
  if (path.includes('tu_reserva')) currentPage = 'tu_reserva';

  const entry = items.find(i => resolveField(i.fields, 'page') === currentPage);
  if (!entry) return;

  const imageUrl = resolveAssetUrl(resolveField(entry.fields, 'backgroundImage'), assetsMap);
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
    return (order[resolveField(a.fields, 'variant')] ?? 9) - (order[resolveField(b.fields, 'variant')] ?? 9);
  });

  container.innerHTML = '';
  sorted.forEach(entry => {
    const get      = (key) => resolveField(entry.fields, key);
    const imageUrl = resolveAssetUrl(get('backgroundImage'), assetsMap);
    const card     = document.createElement('div');
    card.className = `promo-banner-card ${get('variant') ?? ''}`;

    if (get('variant') === 'large') {
      card.innerHTML = `
        <div class="banner-image" ${imageUrl ? `style="background-image:url('${imageUrl}')"` : ''}>
          <div class="banner-content">
            ${get('badge') ? `<div class="banner-badge">${get('badge')}</div>` : ''}
            <h2>${get('title') ?? ''}<br><strong>${get('subtitle') ?? ''}</strong></h2>
          </div>
        </div>`;
    } else {
      card.innerHTML = `
        <div class="banner-content-right">
          <h3>${get('title') ?? ''}</h3>
          <p>${get('description') ?? ''}</p>
          <button class="btn-white">${get('buttonText') ?? ''}</button>
        </div>`;
    }
    container.appendChild(card);
  });
}

// ─── LIFEMILES CARDS ──────────────────────────────────────────────────────────

async function loadLifemilesCards() {
  const grid = document.querySelector('.lifemiles-grid');
  if (!grid) return;

  const { items, assetsMap } = await fetchEntries('lifemilesCard');
  const sorted = items.sort((a, b) => (resolveField(a.fields, 'order') ?? 0) - (resolveField(b.fields, 'order') ?? 0));
  grid.innerHTML = '';

  sorted.forEach(entry => {
    const get      = (key) => resolveField(entry.fields, key);
    const imageUrl = resolveAssetUrl(get('backgroundImage'), assetsMap);
    const card     = document.createElement('div');
    card.className = 'lifemiles-card';
    if (imageUrl) card.style.backgroundImage = `url('${imageUrl}')`;
    card.innerHTML = `
      <div class="lifemiles-overlay"></div>
      <div class="lifemiles-content">
        <h4>${get('title') ?? ''}</h4>
        <p>${get('description') ?? ''}</p>
        <button class="btn-white">${get('buttonText') ?? ''}</button>
      </div>`;
    grid.appendChild(card);
  });
}

// ─── INTEREST CARDS ───────────────────────────────────────────────────────────

async function loadInterestCards() {
  const grid = document.querySelector('.interest-grid');
  if (!grid) return;

  const { items, assetsMap } = await fetchEntries('interestCard');
  const sorted = items.sort((a, b) => (resolveField(a.fields, 'order') ?? 0) - (resolveField(b.fields, 'order') ?? 0));
  grid.innerHTML = '';

  sorted.forEach(entry => {
    const get      = (key) => resolveField(entry.fields, key);
    const imageUrl = resolveAssetUrl(get('backgroundImage'), assetsMap);
    const card     = document.createElement('div');
    card.className = 'interest-card';
    if (imageUrl) card.style.backgroundImage = `url('${imageUrl}')`;
    card.innerHTML = `
      <div class="interest-overlay"></div>
      <div class="interest-content">
        <h4>${get('title') ?? ''}</h4>
        <p>${get('description') ?? ''}</p>
      </div>`;
    grid.appendChild(card);
  });
}

// ─── PREPARE CARDS ────────────────────────────────────────────────────────────

async function loadPrepareCards() {
  const grid = document.querySelector('.prepare-grid');
  if (!grid) return;

  const { items, assetsMap } = await fetchEntries('prepareCard');
  const sorted = items.sort((a, b) => (resolveField(a.fields, 'order') ?? 0) - (resolveField(b.fields, 'order') ?? 0));
  grid.innerHTML = '';

  sorted.forEach(entry => {
    const get      = (key) => resolveField(entry.fields, key);
    const imageUrl = resolveAssetUrl(get('backgroundImage'), assetsMap);
    const card     = document.createElement('div');
    card.className = 'prepare-card';
    if (imageUrl) card.style.backgroundImage = `url('${imageUrl}')`;
    card.innerHTML = `
      <div class="prepare-overlay"></div>
      <div class="prepare-content">
        <h4>${get('title') ?? ''}</h4>
        <p>${get('description') ?? ''}</p>
      </div>`;
    grid.appendChild(card);
  });
}

// ─── EXPERIENCE CARDS ─────────────────────────────────────────────────────────

async function loadExperienceCards() {
  const grid = document.querySelector('.experience-grid');
  if (!grid) return;

  const { items, assetsMap } = await fetchEntries('experienceCard');
  const sorted = items.sort((a, b) => (resolveField(a.fields, 'order') ?? 0) - (resolveField(b.fields, 'order') ?? 0));
  grid.innerHTML = '';

  sorted.forEach(entry => {
    const get      = (key) => resolveField(entry.fields, key);
    const imageUrl = resolveAssetUrl(get('backgroundImage'), assetsMap);
    const card     = document.createElement('div');
    card.className = 'experience-card';
    if (imageUrl) card.style.backgroundImage = `url('${imageUrl}')`;
    card.innerHTML = `
      <div class="experience-overlay"></div>
      <div class="experience-content">
        <h4>${get('title') ?? ''}</h4>
        <p>${get('description') ?? ''}</p>
      </div>`;
    grid.appendChild(card);
  });
}

// ─── SOCIAL ICONS ─────────────────────────────────────────────────────────────

const SOCIAL_ICONS = {
  twitter:   `<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>`,
  facebook:  `<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>`,
  youtube:   `<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>`,
  instagram: `<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>`,
};

// ─── SITE HEADER ──────────────────────────────────────────────────────────────

async function loadSiteHeader() {
  const { items } = await fetchEntries('siteHeader');

  if (!items.length) {
    console.warn('⚠️ siteHeader: 0 items en Contentful');
    return;
  }

  const entry = items[0];
  const get   = (key) => resolveField(entry.fields, key);

  // Top bar
  const topBarLinks = get('topBarLinks');
  const topBar      = document.querySelector('.top-bar-right');
  if (topBar && Array.isArray(topBarLinks) && topBarLinks.length) {
    topBar.innerHTML = topBarLinks.map(link =>
      `<a href="${link.href ?? '#'}" class="top-bar-link">${link.label ?? ''}</a>`
    ).join('');
  } else {
    console.warn('⚠️ topBarLinks:', topBarLinks, '| .top-bar-right el:', topBar);
  }

  // Logo
  const logo     = get('logo');
  const logoText = document.querySelector('.logo text');
  if (logoText && logo) logoText.textContent = logo;

  // Nav
  const navLinks = get('navLinks');
  const navMenu  = document.querySelector('.nav-menu');
  if (navMenu && Array.isArray(navLinks) && navLinks.length) {
    navMenu.innerHTML = navLinks.map(link =>
      `<li><a href="${link.href ?? '#'}" class="nav-link">${link.label ?? ''}</a></li>`
    ).join('');
  } else {
    console.warn('⚠️ navLinks:', navLinks, '| .nav-menu el:', navMenu);
  }
}

// ─── SITE FOOTER ──────────────────────────────────────────────────────────────

async function loadSiteFooter() {
  const { items } = await fetchEntries('siteFooter');

  if (!items.length) {
    console.warn('⚠️ siteFooter: 0 items en Contentful');
    return;
  }

  const entry = items[0];
  const get   = (key) => resolveField(entry.fields, key);

  // Columns
  const columns    = get('columns');
  const footerGrid = document.querySelector('.footer-grid');
  if (footerGrid && Array.isArray(columns) && columns.length) {
    footerGrid.innerHTML = columns.map(col => `
      <div class="footer-column">
        <h4>${col.title ?? ''}</h4>
        <ul>
          ${(col.links ?? []).map(link =>
            `<li><a href="${link.href ?? '#'}">${link.label ?? ''}</a></li>`
          ).join('')}
        </ul>
      </div>
    `).join('');
  }

  // Social
  const socialLinks  = get('socialLinks');
  const footerSocial = document.querySelector('.footer-social');
  if (footerSocial && Array.isArray(socialLinks) && socialLinks.length) {
    footerSocial.innerHTML = socialLinks.map(s => `
      <a href="${s.href ?? '#'}" aria-label="${s.platform ?? ''}">
        ${SOCIAL_ICONS[s.platform] ?? ''}
      </a>
    `).join('');
  }

  // Copyright
  const copyrightText = get('copyrightText');
  const copyrightEl   = document.querySelector('.footer-bottom p');
  if (copyrightEl && copyrightText) copyrightEl.textContent = copyrightText;

  // Powered by
  const poweredByText = get('poweredBy');
  const poweredByEl   = document.querySelector('.footer-bottom .powered-by');
  if (poweredByEl && poweredByText) poweredByEl.textContent = poweredByText;
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
      loadSiteHeader(),
      loadSiteFooter(),
    ]);

    window._contentfulDataReady = true;
    document.dispatchEvent(new Event('contentfulDataReady'));
    console.log(`✅ Contentful: ${window.destinations.length} destinos + contenido estático cargado`);

  } catch (err) {
    console.error('❌ Error cargando Contentful:', err);
    window.destinations         = [];
    window.touriumData          = {};
    window._contentfulDataReady = true;
    document.dispatchEvent(new Event('contentfulDataReady'));
  }
}

loadContentfulData();