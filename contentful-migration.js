// contentful_migration.js
// Ejecutar: node contentful_migration.js
// Requiere: npm install contentful-management

const contentfulManagement = require('contentful-management');

const SPACE_ID = 'd4f15mm5mss6';
const MANAGEMENT_TOKEN = ''
const ENV = 'master'

async function run() {
  const client = contentfulManagement.createClient({ accessToken: MANAGEMENT_TOKEN });
  const space = await client.getSpace(SPACE_ID);
  const env = await space.getEnvironment(ENV);

  // ─── CREAR CONTENT TYPE: siteHeader ───────────────────────────────────────
  try {
    let headerCT = await env.createContentTypeWithId('siteHeader', {
      name: 'Site Header',
      displayField: 'logo',
      fields: [
        { id: 'logo',        name: 'Logo',          type: 'Symbol' },
        { id: 'topBarLinks', name: 'Top Bar Links',  type: 'Object' },
        { id: 'navLinks',    name: 'Nav Links',      type: 'Object' },
      ],
    });
    await headerCT.publish();
    console.log('✅ Content type siteHeader creado y publicado');
  } catch (e) {
    if (e.name === 'VersionMismatch' || e.message?.includes('already exists')) {
      console.log('ℹ️ siteHeader ya existe, saltando creación');
    } else throw e;
  }

  // ─── CREAR CONTENT TYPE: siteFooter ───────────────────────────────────────
  try {
    let footerCT = await env.createContentTypeWithId('siteFooter', {
      name: 'Site Footer',
      displayField: 'copyrightText',
      fields: [
        { id: 'copyrightText', name: 'Copyright Text', type: 'Symbol' },
        { id: 'poweredBy',     name: 'Powered By',     type: 'Symbol' },
        { id: 'columns',       name: 'Footer Columns', type: 'Object' },
        { id: 'socialLinks',   name: 'Social Links',   type: 'Object' },
      ],
    });
    await footerCT.publish();
    console.log('✅ Content type siteFooter creado y publicado');
  } catch (e) {
    if (e.name === 'VersionMismatch' || e.message?.includes('already exists')) {
      console.log('ℹ️ siteFooter ya existe, saltando creación');
    } else throw e;
  }

  // ─── SUBIR ENTRADA: siteHeader ────────────────────────────────────────────
  const headerEntry = await env.createEntry('siteHeader', {
    fields: {
      logo: { 'en-US': 'avianca' },
      topBarLinks: {
        'en-US': [
          { label: 'Avianca Chat', href: '#', icon: 'chat' },
          { label: 'Español',      href: '#', icon: 'globe' },
          { label: 'Colombia (COP)', href: '#', icon: 'user' },
        ]
      },
      navLinks: {
        'en-US': [
          { label: 'Reservar',             href: 'home.html' },
          { label: 'Ofertas y destinos',   href: 'ofertas.html' },
          { label: 'Tu reserva',           href: 'tu_reserva.html' },
          { label: 'Información y ayuda',  href: '#' },
          { label: 'Lifemiles',            href: '#' },
        ]
      },
    }
  });
  await headerEntry.publish();
  console.log('✅ Entrada siteHeader publicada, ID:', headerEntry.sys.id);

  // ─── SUBIR ENTRADA: siteFooter ────────────────────────────────────────────
  const footerEntry = await env.createEntry('siteFooter', {
    fields: {
      copyrightText: { 'en-US': 'Copyright © Avianca 2026' },
      poweredBy:     { 'en-US': 'Powered by Newshore' },
      columns: {
        'en-US': [
          {
            title: 'Descubre y compra',
            links: [
              { label: 'Vuelos baratos',       href: '#' },
              { label: 'Reservas de hoteles',  href: '#' },
              { label: 'Alquiler de autos',    href: '#' },
              { label: 'Tours y excursiones',  href: '#' },
              { label: 'Asistencia en viaje',  href: '#' },
              { label: 'avianca connect',      href: '#' },
            ]
          },
          {
            title: 'Sobre nosotros',
            links: [
              { label: 'Somos avianca',          href: '#' },
              { label: 'Trabaja con nosotros',   href: '#' },
              { label: 'Noticias corporativas',  href: '#' },
              { label: 'Alianzas y beneficios',  href: '#' },
              { label: 'Sostenibilidad',         href: '#' },
              { label: 'Plan de accesibilidad',  href: '#' },
            ]
          },
          {
            title: 'Nuestros portales',
            links: [
              { label: 'Programa Lifemiles',          href: '#' },
              { label: 'avianca empresas',            href: '#' },
              { label: 'aviancadirect',               href: '#' },
              { label: 'Soporte agencias',            href: '#' },
              { label: 'avianca cargo',               href: '#' },
              { label: 'Relación con inversionistas', href: '#' },
            ]
          },
          {
            title: 'Enlaces rápidos',
            links: [
              { label: 'Información legal',    href: '#' },
              { label: 'Política de privacidad', href: '#' },
              { label: 'Contrato de transporte', href: '#' },
              { label: 'Artículos restringidos', href: '#' },
              { label: 'Plan de contingencia',  href: '#' },
              { label: 'Contáctanos',           href: '#' },
              { label: 'Factura electrónica',   href: '#' },
              { label: 'Cambios y reembolsos',  href: '#' },
            ]
          },
        ]
      },
      socialLinks: {
        'en-US': [
          { platform: 'twitter',   href: '#' },
          { platform: 'facebook',  href: '#' },
          { platform: 'youtube',   href: '#' },
          { platform: 'instagram', href: '#' },
        ]
      },
    }
  });
  await footerEntry.publish();
  console.log('✅ Entrada siteFooter publicada, ID:', footerEntry.sys.id);

  console.log('\n✅ Migración completa');
}

run().catch(console.error);