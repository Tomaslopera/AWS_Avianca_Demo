#!/usr/bin/env node

require('dotenv').config();
const { createClient } = require('contentful-management');
const fs   = require('fs');
const path = require('path');

const SPACE_ID         = process.env.CONTENTFUL_SPACE_ID;
const MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN;
const ENVIRONMENT      = process.env.CONTENTFUL_ENVIRONMENT || 'master';

const IMAGES_DIR = path.join(__dirname, 'images', 'backgrounds');

// ─── IMAGE DEFINITIONS ────────────────────────────────────────────────────────

function getMimeType(filename) {
  const ext = filename.split('.').pop().toLowerCase();
  const map = { jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png', webp: 'image/webp', avif: 'image/avif', gif: 'image/gif' };
  return map[ext] || 'image/jpeg';
}

async function uploadLocalImage(environment, file, assetId, title) {
  // Reuse if already exists
  try {
    const existing = await environment.getAsset(assetId);
    if (existing.fields?.file?.['en-US']?.url) {
      console.log(`    ↳ Asset already exists: ${assetId}`);
      return existing;
    }
  } catch (_) {}

  const filePath   = path.join(IMAGES_DIR, file);
  if (!fs.existsSync(filePath)) throw new Error(`File not found: ${filePath}`);

  const fileBuffer = fs.readFileSync(filePath);
  const mimeType   = getMimeType(file);

  const upload = await environment.createUpload({ file: fileBuffer });

  let asset = await environment.createAssetWithId(assetId, {
    fields: {
      title: { 'en-US': title },
      file: {
        'en-US': {
          contentType: mimeType,
          fileName:    file,
          uploadFrom:  { sys: { type: 'Link', linkType: 'Upload', id: upload.sys.id } },
        },
      },
    },
  });

  asset = await asset.processForAllLocales();

  // Wait for processing
  for (let i = 0; i < 15; i++) {
    await new Promise(r => setTimeout(r, 3000));
    asset = await environment.getAsset(assetId);
    if (asset.fields?.file?.['en-US']?.url) break;
  }

  asset = await asset.publish();
  console.log(`    ✅ Asset uploaded: ${assetId}`);
  return asset;
}

function assetLink(assetId) {
  return { 'en-US': { sys: { type: 'Link', linkType: 'Asset', id: assetId } } };
}

async function createAndPublishEntry(environment, contentType, entryId, fields) {
  try {
    const existing = await environment.getEntry(entryId);
    console.log(`  ⚠️  Entry already exists: ${entryId}`);
    return existing;
  } catch (_) {}

  const entry = await environment.createEntryWithId(contentType, entryId, { fields });
  await entry.publish();
  console.log(`  ✅ Entry created: ${entryId}`);
  return entry;
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────

async function uploadStaticContent() {
  console.log('Starting static content upload...\n');

  if (!SPACE_ID || !MANAGEMENT_TOKEN) {
    console.error('Error: missing CONTENTFUL_SPACE_ID or CONTENTFUL_MANAGEMENT_TOKEN in .env');
    process.exit(1);
  }

  const client      = createClient({ accessToken: MANAGEMENT_TOKEN });
  const space       = await client.getSpace(SPACE_ID);
  const environment = await space.getEnvironment(ENVIRONMENT);
  console.log('✅ Connected to Contentful\n');

  // ── 1. UPLOAD ALL IMAGES ──────────────────────────────────────────────────
  console.log('📸 Uploading images...');

  const images = [
    { file: 'image-destinos.jpg',           id: 'asset-hero-home',        title: 'Hero - Home' },
    { file: 'image-ofertas-destinos.jpg',   id: 'asset-hero-ofertas',     title: 'Hero - Ofertas' },
    { file: 'promotional-banner.jpeg',      id: 'asset-promo-large',      title: 'Promo Banner Large' },
    { file: 'lifemiles-news-1.jpg',         id: 'asset-lifemiles-1',      title: 'Lifemiles News 1' },
    { file: 'lifemiles-news-2.jpg',         id: 'asset-lifemiles-2',      title: 'Lifemiles News 2' },
    { file: 'lifemiles-news-3.avif',        id: 'asset-lifemiles-3',      title: 'Lifemiles News 3' },
    { file: 'experience-1.jpeg',            id: 'asset-interest-1',       title: 'Interest Card 1' },
    { file: 'experience-2.avif',            id: 'asset-interest-2',       title: 'Interest Card 2' },
    { file: 'experience-3.webp',            id: 'asset-interest-3',       title: 'Interest Card 3' },
    { file: 'experience-4.jpg',             id: 'asset-interest-4',       title: 'Interest Card 4' },
    // Prepare cards — placeholders, replace later
    { file: 'experience-1.jpeg',            id: 'asset-prepare-1',        title: 'Prepare Card 1 (placeholder)' },
    { file: 'experience-2.avif',            id: 'asset-prepare-2',        title: 'Prepare Card 2 (placeholder)' },
    { file: 'experience-3.webp',            id: 'asset-prepare-3',        title: 'Prepare Card 3 (placeholder)' },
    // Experience cards — placeholders, replace later
    { file: 'experience-1.jpeg',            id: 'asset-experience-1',     title: 'Experience Card 1 (placeholder)' },
    { file: 'experience-2.avif',            id: 'asset-experience-2',     title: 'Experience Card 2 (placeholder)' },
    { file: 'experience-3.webp',            id: 'asset-experience-3',     title: 'Experience Card 3 (placeholder)' },
    { file: 'experience-4.jpg',             id: 'asset-experience-4',     title: 'Experience Card 4 (placeholder)' },
  ];

  for (const img of images) {
    try {
      await uploadLocalImage(environment, img.file, img.id, img.title);
    } catch (err) {
      console.error(`  ✗ Failed to upload ${img.file}: ${err.message}`);
    }
  }

  // ── 2. HERO CONFIG ────────────────────────────────────────────────────────
  console.log('\n🦸 Creating heroConfig entries...');

  await createAndPublishEntry(environment, 'heroConfig', 'hero-config-home', {
    page:             { 'en-US': 'home' },
    backgroundImage:  assetLink('asset-hero-home'),
  });

  await createAndPublishEntry(environment, 'heroConfig', 'hero-config-ofertas', {
    page:             { 'en-US': 'ofertas' },
    backgroundImage:  assetLink('asset-hero-ofertas'),
  });

  // ── 3. PROMO BANNERS ──────────────────────────────────────────────────────
  console.log('\n🎯 Creating promoBanner entries...');

  await createAndPublishEntry(environment, 'promoBanner', 'promo-banner-large', {
    title:           { 'en-US': 'El mundo se explora' },
    subtitle:        { 'en-US': 'viajando!' },
    badge:           { 'en-US': 'lm Acumula millas' },
    variant:         { 'en-US': 'large' },
    backgroundImage: assetLink('asset-promo-large'),
  });

  await createAndPublishEntry(environment, 'promoBanner', 'promo-banner-red', {
    title:       { 'en-US': '¿Ya sabes cuál será tu próxima escapada?' },
    description: { 'en-US': 'Planea tu viaje y descubre todo lo que el mundo tiene para mostrarte. Compra hoy y vuela hasta junio de 2026.' },
    buttonText:  { 'en-US': 'Compra ya' },
    variant:     { 'en-US': 'red' },
  });

  // ── 4. LIFEMILES CARDS ────────────────────────────────────────────────────
  console.log('\n✈️  Creating lifemilesCard entries...');

  const lifemilesCards = [
    { id: 'lifemiles-card-1', title: '¡Dona tus millas!',       description: 'Transformemos vidas y ecosistemas una milla a la vez', buttonText: 'Dona ya',          assetId: 'asset-lifemiles-1', order: 1 },
    { id: 'lifemiles-card-2', title: 'Únete a Lifemiles plus',  description: 'Recibe descuento exclusivo al redimir tiquetes',         buttonText: 'Suscríbete ya',    assetId: 'asset-lifemiles-2', order: 2 },
    { id: 'lifemiles-card-3', title: 'Recibe hasta 10.000 millas', description: 'Con tu tarjeta de crédito',                           buttonText: '¡Solicítala ya!',  assetId: 'asset-lifemiles-3', order: 3 },
  ];

  for (const card of lifemilesCards) {
    await createAndPublishEntry(environment, 'lifemilesCard', card.id, {
      title:           { 'en-US': card.title },
      description:     { 'en-US': card.description },
      buttonText:      { 'en-US': card.buttonText },
      backgroundImage: assetLink(card.assetId),
      order:           { 'en-US': card.order },
    });
  }

  // ── 5. INTEREST CARDS ─────────────────────────────────────────────────────
  console.log('\n🌍 Creating interestCard entries...');

  const interestCards = [
    { id: 'interest-card-1', title: 'Experiencia avianca', description: 'Conoce nuestras novedades.',          assetId: 'asset-interest-1', order: 1 },
    { id: 'interest-card-2', title: 'Equipaje',            description: 'Condiciones y recomendaciones.',      assetId: 'asset-interest-2', order: 2 },
    { id: 'interest-card-3', title: 'Star Alliance',       description: 'Una experiencia conectada.',          assetId: 'asset-interest-3', order: 3 },
    { id: 'interest-card-4', title: 'Compensa tu huella',  description: 'Reduce tu impacto ambiental.',        assetId: 'asset-interest-4', order: 4 },
  ];

  for (const card of interestCards) {
    await createAndPublishEntry(environment, 'interestCard', card.id, {
      title:           { 'en-US': card.title },
      description:     { 'en-US': card.description },
      backgroundImage: assetLink(card.assetId),
      order:           { 'en-US': card.order },
    });
  }

  // ── 6. PREPARE CARDS ──────────────────────────────────────────────────────
  console.log('\n🎒 Creating prepareCard entries...');

  const prepareCards = [
    { id: 'prepare-card-1', title: 'Check-in online',       description: 'Obtén tu pase de abordar y ahorra tiempo en el aeropuerto.', assetId: 'asset-prepare-1', order: 1 },
    { id: 'prepare-card-2', title: 'Centro de ayuda',       description: 'Busca y encuentra información útil para resolver tus preguntas.', assetId: 'asset-prepare-2', order: 2 },
    { id: 'prepare-card-3', title: 'Requisitos para viajar', description: 'Infórmate acerca de visas, vacunas y documentos.',           assetId: 'asset-prepare-3', order: 3 },
  ];

  for (const card of prepareCards) {
    await createAndPublishEntry(environment, 'prepareCard', card.id, {
      title:           { 'en-US': card.title },
      description:     { 'en-US': card.description },
      backgroundImage: assetLink(card.assetId),
      order:           { 'en-US': card.order },
    });
  }

  // ── 7. EXPERIENCE CARDS ───────────────────────────────────────────────────
  console.log('\n🏨 Creating experienceCard entries...');

  const experienceCards = [
    { id: 'experience-card-1', title: 'Hoteles',            description: 'Encuentra el alojamiento perfecto',  assetId: 'asset-experience-1', order: 1 },
    { id: 'experience-card-2', title: 'Alquiler de autos',  description: 'Movilidad para tu viaje',            assetId: 'asset-experience-2', order: 2 },
    { id: 'experience-card-3', title: 'Tours y excursiones', description: 'Vive experiencias únicas',          assetId: 'asset-experience-3', order: 3 },
    { id: 'experience-card-4', title: 'Asistencia en viaje', description: 'Estamos contigo siempre',           assetId: 'asset-experience-4', order: 4 },
  ];

  for (const card of experienceCards) {
    await createAndPublishEntry(environment, 'experienceCard', card.id, {
      title:           { 'en-US': card.title },
      description:     { 'en-US': card.description },
      backgroundImage: assetLink(card.assetId),
      order:           { 'en-US': card.order },
    });
  }

  console.log('\n' + '='.repeat(50));
  console.log('✅ Static content upload complete!');
  console.log('='.repeat(50));
  console.log('  • heroConfig:     2 entries');
  console.log('  • promoBanner:    2 entries');
  console.log('  • lifemilesCard:  3 entries');
  console.log('  • interestCard:   4 entries');
  console.log('  • prepareCard:    3 entries');
  console.log('  • experienceCard: 4 entries');
  console.log('\n  ⚠️  prepareCard and experienceCard use placeholder images.');
  console.log('     Replace asset-prepare-* and asset-experience-* in Contentful when ready.');
}

uploadStaticContent().catch(err => {
  console.error('Fatal error:', err.message);
  process.exit(1);
});