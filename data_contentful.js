const CONTENTFUL_SPACE_ID = "d4f15mm5mss6";
const CONTENTFUL_ACCESS_TOKEN = "VogJJxEWc-IPYeYGA7-pzICU6FYP90gwOSqoOtBKmJE";
const CONTENTFUL_ENV = 'master';

const CONTENTFUL_BASE = `https://cdn.contentful.com/spaces/${CONTENTFUL_SPACE_ID}/environments/${CONTENTFUL_ENV}`;


async function fetchAllDestinations() {
  const limit  = 1000;
  let skip = 0;
  let allItems = [];
  let assetsMap = {};
  let total    = null;

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

  return { items: allItems, assetsMap };
}


function resolveAssetUrl(assetLink, assetsMap) {
  if (!assetLink || !assetLink.sys) return '';
  const asset = assetsMap[assetLink.sys.id];
  if (!asset) return '';
  const url = asset.fields?.file?.url;
  if (!url) return '';
  return url.startsWith('//') ? `https:${url}` : url;
}

async function loadContentfulData() {
  try {
    const { items, assetsMap } = await fetchAllDestinations();

    const destinations = items.map(entry => {
      const f = entry.fields;

      const image = resolveAssetUrl(f.media, assetsMap);

      return {
        name: f.name ?? '',
        code: f.code ?? '',
        country: f.country ?? '',
        type: f.type ?? '',
        region: f.type === 'national' ? 'CO' : 'INT',
        image,
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

    window.destinations         = destinations;
    window.tourismData          = tourismData;
    window._contentfulDataReady = true;

    document.dispatchEvent(new Event('contentfulDataReady'));

    console.log(`Contentful: ${destinations.length} destinos cargados`);

  } catch (err) {
    console.error('Error cargando Contentful:', err);

    window.destinations         = [];
    window.tourismData          = {};
    window._contentfulDataReady = true;

    document.dispatchEvent(new Event('contentfulDataReady'));
  }
}

loadContentfulData();