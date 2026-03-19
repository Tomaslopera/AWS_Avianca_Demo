require('dotenv').config();
const { createClient } = require('contentful-management');
const fs = require('fs');
const path = require('path');

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN;
const ENVIRONMENT = process.env.CONTENTFUL_ENVIRONMENT || 'master';

const IMAGES_DIR = path.join(__dirname, 'images', 'cities');

const destinationImages = [
  { code: 'AUC', file: 'image-arauca.jpg' },
  { code: 'AXM', file: 'image-armenia.webp' },
  { code: 'EJA', file: 'image-barrancabermeja.webp' },
  { code: 'BAQ', file: 'image-barranquilla.webp' },
  { code: 'BOG', file: 'image-bogota.jpg' },
  { code: 'BGA', file: 'image-bucaramanga.webp' },
  { code: 'CLO', file: 'image-cali.jpg' },
  { code: 'CTG', file: 'image-cartagena.jpg' },
  { code: 'CUC', file: 'image-cucuta.webp' },
  { code: 'IBE', file: 'image-ibague.jpg' },
  { code: 'IPI', file: 'image-ipiales.jpg' },
  { code: 'LET', file: 'image-leticia.jpg' },
  { code: 'MDE', file: 'image-medellin.webp' },
  { code: 'MTR', file: 'image-monteria.webp' },
  { code: 'NVA', file: 'image-neiva.jpg' },
  { code: 'PSO', file: 'image-pasto.jpeg' },
  { code: 'PEI', file: 'image-pereira.webp' },
  { code: 'PPN', file: 'image-popayan.jpg' },
  { code: 'UIB', file: 'image-quibdo.avif' },
  { code: 'RCH', file: 'image-riohacha.webp' },
  { code: 'ADZ', file: 'image-sanandres.webp' },
  { code: 'SMR', file: 'image-santamarta.jpg' },
  { code: 'VUP', file: 'image-valledupar.jpg' },
  { code: 'VVC', file: 'image-villavicencio.webp' },
  { code: 'EYP', file: 'image-yopal.jpg' },
  { code: 'AEP', file: 'image-buenos-aires.webp' },
  { code: 'EZE', file: 'image-buenos-aires.webp' },
  { code: 'COR', file: 'image-cordoba.jpg' },
  { code: 'LPB', file: 'image-la-paz.jpg' },
  { code: 'VVI', file: 'image-santa-cruz.jpg' },
  { code: 'BEL', file: 'image-belem.jpg' },
  { code: 'BSB', file: 'image-brasilia.jpg' },
  { code: 'MAO', file: 'image-manaos.webp' },
  { code: 'GIG', file: 'image-rio-de-janeiro.jpeg' },
  { code: 'GRU', file: 'image-sao-paulo.png' },
  { code: 'SCL', file: 'image-santiago.jpg' },
  { code: 'CUE', file: 'image-cuenca.jpg' },
  { code: 'GYE', file: 'image-guayaquil.jpg' },
  { code: 'GPS', file: 'image-isla-baltra.webp' },
  { code: 'MEC', file: 'image-manta.jpg' },
  { code: 'UIO', file: 'image-quito.webp' },
  { code: 'SCY', file: 'image-san-cristobal.jpeg' },
  { code: 'GEO', file: 'image-georgetown.webp' },
  { code: 'ASU', file: 'image-asuncion.jpg' },
  { code: 'CUZ', file: 'image-cusco.webp' },
  { code: 'LIM', file: 'image-lima.jpg' },
  { code: 'MVD', file: 'image-montevideo.webp' },
  { code: 'CCS', file: 'image-caracas.webp' },
  { code: 'YUL', file: 'image-montreal.webp' },
  { code: 'YYZ', file: 'image-toronto.jpg' },
  { code: 'CUN', file: 'image-cancun.webp' },
  { code: 'MEX', file: 'image-ciudad-de-mexico.webp' },
  { code: 'MTY', file: 'image-monterrey.jpg' },
  { code: 'TQO', file: 'image-tulum.avif' },
  { code: 'BOS', file: 'image-boston.webp' },
  { code: 'ORD', file: 'image-chicago.jpg' },
  { code: 'DFW', file: 'image-dallas.jpg' },
  { code: 'FLL', file: 'image-fort-lauderdale.jpg' },
  { code: 'IAH', file: 'image-houston.jpg' },         // no extension in original data
  { code: 'LAS', file: 'image-las-vegas.jpg' },
  { code: 'LAX', file: 'image-los-angeles.jpg' },
  { code: 'MIA', file: 'image-miami.jpg' },
  { code: 'JFK', file: 'image-nueva-york.jpg' },
  { code: 'ONT', file: 'image-ontario.jpg' },
  { code: 'MCO', file: 'image-orlando.jpg' },
  { code: 'SFO', file: 'image-san-francisco.jpg' },
  { code: 'TPA', file: 'image-tampa.jpg' },
  { code: 'IAD', file: 'image-washington.webp' },
  { code: 'AUA', file: 'image-oranjestad.jpg' },
  { code: 'SJO', file: 'image-san-jose.webp' },
  { code: 'CUR', file: 'image-willemstad.jpg' },
  { code: 'SAL', file: 'image-san-salvador.jpg' },
  { code: 'FRS', file: 'image-flores.jpg' },
  { code: 'GUA', file: 'image-ciudad-de-guatemala.jpg' },
  { code: 'XPL', file: 'image-comayagua.jpg' },
  { code: 'SAP', file: 'image-san-pedro-sula.jpg' },
  { code: 'MGA', file: 'image-managua.jpg' },
  { code: 'PTY', file: 'image-ciudad-de-panama.jpg' },
  { code: 'SJU', file: 'image-san-juan.jpg' },
  { code: 'PUJ', file: 'image-punta-cana.webp' },
  { code: 'SDQ', file: 'image-santo-domingo.jpg' },
  { code: 'BCN', file: 'image-barcelona.avif' },
  { code: 'MAD', file: 'image-madrid.jpg' },
  { code: 'CDG', file: 'image-paris.webp' },
  { code: 'LHR', file: 'image-londres.jpg' },
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function getMimeType(filename) {
  const ext = filename.split('.').pop().toLowerCase();
  const map = {
    jpg:  'image/jpeg',
    jpeg: 'image/jpeg',
    png:  'image/png',
    webp: 'image/webp',
    avif: 'image/avif',
    gif:  'image/gif',
  };
  return map[ext] || 'image/jpeg';
}

async function waitForAssetProcessing(environment, assetId, retries = 15, delayMs = 3000) {
  for (let i = 0; i < retries; i++) {
    await new Promise(r => setTimeout(r, delayMs));
    const asset = await environment.getAsset(assetId);
    if (asset.fields?.file?.['en-US']?.url) return asset;
  }
  throw new Error(`Asset ${assetId} timed out during processing.`);
}

async function uploadLocalImage(environment, filePath, filename, code) {
  const assetId = `media-destination-${code.toLowerCase()}`;

  // Reuse if already uploaded
  try {
    const existing = await environment.getAsset(assetId);
    if (existing.fields?.file?.['en-US']?.url) {
      console.log(`    ↳ Asset already exists, reusing [${assetId}]`);
      return existing;
    }
  } catch (_) { /* not found, continue */ }

  const fileBuffer = fs.readFileSync(filePath);
  const mimeType = getMimeType(filename);

  // Step 1: create upload (raw binary)
  const upload = await environment.createUpload({ file: fileBuffer });

  // Step 2: create asset referencing the upload
  let asset = await environment.createAssetWithId(assetId, {
    fields: {
      title: { 'en-US': `Destination - ${code}` },
      file: {
        'en-US': {
          contentType: mimeType,
          fileName: filename,
          uploadFrom: {
            sys: { type: 'Link', linkType: 'Upload', id: upload.sys.id },
          },
        },
      },
    },
  });

  // Step 3: trigger processing
  asset = await asset.processForAllLocales();

  // Step 4: wait until Contentful finishes
  asset = await waitForAssetProcessing(environment, assetId);

  // Step 5: publish
  asset = await asset.publish();
  return asset;
}

async function findDestinationByCode(environment, code) {
  const results = await environment.getEntries({
    content_type: 'destination',
    'fields.code': code,
    limit: 1,
  });
  if (results.items.length === 0) throw new Error(`No destination found with code "${code}"`);
  return results.items[0];
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────

async function uploadImages() {
  console.log('Starting image upload to Contentful...');
  console.log(`Space: ${SPACE_ID} | Environment: ${ENVIRONMENT}`);
  console.log(`Images folder: ${IMAGES_DIR}\n`);

  if (!SPACE_ID || !MANAGEMENT_TOKEN) {
    console.error('Error: CONTENTFUL_SPACE_ID or CONTENTFUL_MANAGEMENT_TOKEN not set in .env');
    process.exit(1);
  }

  if (!fs.existsSync(IMAGES_DIR)) {
    console.error(`Error: images folder not found at "${IMAGES_DIR}"`);
    process.exit(1);
  }

  const client = createClient({ accessToken: MANAGEMENT_TOKEN });
  const space = await client.getSpace(SPACE_ID);
  const environment = await space.getEnvironment(ENVIRONMENT);
  console.log('✅ Connected to Contentful\n');

  let successCount = 0;
  let errorCount = 0;

  // Track files already uploaded (Buenos Aires shares one image for AEP and EZE)
  const assetCache = {};

  for (const { code, file } of destinationImages) {
    console.log(`\n📍 [${code}] ${file}`);

    const filePath = path.join(IMAGES_DIR, file);

    if (!fs.existsSync(filePath)) {
      console.error(`  ✗ File not found: ${filePath}`);
      errorCount++;
      continue;
    }

    try {
      // 1. Upload image (or reuse cached asset for shared images like Buenos Aires)
      let asset;
      if (assetCache[file]) {
        console.log(`  ↳ Reusing already-uploaded asset for shared image`);
        asset = assetCache[file];
      } else {
        console.log(`  ⬆️  Uploading image...`);
        asset = await uploadLocalImage(environment, filePath, file, code);
        assetCache[file] = asset;
        console.log(`  ✅ Asset uploaded: ${asset.sys.id}`);
      }

      // 2. Find the destination entry
      console.log(`  🔍 Finding destination entry...`);
      let entry = await findDestinationByCode(environment, code);
      console.log(`  ✅ Found: ${entry.sys.id}`);

      // 3. Unpublish to allow editing
      try { await entry.unpublish(); } catch (_) { /* already draft */ }
      entry = await environment.getEntry(entry.sys.id);

      // 4. Set the media field (Asset link)
      entry.fields.media = {
        'en-US': {
          sys: {
            type: 'Link',
            linkType: 'Asset',
            id: asset.sys.id,
          },
        },
      };

      // 5. Save and republish
      const updated = await entry.update();
      await updated.publish();

      console.log(`  ✅ Destination updated and published`);
      successCount++;

    } catch (err) {
      console.error(`  ✗ [${code}] ${err.message}`);
      errorCount++;
    }
  }

  console.log('\n' + '='.repeat(50));
  console.log('✅ Image upload complete!');
  console.log('='.repeat(50));
  console.log(`  • Destinations updated: ${successCount}`);
  console.log(`  • Errors:               ${errorCount}`);
}

uploadImages().catch(err => {
  console.error('Fatal error:', err.message);
  process.exit(1);
});