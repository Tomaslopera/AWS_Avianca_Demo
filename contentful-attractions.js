require('dotenv').config();
const { createClient } = require('contentful-management');

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN;
const ENVIRONMENT = process.env.CONTENTFUL_ENVIRONMENT || 'master';

const destinationAttractions = [
  {
    code: 'AUC',
    attractions: [
      { name: 'Caño Limón', description: 'Importante afluente del río Arauca con ecosistemas de sabana llanera.', tag: 'Naturaleza' },
      { name: 'Río Arauca', description: 'Río fronterizo ideal para paseos en lancha y pesca deportiva.', tag: 'Naturaleza' },
      { name: 'Catedral San Vicente de Paul', description: 'Imponente catedral en el centro histórico de la ciudad.', tag: 'Cultura' },
      { name: 'Reserva Natural El Tuparro', description: 'Reserva de biosfera con fauna y flora de los Llanos Orientales.', tag: 'Naturaleza' },
      { name: 'Parque Los Libertadores', description: 'Principal parque urbano, escenario de eventos culturales y ferias.', tag: 'Cultura' },
      { name: 'Mural de la Cultura Llanera', description: 'Arte urbano que celebra las tradiciones del llano colombo-venezolano.', tag: 'Arte' },
    ],
  },
  {
    code: 'AXM',
    attractions: [
      { name: 'Valle del Cocora', description: 'Hogar de la palma de cera más alta del mundo, símbolo nacional de Colombia.', tag: 'Naturaleza' },
      { name: 'Parque del Café', description: 'Parque temático dedicado a la cultura cafetera colombiana con atracciones para toda la familia.', tag: 'Diversión' },
      { name: 'Jardín Botánico de Quindío', description: 'Reserva natural con mariposas, orquídeas y palmas de cera nativas.', tag: 'Naturaleza' },
      { name: 'Catedral de la Inmaculada Concepción', description: 'Catedral neogótica ubicada en el corazón de Armenia.', tag: 'Cultura' },
      { name: 'Parque Centenario', description: 'Parque principal de Armenia rodeado de arquitectura colonial y cultura local.', tag: 'Historia' },
      { name: 'Recuca', description: 'Hacienda cafetera donde se puede vivir la experiencia completa de la cosecha del café.', tag: 'Experiencia' },
    ],
  },
  {
    code: 'EJA',
    attractions: [
      { name: 'Ciénaga de San Silvestre', description: 'Humedal de importancia ecológica con aves migratorias y ecosistemas únicos.', tag: 'Naturaleza' },
      { name: 'Museo del Petróleo', description: 'Museo que narra la historia de la explotación petrolera en Colombia.', tag: 'Historia' },
      { name: 'Puerto Wilches', description: 'Puerto fluvial sobre el Magdalena ideal para recorridos en canoa y avistamiento de fauna.', tag: 'Naturaleza' },
      { name: 'Parque Natural La Cascajera', description: 'Área verde urbana con senderos y espacios de recreación.', tag: 'Naturaleza' },
      { name: 'Templo del Sol y la Luna', description: 'Iglesia de arquitectura moderna y singular, atractivo arquitectónico de la ciudad.', tag: 'Cultura' },
      { name: 'Malecón del Río Magdalena', description: 'Paseo fluvial con vistas al Magdalena, gastronomía y actividades recreativas.', tag: 'Experiencia' },
    ],
  },
  {
    code: 'BAQ',
    attractions: [
      { name: 'Carnaval de Barranquilla', description: 'Patrimonio cultural inmaterial de la humanidad, la fiesta más importante de Colombia.', tag: 'Cultura' },
      { name: 'Museo del Caribe', description: 'Recorrido interactivo por la historia, biodiversidad y cultura del Caribe colombiano.', tag: 'Historia' },
      { name: 'Parque Cultural del Caribe', description: 'Complejo cultural con teatros, museos y espacios de arte en el corazón de la ciudad.', tag: 'Arte' },
      { name: 'Malecón del Río', description: 'Renovado paseo a orillas del Magdalena con ciclovías, restaurantes y miradores.', tag: 'Experiencia' },
      { name: 'Puerto Colombia', description: 'Antiguo muelle histórico a las afueras de Barranquilla, ideal para fotografía y gastronomía.', tag: 'Historia' },
      { name: 'Estadio Metropolitano Roberto Meléndez', description: 'Uno de los estadios de fútbol más grandes de Colombia, sede de eventos deportivos nacionales.', tag: 'Diversión' },
    ],
  },
  {
    code: 'BOG',
    attractions: [
      { name: 'La Candelaria', description: 'Barrio histórico con museos, calles coloniales y el corazón cultural de la capital.', tag: 'Historia' },
      { name: 'Museo del Oro', description: 'Uno de los museos más importantes del mundo con la mayor colección de orfebrería precolombina.', tag: 'Cultura' },
      { name: 'Monserrate', description: 'Cerro emblemático con santuario religioso y vistas panorámicas de toda Bogotá.', tag: 'Naturaleza' },
      { name: 'Zona Rosa', description: 'Centro de vida nocturna, gastronomía y moda en el norte de Bogotá.', tag: 'Experiencia' },
      { name: 'Parque Simón Bolívar', description: 'El parque urbano más grande de la ciudad, escenario de conciertos y eventos masivos.', tag: 'Naturaleza' },
      { name: 'Catedral de Sal de Zipaquirá', description: 'Catedral construida en el interior de una mina de sal, a solo 50 km de Bogotá.', tag: 'Historia' },
    ],
  },
  {
    code: 'BGA',
    attractions: [
      { name: 'Parque Nacional del Chicamocha', description: 'Parque con teleférico, vistas al cañón del Chicamocha y actividades extremas.', tag: 'Naturaleza' },
      { name: 'Parque García Rovira', description: 'Plaza histórica que fue escenario de la independencia santandereana.', tag: 'Historia' },
      { name: 'Catedral de la Sagrada Familia', description: 'Catedral de arquitectura neoclásica ubicada en el centro de la ciudad.', tag: 'Cultura' },
      { name: 'Floridablanca', description: 'Municipio vecino conocido por sus jardines, cultivos de flores y parques.', tag: 'Naturaleza' },
      { name: 'Mesa de Ruitoque', description: 'Meseta con vistas espectaculares al nororiente colombiano, ideal para parapente.', tag: 'Experiencia' },
      { name: 'Parque Agua Linda', description: 'Parque acuático y de recreación para toda la familia en las afueras de Bucaramanga.', tag: 'Diversión' },
    ],
  },
  {
    code: 'CLO',
    attractions: [
      { name: 'Cristo Rey', description: 'Monumento icónico sobre un cerro con vistas panorámicas de toda la ciudad.', tag: 'Historia' },
      { name: 'Zoológico de Cali', description: 'Uno de los zoológicos más modernos de Latinoamérica con más de 1.200 animales.', tag: 'Naturaleza' },
      { name: 'Barrio San Antonio', description: 'Barrio colonial con casas coloridas, galerías de arte y ambiente bohemio.', tag: 'Arte' },
      { name: 'Museo La Tertulia', description: 'Museo de arte contemporáneo con colecciones nacionales e internacionales.', tag: 'Arte' },
      { name: 'Parque del Perro', description: 'Centro de vida nocturna y gastronómica, símbolo del entretenimiento caleño.', tag: 'Experiencia' },
      { name: 'Salsoteca La Matraca', description: 'Espacio cultural donde vivir la auténtica salsa caleña, declarada patrimonio inmaterial.', tag: 'Cultura' },
    ],
  },
  {
    code: 'CTG',
    attractions: [
      { name: 'Ciudad Amurallada', description: 'Centro histórico declarado Patrimonio de la Humanidad por la UNESCO.', tag: 'Historia' },
      { name: 'Castillo San Felipe de Barajas', description: 'Fortaleza militar del siglo XVII, la más grande construida por los españoles en América.', tag: 'Historia' },
      { name: 'Islas del Rosario', description: 'Archipiélago de islas coralinas con aguas turquesas ideal para buceo y snorkel.', tag: 'Naturaleza' },
      { name: 'Barrio Getsemaní', description: 'Barrio histórico con murales, vida nocturna y la auténtica cultura cartagenera.', tag: 'Arte' },
      { name: 'Playa Blanca', description: 'Una de las playas más hermosas del Caribe colombiano con arenas blancas y aguas cristalinas.', tag: 'Naturaleza' },
      { name: 'Torre del Reloj', description: 'Emblemática puerta de entrada a la ciudad amurallada, símbolo de Cartagena.', tag: 'Cultura' },
    ],
  },
  {
    code: 'CUC',
    attractions: [
      { name: 'Villa del Rosario', description: 'Municipio histórico donde se firmó la Constitución de la Gran Colombia en 1821.', tag: 'Historia' },
      { name: 'Parque Santander', description: 'Plaza central de Cúcuta rodeada de arquitectura republicana y vida urbana.', tag: 'Cultura' },
      { name: 'Puente Internacional Simón Bolívar', description: 'Puente fronterizo sobre el río Táchira que une Colombia con Venezuela.', tag: 'Historia' },
      { name: 'Catedral San José de Cúcuta', description: 'Catedral metropolitana con estilo neoclásico en el centro de la ciudad.', tag: 'Cultura' },
      { name: 'Parque Nacional Natural Catatumbo-Barí', description: 'Reserva natural con el Relámpago del Catatumbo, fenómeno eléctrico único en el mundo.', tag: 'Naturaleza' },
      { name: 'Parque La Leyenda', description: 'Espacio cultural que celebra la historia y las tradiciones del norte de Santander.', tag: 'Arte' },
    ],
  },
  {
    code: 'IBE',
    attractions: [
      { name: 'Cañón del Combeima', description: 'Impresionante cañón natural con cascadas y paisajes del Parque Nacional Los Nevados.', tag: 'Naturaleza' },
      { name: 'Parque Nacional Natural Los Nevados', description: 'Parque de alta montaña con volcanes nevados y páramos únicos.', tag: 'Naturaleza' },
      { name: 'Conservatorio del Tolima', description: 'Institución musical de referencia nacional, Ibagué es conocida como la ciudad musical de Colombia.', tag: 'Cultura' },
      { name: 'Jardín Botánico San Jorge', description: 'Reserva natural urbana con flora endémica del Tolima y senderos ecológicos.', tag: 'Naturaleza' },
      { name: 'Mirador El Silencio', description: 'Punto panorámico con vistas al nevado del Tolima y el valle del Combeima.', tag: 'Experiencia' },
      { name: 'Festival Folclórico del Tolima', description: 'Festival anual que celebra las danzas y tradiciones folclóricas de Colombia.', tag: 'Cultura' },
    ],
  },
  {
    code: 'IPI',
    attractions: [
      { name: 'Santuario de Nuestra Señora de Las Lajas', description: 'Espectacular basílica neogótica construida sobre un cañón del río Guáitara.', tag: 'Historia' },
      { name: 'Volcán Azufral', description: 'Volcán activo con laguna de color verde esmeralda en su cráter.', tag: 'Naturaleza' },
      { name: 'Laguna La Cocha', description: 'La segunda laguna natural más grande de Colombia, rodeada de bosques andinos.', tag: 'Naturaleza' },
      { name: 'Reserva Natural La Planada', description: 'Reserva de bosque nublado con alta biodiversidad endémica del suroccidente.', tag: 'Naturaleza' },
      { name: 'Centro Histórico de Ipiales', description: 'Casco urbano con iglesias coloniales y mercados fronterizos.', tag: 'Cultura' },
      { name: 'Puente Internacional de Rumichaca', description: 'Frontera oficial entre Colombia y Ecuador sobre el río Carchi.', tag: 'Historia' },
    ],
  },
  {
    code: 'LET',
    attractions: [
      { name: 'Parque Nacional Natural Amacayacu', description: 'Reserva amazónica con una de las mayores biodiversidades del planeta.', tag: 'Naturaleza' },
      { name: 'Isla de los Micos', description: 'Isla amazónica hogar de monos aulladores, delfines rosados y tucanes.', tag: 'Naturaleza' },
      { name: 'Comunidades Indígenas Ticuna', description: 'Visita cultural a las comunidades originarias del Amazonas colombiano.', tag: 'Cultura' },
      { name: 'Lago de Tarapoto', description: 'Lago amazónico con delfines rosados y tortugas charapa en su entorno natural.', tag: 'Naturaleza' },
      { name: 'Puerto Nariño', description: 'Municipio sin vehículos de motor, rodeado de selva amazónica y sostenibilidad ecológica.', tag: 'Experiencia' },
      { name: 'Mercado de Leticia', description: 'Mercado fronterizo donde confluyen culturas colombiana, peruana y brasileña.', tag: 'Cultura' },
    ],
  },
  {
    code: 'MDE',
    attractions: [
      { name: 'Plaza Botero', description: 'Plaza urbana con 23 esculturas monumentales del artista Fernando Botero.', tag: 'Arte' },
      { name: 'Parque Arví', description: 'Reserva natural metropolitana accesible en teleférico con senderismo y mercado campesino.', tag: 'Naturaleza' },
      { name: 'El Poblado', description: 'Barrio moderno con gastronomía de alto nivel, vida nocturna y hoteles boutique.', tag: 'Experiencia' },
      { name: 'Metro de Medellín', description: 'Sistema de transporte multimodal que incluye metro, tranvía y cables aéreos.', tag: 'Cultura' },
      { name: 'Museo de Antioquia', description: 'Museo con la mayor colección de obras de Fernando Botero y arte colombiano.', tag: 'Arte' },
      { name: 'Cerro Nutibara', description: 'Parque urbano con réplica de un pueblo antioqueño y vistas panorámicas de la ciudad.', tag: 'Historia' },
    ],
  },
  {
    code: 'MTR',
    attractions: [
      { name: 'Parque Lineal Ronda del Sinú', description: 'Paseo lineal sobre el río Sinú con bulevares, gastronomía y espacios culturales.', tag: 'Experiencia' },
      { name: 'Zoológico Las Tinajas', description: 'Zoológico regional con especies de la sabana tropical y el ecosistema del Sinú.', tag: 'Naturaleza' },
      { name: 'Catedral San Jerónimo de Montería', description: 'Catedral neoclásica en la plaza principal de la capital del Córdoba.', tag: 'Cultura' },
      { name: 'Festival del Porro', description: 'Festival musical dedicado al porro, ritmo tradicional de la región Caribe.', tag: 'Cultura' },
      { name: 'Río Sinú', description: 'Río de gran importancia histórica y ecológica que atraviesa la ciudad.', tag: 'Naturaleza' },
      { name: 'Ciénaga de Betancí', description: 'Humedal protegido con aves acuáticas y ecosistemas de la sabana cordobesa.', tag: 'Naturaleza' },
    ],
  },
  {
    code: 'NVA',
    attractions: [
      { name: 'Desierto de la Tatacoa', description: 'El segundo desierto de Colombia con formaciones rocosas únicas y cielos estrellados.', tag: 'Naturaleza' },
      { name: 'Parque Arqueológico de San Agustín', description: 'Patrimonio de la Humanidad con esculturas precolombinas de culturas antiguas.', tag: 'Historia' },
      { name: 'Festival Folclórico del Bambuco', description: 'Festival cultural declarado Patrimonio Nacional que celebra el bambuco, baile nacional.', tag: 'Cultura' },
      { name: 'Malecón del Río Magdalena', description: 'Paseo a orillas del Magdalena con miradores, restaurantes y actividades recreativas.', tag: 'Experiencia' },
      { name: 'Catedral de Neiva', description: 'Catedral de arquitectura moderna en el centro histórico de la ciudad.', tag: 'Cultura' },
      { name: 'Lago de la Represa de Betania', description: 'Embalse artificial con deportes náuticos y paisajes del Huila.', tag: 'Naturaleza' },
    ],
  },
  {
    code: 'PSO',
    attractions: [
      { name: 'Carnaval de Blancos y Negros', description: 'Patrimonio Inmaterial de la Humanidad, celebración de la identidad andina y afro.', tag: 'Cultura' },
      { name: 'Laguna de La Cocha', description: 'Laguna natural de los Andes del sur con biodiversidad única y paisajes andinos.', tag: 'Naturaleza' },
      { name: 'Volcán Galeras', description: 'Volcán activo y símbolo de Pasto, con mirador y senderos de alta montaña.', tag: 'Naturaleza' },
      { name: 'Catedral de Pasto', description: 'Catedral metropolitana de estilo neoclásico en el centro histórico de la ciudad.', tag: 'Cultura' },
      { name: 'Museo Taminango', description: 'Museo con tradiciones artesanales de barniz de Pasto, técnica única en el mundo.', tag: 'Arte' },
      { name: 'Santuario de Las Lajas', description: 'Basílica gótica construida sobre un cañón, a pocos kilómetros de Pasto en Ipiales.', tag: 'Historia' },
    ],
  },
  {
    code: 'PEI',
    attractions: [
      { name: 'Viaducto César Gaviria Trujillo', description: 'Puente atirantado emblemático que conecta Pereira con Dosquebradas.', tag: 'Cultura' },
      { name: 'Termales de Santa Rosa de Cabal', description: 'Aguas termales naturales en un entorno de selva andina.', tag: 'Experiencia' },
      { name: 'Zoológico Matecaña', description: 'Zoológico con más de 200 especies animales nativas de Colombia.', tag: 'Naturaleza' },
      { name: 'Parque Ukumarí', description: 'Bioparque con osos de anteojos, tapires y fauna andina colombiana.', tag: 'Naturaleza' },
      { name: 'Santuario de Flora y Fauna Otún Quimbaya', description: 'Reserva natural del Eje Cafetero con flora y fauna endémica.', tag: 'Naturaleza' },
      { name: 'Plaza de Bolívar', description: 'Centro histórico de Pereira con la escultura del Bolívar Desnudo, obra de Rodrigo Arenas.', tag: 'Arte' },
    ],
  },
  {
    code: 'PPN',
    attractions: [
      { name: 'Semana Santa de Popayán', description: 'Procesiones declaradas Patrimonio de la Humanidad, de las más antiguas de América.', tag: 'Cultura' },
      { name: 'Centro Histórico Ciudad Blanca', description: 'Conjunto arquitectónico colonial de casas encaladas que le dan a Popayán su apodo.', tag: 'Historia' },
      { name: 'Catedral de Nuestra Señora de la Asunción', description: 'Catedral neoclásica que domina la Plaza Mayor de Popayán.', tag: 'Cultura' },
      { name: 'Puente del Humilladero', description: 'Puente colonial del siglo XIX, símbolo histórico de Popayán.', tag: 'Historia' },
      { name: 'Museo Guillermo León Valencia', description: 'Museo en la casa natal del expresidente colombiano con colecciones de arte colonial.', tag: 'Arte' },
      { name: 'Parque Nacional Natural Puracé', description: 'Parque con el volcán Puracé, termales y páramos del suroccidente colombiano.', tag: 'Naturaleza' },
    ],
  },
  {
    code: 'UIB',
    attractions: [
      { name: 'Fiestas de San Pacho', description: 'Festival afro-chocoano declarado Patrimonio de la Humanidad, con desfiles y danzas únicas.', tag: 'Cultura' },
      { name: 'Parque Nacional Natural Los Katíos', description: 'Reserva de la biosfera con selva húmeda y biodiversidad incomparable del Chocó.', tag: 'Naturaleza' },
      { name: 'Río Atrato', description: 'Uno de los ríos con mayor caudal del mundo, arteria vital del Chocó biogeográfico.', tag: 'Naturaleza' },
      { name: 'Playas de Nuquí', description: 'Playas vírgenes del Pacífico colombiano con avistamiento de ballenas jorobadas.', tag: 'Naturaleza' },
      { name: 'Catedral de San Francisco de Asís', description: 'Catedral histórica en el centro de Quibdó con influencia arquitectónica misionera.', tag: 'Historia' },
      { name: 'Mercado Fluvial de Quibdó', description: 'Mercado a orillas del Atrato donde se comercian productos del Pacífico y la selva.', tag: 'Experiencia' },
    ],
  },
  {
    code: 'RCH',
    attractions: [
      { name: 'Punta Gallinas', description: 'El extremo norte de Sudamérica con dunas que caen al mar Caribe.', tag: 'Naturaleza' },
      { name: 'Cabo de la Vela', description: 'Destino desértico y mágico de La Guajira con playas de turquesa y viento.', tag: 'Naturaleza' },
      { name: 'Santuario de Fauna y Flora Los Flamencos', description: 'Reserva natural hogar de flamencos rosados y ecosistemas de manglar.', tag: 'Naturaleza' },
      { name: 'Sierra Nevada de Santa Marta', description: 'El pico costero más alto del mundo con culturas indígenas Koguis y Arhuacos.', tag: 'Naturaleza' },
      { name: 'Muelle Turístico de Riohacha', description: 'Embarcadero histórico con vistas al mar Caribe y zona gastronómica.', tag: 'Experiencia' },
      { name: 'Desierto de La Guajira', description: 'Paisaje desértico único en Sudamérica habitado por la comunidad Wayuu.', tag: 'Cultura' },
    ],
  },
  {
    code: 'ADZ',
    attractions: [
      { name: 'Johnny Cay', description: 'Islote de arena blanca con palmeras y arrecifes coralinos para snorkel.', tag: 'Naturaleza' },
      { name: 'El Acuario', description: 'Banco de arena en pleno mar con aguas cristalinas y peces de colores.', tag: 'Naturaleza' },
      { name: 'Hoyo Soplador', description: 'Géiser natural donde el mar lanza chorros de agua a través de un agujero en las rocas.', tag: 'Naturaleza' },
      { name: 'La Piscinita', description: 'Piscina natural entre las rocas con peces exóticos y aguas turquesas.', tag: 'Experiencia' },
      { name: "Morgan's Cave", description: 'Cueva submarina relacionada con el legendario pirata Henry Morgan.', tag: 'Historia' },
      { name: 'Old Providence', description: 'Isla hermana de San Andrés con barreras de coral y cultura raizal auténtica.', tag: 'Naturaleza' },
    ],
  },
  {
    code: 'SMR',
    attractions: [
      { name: 'Parque Nacional Natural Tayrona', description: 'Parque donde la Sierra Nevada se une al mar Caribe con playas y selva tropical.', tag: 'Naturaleza' },
      { name: 'Ciudad Perdida', description: 'Antigua ciudad indígena Tayrona en la selva de la Sierra Nevada, anterior a Machu Picchu.', tag: 'Historia' },
      { name: 'El Rodadero', description: 'Balneario urbano con playas, acuario y deportes acuáticos.', tag: 'Diversión' },
      { name: 'Quinta de San Pedro Alejandrino', description: 'Hacienda donde murió Simón Bolívar, hoy museo y monumento nacional.', tag: 'Historia' },
      { name: 'Playa Bello Horizonte', description: 'Playa tranquila con aguas claras, ideal para relajarse en el Caribe.', tag: 'Naturaleza' },
      { name: 'Centro Histórico de Santa Marta', description: 'La ciudad más antigua de Sudamérica con arquitectura colonial y plaza mayor.', tag: 'Historia' },
    ],
  },
  {
    code: 'VUP',
    attractions: [
      { name: 'Festival de la Leyenda Vallenata', description: 'Festival de música vallenata declarado Patrimonio Inmaterial de la Humanidad.', tag: 'Cultura' },
      { name: 'Parque de la Leyenda Vallenata', description: 'Parque temático dedicado al vallenato con museos, esculturas y presentaciones.', tag: 'Arte' },
      { name: 'Balneario Hurtado', description: 'Río de aguas frías rodeado de vegetación, espacio recreativo para locales y turistas.', tag: 'Naturaleza' },
      { name: 'Parque Lineal del Río Guatapurí', description: 'Paseo urbano a orillas del Guatapurí con senderos y espacios culturales.', tag: 'Experiencia' },
      { name: 'Casa Natal de Carlos Vives', description: 'Hogar del cantante colombiano y epicentro de la cultura vallenata.', tag: 'Cultura' },
      { name: 'Parque Nacional Sierra Nevada de Santa Marta', description: 'Acceso al pico costero más alto del mundo con comunidades indígenas ancestrales.', tag: 'Naturaleza' },
    ],
  },
  {
    code: 'VVC',
    attractions: [
      { name: 'Bioparque Los Ocarros', description: 'Parque temático con fauna típica de los Llanos Orientales como chigüiros y caimanes.', tag: 'Naturaleza' },
      { name: 'Caño Cristales', description: 'El río más hermoso del mundo con algas multicolores, a pocas horas de Villavicencio.', tag: 'Naturaleza' },
      { name: 'Parque Nacional Natural Sierra La Macarena', description: 'Reserva natural única en el mundo donde convergen cuatro grandes ecosistemas.', tag: 'Naturaleza' },
      { name: 'Catedral Nuestra Señora del Carmen', description: 'Catedral principal de Villavicencio en el centro histórico de la ciudad.', tag: 'Cultura' },
      { name: 'Termales del Otoño', description: 'Aguas termales naturales en la vía a los Llanos, ideal para el descanso.', tag: 'Experiencia' },
      { name: 'Festival Internacional del Joropo', description: 'Celebración de la música y el baile llanero, patrimonio cultural de Colombia.', tag: 'Cultura' },
    ],
  },
  {
    code: 'EYP',
    attractions: [
      { name: 'Monumento al Llanero', description: 'Escultura emblemática que representa al hombre de los Llanos Orientales.', tag: 'Arte' },
      { name: 'Laguna de la Sorocabón', description: 'Humedal natural con fauna llanera, tortugas y aves acuáticas.', tag: 'Naturaleza' },
      { name: 'Parque Natural El Tuparro', description: 'Reserva de biosfera en el Vichada con fauna silvestre y paisajes de sabana.', tag: 'Naturaleza' },
      { name: 'Catedral Santiago Apóstol', description: 'Catedral moderna en el centro de Yopal, eje de la vida religiosa casanareña.', tag: 'Cultura' },
      { name: 'Reserva Natural del Río Casanare', description: 'Río de los Llanos con pesca deportiva, delfines de río y fauna tropical.', tag: 'Naturaleza' },
      { name: 'Hato La Esperanza', description: 'Hacienda llanera donde vivir la vida del vaquero y la tradición joropo.', tag: 'Experiencia' },
    ],
  },
  {
    code: 'AEP',
    attractions: [
      { name: 'Obelisco de Buenos Aires', description: 'Monumento icónico en el corazón de la Avenida 9 de Julio, el más ancho del mundo.', tag: 'Historia' },
      { name: 'Barrio La Boca', description: 'Barrio portuario famoso por sus casas coloridas de chapa y el estadio de Boca Juniors.', tag: 'Cultura' },
      { name: 'Teatro Colón', description: 'Uno de los cinco mejores teatros de ópera del mundo con arquitectura deslumbrante.', tag: 'Arte' },
      { name: 'Recoleta y su Cementerio', description: 'Barrio aristocrático con el famoso cementerio donde reposa Eva Perón.', tag: 'Historia' },
      { name: 'Puerto Madero', description: 'Barrio moderno junto al Río de la Plata con restaurantes de autor y arquitectura contemporánea.', tag: 'Experiencia' },
      { name: 'Delta del Tigre', description: 'Laberinto de ríos y canales a las afueras de Buenos Aires, ideal para paseos en lancha.', tag: 'Naturaleza' },
    ],
  },
  {
    code: 'EZE',
    attractions: [
      { name: 'Obelisco de Buenos Aires', description: 'Monumento icónico en el corazón de la Avenida 9 de Julio, el más ancho del mundo.', tag: 'Historia' },
      { name: 'Barrio La Boca', description: 'Barrio portuario famoso por sus casas coloridas de chapa y el estadio de Boca Juniors.', tag: 'Cultura' },
      { name: 'Teatro Colón', description: 'Uno de los cinco mejores teatros de ópera del mundo con arquitectura deslumbrante.', tag: 'Arte' },
      { name: 'Recoleta y su Cementerio', description: 'Barrio aristocrático con el famoso cementerio donde reposa Eva Perón.', tag: 'Historia' },
      { name: 'Puerto Madero', description: 'Barrio moderno junto al Río de la Plata con restaurantes de autor y arquitectura contemporánea.', tag: 'Experiencia' },
      { name: 'Delta del Tigre', description: 'Laberinto de ríos y canales a las afueras de Buenos Aires, ideal para paseos en lancha.', tag: 'Naturaleza' },
    ],
  },
  {
    code: 'COR',
    attractions: [
      { name: 'Manzana Jesuítica', description: 'Conjunto jesuítico colonial declarado Patrimonio de la Humanidad por la UNESCO.', tag: 'Historia' },
      { name: 'Cabildo de Córdoba', description: 'Edificio histórico del siglo XVIII en el centro cívico de la ciudad.', tag: 'Historia' },
      { name: 'Sierras de Córdoba', description: 'Serranías con paisajes únicos, ríos de montaña y destinos como La Cumbrecita.', tag: 'Naturaleza' },
      { name: 'Villa Carlos Paz', description: 'Ciudad turística a orillas del lago San Roque con entretenimiento y naturaleza.', tag: 'Diversión' },
      { name: 'Alta Gracia', description: 'Ciudad serrana con la estancia jesuítica donde vivió el Che Guevara.', tag: 'Historia' },
      { name: 'Museo de Antropología de la UNC', description: 'Museo universitario con colecciones arqueológicas de las culturas originarias de Córdoba.', tag: 'Cultura' },
    ],
  },
  {
    code: 'LPB',
    attractions: [
      { name: 'Valle de la Luna', description: 'Formaciones rocosas erosionadas con paisajes de otro mundo a las afueras de La Paz.', tag: 'Naturaleza' },
      { name: 'Mi Teleférico', description: 'Red de teleféricos urbanos que conecta La Paz con El Alto con vistas panorámicas impresionantes.', tag: 'Experiencia' },
      { name: 'Mercado de las Brujas', description: 'Mercado tradicional con amuletos, hierbas medicinales y rituales andinos.', tag: 'Cultura' },
      { name: 'Tiwanaku', description: 'Ruinas de la civilización prehispánica más antigua de los Andes, a 70 km de La Paz.', tag: 'Historia' },
      { name: 'Lago Titicaca', description: 'El lago navegable más alto del mundo, compartido con Perú, con islas flotantes de totora.', tag: 'Naturaleza' },
      { name: 'Plaza Murillo', description: 'Centro cívico de Bolivia con el Palacio de Gobierno, la Catedral y el Congreso Nacional.', tag: 'Historia' },
    ],
  },
  {
    code: 'VVI',
    attractions: [
      { name: 'Parque Nacional Amboró', description: 'Una de las reservas naturales más biodiversas del mundo entre los Andes y la Amazonía.', tag: 'Naturaleza' },
      { name: 'Biocentro Güembé', description: 'Parque natural con mariposas, piscinas naturales y senderos en la selva boliviana.', tag: 'Naturaleza' },
      { name: 'Catedral Metropolitana de Santa Cruz', description: 'Catedral colonial en la Plaza 24 de Septiembre, corazón de la ciudad.', tag: 'Historia' },
      { name: 'Jardín Botánico Municipal', description: 'Reserva botánica con cactus gigantes y flora del bosque seco tropical.', tag: 'Naturaleza' },
      { name: 'Samaipata', description: 'Ciudad colonial con el fuerte preincaico más grande de Sudamérica.', tag: 'Historia' },
      { name: 'Lomas de Arena', description: 'Dunas de arena dorada a 30 km de la ciudad, un desierto inesperado en Bolivia.', tag: 'Naturaleza' },
    ],
  },
  {
    code: 'BEL',
    attractions: [
      { name: 'Ver-o-Peso', description: 'Mercado histórico del siglo XVII a orillas de la bahía de Guajará, símbolo de la Amazonia.', tag: 'Historia' },
      { name: 'Estação das Docas', description: 'Antiguo puerto renovado con restaurantes, bares y centro cultural frente a la bahía.', tag: 'Experiencia' },
      { name: 'Basílica de Nazaré', description: 'Basílica del siglo XIX, escenario del Círio de Nazaré, la mayor procesión religiosa del mundo.', tag: 'Cultura' },
      { name: 'Museu Paraense Emílio Goeldi', description: 'Museo con el jardín zoobotánico más antiguo de la Amazonia y colecciones indígenas.', tag: 'Naturaleza' },
      { name: 'Ilha do Marajó', description: 'La isla fluvial más grande del mundo con búfalos, artesanía marajoara y playas fluviales.', tag: 'Naturaleza' },
      { name: 'Bosque Rodrigues Alves', description: 'Jardín botánico con árboles amazónicos centenarios en el corazón de Belém.', tag: 'Naturaleza' },
    ],
  },
  {
    code: 'BSB',
    attractions: [
      { name: 'Congresso Nacional', description: 'Sede del parlamento brasileño, obra maestra del arquitecto Oscar Niemeyer.', tag: 'Historia' },
      { name: 'Catedral Metropolitana de Brasília', description: 'Catedral hiperbólica de vidrio y acero, uno de los edificios más icónicos del mundo.', tag: 'Arte' },
      { name: 'Palácio do Planalto', description: 'Sede del gobierno federal con guardia de honor y arquitectura modernista única.', tag: 'Historia' },
      { name: 'Torre de TV de Brasília', description: 'Torre con mirador panorámico y feria de artesanías en su base.', tag: 'Experiencia' },
      { name: 'Parque Nacional de Brasília', description: 'Reserva del cerrado brasileño con piscinas naturales y fauna silvestre.', tag: 'Naturaleza' },
      { name: 'Museu Nacional de Brasília', description: 'Museo con exposiciones de arte moderno y cultura brasileña en edificio de Niemeyer.', tag: 'Arte' },
    ],
  },
  {
    code: 'MAO',
    attractions: [
      { name: 'Teatro Amazonas', description: 'Opulento teatro de ópera del siglo XIX construido en plena selva amazónica.', tag: 'Arte' },
      { name: 'Encontro das Águas', description: 'Fenómeno natural donde el río Negro y el Solimões fluyen juntos sin mezclarse.', tag: 'Naturaleza' },
      { name: 'Mercado Municipal Adolpho Lisboa', description: 'Mercado de 1882 con arquitectura de hierro y productos exóticos de la Amazonía.', tag: 'Historia' },
      { name: 'Parque Nacional do Jaú', description: 'La reserva forestal protegida más grande de Sudamérica en el corazón del Amazonas.', tag: 'Naturaleza' },
      { name: 'Museu do Índio de Manaus', description: 'Museo dedicado a las culturas indígenas amazónicas con objetos ceremoniales.', tag: 'Cultura' },
      { name: 'Palácio Rio Negro', description: 'Mansión histórica de la era del caucho convertida en centro cultural del estado.', tag: 'Historia' },
    ],
  },
  {
    code: 'GIG',
    attractions: [
      { name: 'Cristo Redentor', description: 'Una de las Siete Maravillas del Mundo Moderno, sobre el Cerro Corcovado.', tag: 'Historia' },
      { name: 'Pan de Azúcar', description: 'Formación granítica icónica con teleférico y vistas incomparables de la bahía de Guanabara.', tag: 'Naturaleza' },
      { name: 'Playa de Copacabana', description: 'La playa más famosa de Brasil y una de las más reconocidas del mundo.', tag: 'Experiencia' },
      { name: 'Barrio de Lapa', description: 'Centro de la samba y la vida nocturna carioca con los famosos Arcos da Lapa.', tag: 'Cultura' },
      { name: 'Jardín Botánico de Río', description: 'Jardín fundado en 1808 con orquídeas, palmeras imperiales y fauna local.', tag: 'Naturaleza' },
      { name: 'Estadio Maracaná', description: 'Templo del fútbol mundial con capacidad para 78.000 espectadores.', tag: 'Diversión' },
    ],
  },
  {
    code: 'GRU',
    attractions: [
      { name: 'MASP - Museo de Arte de São Paulo', description: 'El museo de arte más importante de Latinoamérica sobre la Avenida Paulista.', tag: 'Arte' },
      { name: 'Avenida Paulista', description: 'La avenida más famosa de Brasil, centro financiero, cultural y símbolo de São Paulo.', tag: 'Cultura' },
      { name: 'Parque Ibirapuera', description: 'El pulmón verde de São Paulo con museos, lago y senderos en el corazón de la ciudad.', tag: 'Naturaleza' },
      { name: 'Barrio de la Liberdade', description: 'El mayor barrio japonés fuera de Japón con gastronomía, cultura y festivales asiáticos.', tag: 'Cultura' },
      { name: 'Pinacoteca do Estado', description: 'Museo con la mayor colección de arte brasileño, en el primer edificio modernista de São Paulo.', tag: 'Arte' },
      { name: 'Vila Madalena', description: 'Barrio bohemio con murales, galerías de arte y la famosa callejuela Batman.', tag: 'Arte' },
    ],
  },
  {
    code: 'SCL',
    attractions: [
      { name: 'Cerro San Cristóbal', description: 'Parque metropolitano con la estatua de la Virgen María y vistas panorámicas de Santiago.', tag: 'Naturaleza' },
      { name: 'Plaza de Armas', description: 'Plaza fundacional de Santiago con la Catedral Metropolitana y el Museo Histórico Nacional.', tag: 'Historia' },
      { name: 'Barrio Bellavista', description: 'Barrio cultural con la casa de Pablo Neruda, murales, gastronomía y vida nocturna.', tag: 'Arte' },
      { name: 'La Chascona', description: 'Una de las casas de Pablo Neruda, convertida en museo y referente cultural de Chile.', tag: 'Arte' },
      { name: 'Museo Nacional de Bellas Artes', description: 'El museo de arte más antiguo de Chile con colecciones chilenas e internacionales.', tag: 'Arte' },
      { name: 'Valle del Maipo', description: 'Región vitivinícola a las puertas de Santiago, reconocida mundialmente por sus vinos Cabernet.', tag: 'Experiencia' },
    ],
  },
  {
    code: 'CUE',
    attractions: [
      { name: 'Centro Histórico de Cuenca', description: 'Patrimonio de la Humanidad con calles adoquinadas, iglesias coloniales y casas con balcones.', tag: 'Historia' },
      { name: 'Parque Nacional El Cajas', description: 'Reserva andina a 3.000 metros con más de 200 lagunas glaciares y biodiversidad única.', tag: 'Naturaleza' },
      { name: 'Pumapungo', description: 'Complejo arqueológico inca en el centro de Cuenca con jardines étnicos y museo.', tag: 'Historia' },
      { name: 'Catedral de la Inmaculada Concepción', description: 'Catedral con las cúpulas azules más fotografiadas del Ecuador.', tag: 'Cultura' },
      { name: 'Ingapirca', description: 'Las ruinas incas más importantes del Ecuador a dos horas de Cuenca.', tag: 'Historia' },
      { name: 'Barrio Las Herrerías', description: 'Barrio artesanal con talleres de platería, cerámica y la tradicional artesanía cuencana.', tag: 'Arte' },
    ],
  },
  {
    code: 'GYE',
    attractions: [
      { name: 'Malecón 2000', description: 'Paseo regenerado a orillas del Guayas con museos, jardines y el IMAX del Pacífico.', tag: 'Experiencia' },
      { name: 'Parque Seminario Las Iguanas', description: 'Parque urbano famoso por sus iguanas terrestres que conviven libremente con los visitantes.', tag: 'Naturaleza' },
      { name: 'Cerro Santa Ana', description: 'Colina histórica con casas coloniales coloridas, faro y vistas al estuario del Guayas.', tag: 'Historia' },
      { name: 'Las Peñas', description: 'Barrio más antiguo de Guayaquil con galerías de arte, restaurantes y arquitectura republicana.', tag: 'Arte' },
      { name: 'Parque Histórico Guayaquil', description: 'Parque con fauna del litoral ecuatoriano y reconstrucción de la arquitectura del siglo XIX.', tag: 'Historia' },
      { name: 'Manglares Churute', description: 'Reserva con delfines de agua dulce, caimanes y aves migratorias cerca de Guayaquil.', tag: 'Naturaleza' },
    ],
  },
  {
    code: 'GPS',
    attractions: [
      { name: 'Reserva Marina de Galápagos', description: 'Una de las reservas marinas más grandes del mundo con arrecifes coralinos únicos.', tag: 'Naturaleza' },
      { name: 'Centro de Crianza Charles Darwin', description: 'Centro de conservación de tortugas gigantes galápaganas en Santa Cruz.', tag: 'Naturaleza' },
      { name: 'Iguanas Marinas de Fernandina', description: 'Las únicas iguanas marinas del mundo, endémicas del archipiélago de Galápagos.', tag: 'Naturaleza' },
      { name: 'Buceo en Galápagos', description: 'Una de las mejores experiencias de buceo del mundo con tiburones martillo y ballenas.', tag: 'Experiencia' },
      { name: 'Isla Española', description: 'La isla más antigua de Galápagos con colonias de piqueros de patas azules y albatros.', tag: 'Naturaleza' },
      { name: 'Volcán Wolf', description: 'El volcán más alto de las Islas Galápagos con iguanas rosas endémicas en su cráter.', tag: 'Naturaleza' },
    ],
  },
  {
    code: 'MEC',
    attractions: [
      { name: 'Playa Murciélago', description: 'Principal balneario de Manta con deportes acuáticos y gastronomía marina.', tag: 'Naturaleza' },
      { name: 'Puerto Pesquero de Manta', description: 'El mayor puerto atunero del Pacífico Sur con actividad pesquera artesanal e industrial.', tag: 'Cultura' },
      { name: 'Montecristi', description: 'Ciudad natal del sombrero de paja toquilla, declarado Patrimonio Inmaterial por la UNESCO.', tag: 'Arte' },
      { name: 'Parque del Mar de Manta', description: 'Parque costero con vista al Pacífico, esculturas y áreas de descanso.', tag: 'Experiencia' },
      { name: 'Museo del Banco Central del Ecuador', description: 'Museo con arqueología manteña, huancavilca y culturas costeras precolombinas.', tag: 'Historia' },
      { name: 'Playa de Barqueta', description: 'Playa tranquila con aguas bravas, popular entre surfistas y pescadores artesanales.', tag: 'Naturaleza' },
    ],
  },
  {
    code: 'UIO',
    attractions: [
      { name: 'Centro Histórico de Quito', description: 'El mejor conservado de América Latina, declarado primer Patrimonio de la Humanidad en 1978.', tag: 'Historia' },
      { name: 'Ciudad Mitad del Mundo', description: 'Monumento y museo ubicado en la línea ecuatorial, a 22 km al norte de Quito.', tag: 'Cultura' },
      { name: 'Teleférico de Quito', description: 'Cable aéreo que asciende al Volcán Pichincha a 4.100 m con vistas de toda la capital.', tag: 'Experiencia' },
      { name: 'Basílica del Voto Nacional', description: 'La basílica gótica más grande de América con torres escalables y gárgolas de fauna local.', tag: 'Arte' },
      { name: 'Volcán Cotopaxi', description: 'El volcán activo más alto del mundo a 5.897 m, con refugio y ciclismo de descenso.', tag: 'Naturaleza' },
      { name: 'Plaza Foch', description: 'Centro de la vida nocturna y gastronómica del barrio La Mariscal en Quito.', tag: 'Experiencia' },
    ],
  },
  {
    code: 'SCY',
    attractions: [
      { name: 'Centro de Interpretación Darwin', description: 'Museo sobre la historia natural y humana del archipiélago galápaguense.', tag: 'Historia' },
      { name: 'Playa de los Lobos Marinos', description: 'Playa con colonias de lobos marinos que conviven tranquilamente con los turistas.', tag: 'Naturaleza' },
      { name: 'Punta Pitt', description: 'El único lugar de las Galápagos con las tres especies de piqueros en un solo sitio.', tag: 'Naturaleza' },
      { name: 'León Dormido (Kicker Rock)', description: 'Formación volcánica emergente del mar, ideal para buceo con tiburones y rayas.', tag: 'Naturaleza' },
      { name: 'La Lobería', description: 'Reserva de lobos marinos con iguanas terrestres y tortugas gigantes silvestres.', tag: 'Naturaleza' },
      { name: 'Laguna El Junco', description: 'La única laguna de agua dulce en las Galápagos, a 700 m sobre el nivel del mar.', tag: 'Naturaleza' },
    ],
  },
  {
    code: 'GEO',
    attractions: [
      { name: 'Catedral de San Jorge', description: 'Catedral anglicana de madera del siglo XIX, considerada la más alta del mundo en su tipo.', tag: 'Historia' },
      { name: 'Cataratas de Kaieteur', description: 'Una de las cataratas más poderosas del mundo, cinco veces más alta que las del Niágara.', tag: 'Naturaleza' },
      { name: 'Stabroek Market', description: 'Mercado histórico con techo de hierro en el corazón de Georgetown, lleno de vida local.', tag: 'Cultura' },
      { name: 'Jardín Botánico de Georgetown', description: 'Jardín fundado en 1879 con manatíes, pumas y plantas tropicales del Caribe.', tag: 'Naturaleza' },
      { name: 'Fort Zeelandia', description: 'Fortaleza holandesa del siglo XVII testigo de la historia colonial de Guyana.', tag: 'Historia' },
      { name: 'Iwokrama Rainforest', description: 'Reserva de selva virgen para ecoturismo y ciencia en el centro de Guyana.', tag: 'Naturaleza' },
    ],
  },
  {
    code: 'ASU',
    attractions: [
      { name: 'Palacio de los López', description: 'Sede del gobierno paraguayo, palacio neoclásico sobre las orillas del río Paraguay.', tag: 'Historia' },
      { name: 'Panteón Nacional de los Héroes', description: 'Mausoleo neoclásico que alberga los restos de los próceres paraguayos.', tag: 'Historia' },
      { name: 'Catedral Metropolitana de Asunción', description: 'Catedral colonial fundada en 1687 frente a la Plaza de la Independencia.', tag: 'Cultura' },
      { name: 'Mercado 4', description: 'El mercado más grande y colorido de Paraguay con artesanías y comida típica.', tag: 'Experiencia' },
      { name: 'Jardín Botánico y Zoológico', description: 'El parque más grande de Asunción con flora subtropical y fauna autóctona del Paraguay.', tag: 'Naturaleza' },
      { name: 'Casa de la Independencia', description: 'Museo en la casa donde se gestó la independencia paraguaya el 14 de mayo de 1811.', tag: 'Historia' },
    ],
  },
  {
    code: 'CUZ',
    attractions: [
      { name: 'Machu Picchu', description: 'La ciudadela inca perdida entre las nubes, Maravilla del Mundo Moderno y Patrimonio UNESCO.', tag: 'Historia' },
      { name: 'Plaza de Armas del Cusco', description: 'El ombligo del mundo inca, rodeado de la catedral colonial y los templos andinos.', tag: 'Historia' },
      { name: 'Sacsayhuamán', description: 'Fortaleza inca de piedras monumentales sobre las colinas del Cusco.', tag: 'Historia' },
      { name: 'Valle Sagrado de los Incas', description: 'Valle andino con los sitios arqueológicos de Ollantaytambo, Pisac y Moray.', tag: 'Naturaleza' },
      { name: 'Mercado de San Pedro', description: 'Mercado tradicional donde los cuzqueños compran frutas exóticas, hierbas y artesanía.', tag: 'Cultura' },
      { name: 'Catedral del Cusco', description: 'Catedral barroca del siglo XVII construida sobre el palacio del inca Viracocha.', tag: 'Arte' },
    ],
  },
  {
    code: 'LIM',
    attractions: [
      { name: 'Circuito Mágico del Agua', description: 'El parque de fuentes más grande del mundo con 13 fuentes multimedia y espectáculo nocturno.', tag: 'Diversión' },
      { name: 'Museo Larco', description: 'Colección precolombina más importante del mundo en una hacienda colonial del siglo XVIII.', tag: 'Historia' },
      { name: 'Barrio de Miraflores', description: 'Barrio moderno con el parque del Amor, acantilados y la mejor gastronomía de Lima.', tag: 'Experiencia' },
      { name: 'Barrio de Barranco', description: 'Barrio bohemio con el Puente de los Suspiros, galerías y vida cultural limeña.', tag: 'Arte' },
      { name: 'Huaca Pucllana', description: 'Pirámide ceremonial de la cultura Lima del siglo V en pleno centro de la ciudad.', tag: 'Historia' },
      { name: 'Catedral de Lima', description: 'Catedral colonial en la Plaza Mayor donde reposan los restos de Francisco Pizarro.', tag: 'Historia' },
    ],
  },
  {
    code: 'MVD',
    attractions: [
      { name: 'Ciudad Vieja', description: 'Casco histórico con arquitectura neoclásica, el mercado del Puerto y museos nacionales.', tag: 'Historia' },
      { name: 'Rambla de Montevideo', description: 'La costanera más larga de Sudamérica con 22 km de paseo frente al Río de la Plata.', tag: 'Experiencia' },
      { name: 'Mercado del Puerto', description: 'Histórico mercado con parrillas donde degustar el auténtico asado uruguayo.', tag: 'Experiencia' },
      { name: 'Palacio Salvo', description: 'El edificio Art Déco más icónico de Uruguay, símbolo de Montevideo.', tag: 'Arte' },
      { name: 'Teatro Solís', description: 'El teatro más antiguo e importante de Uruguay con óperas, ballet y conciertos.', tag: 'Arte' },
      { name: 'Parque Rodó', description: 'Parque urbano con museo municipal, lago artificial y la bohemia del barrio Parque Rodó.', tag: 'Naturaleza' },
    ],
  },
  {
    code: 'CCS',
    attractions: [
      { name: 'Parque Nacional El Ávila', description: 'Parque de montaña sobre Caracas con teleférico y senderos de alta montaña.', tag: 'Naturaleza' },
      { name: 'Plaza Bolívar de Caracas', description: 'Centro histórico y político de Venezuela con la estatua ecuestre de Simón Bolívar.', tag: 'Historia' },
      { name: 'Teleférico del Ávila', description: 'Cable aéreo que asciende al Hotel Humboldt con panorámica de la capital venezolana.', tag: 'Experiencia' },
      { name: 'Museo de Arte Contemporáneo', description: 'El museo de arte moderno más importante de Venezuela con obras de Picasso y Miró.', tag: 'Arte' },
      { name: 'Parque Los Caobos', description: 'Parque histórico con árboles de caoba centenarios y el Museo de Bellas Artes.', tag: 'Naturaleza' },
      { name: 'Catedral de Caracas', description: 'Catedral colonial del siglo XVII donde reposan los restos de familiares de Simón Bolívar.', tag: 'Historia' },
    ],
  },
  {
    code: 'YUL',
    attractions: [
      { name: 'Mont Royal', description: 'Parque urbano diseñado por Frederick Olmsted con vistas panorámicas de la ciudad.', tag: 'Naturaleza' },
      { name: 'Vieux-Montréal', description: 'Centro histórico con adoquines, arquitectura del siglo XVII y el Viejo Puerto.', tag: 'Historia' },
      { name: 'Basílica de Notre-Dame', description: 'Catedral neogótica con un interior de madera iluminado en azul y dorado.', tag: 'Arte' },
      { name: 'Biodôme de Montréal', description: 'Ecosistemas del continente americano recreados bajo un techo con fauna y flora viva.', tag: 'Naturaleza' },
      { name: 'Museo de Bellas Artes de Montreal', description: 'El museo de arte más visitado de Canadá con 43.000 obras de arte.', tag: 'Arte' },
      { name: 'Mercado Jean-Talon', description: 'El mayor mercado al aire libre de Norteamérica con productos locales de Quebec.', tag: 'Experiencia' },
    ],
  },
  {
    code: 'YYZ',
    attractions: [
      { name: 'CN Tower', description: 'La torre más alta del hemisferio occidental con paseo de vidrio a 365 m de altura.', tag: 'Experiencia' },
      { name: 'Distillery District', description: 'Barrio victoriano preservado con galerías, restaurantes y el mayor festival de Navidad de Canadá.', tag: 'Arte' },
      { name: 'Royal Ontario Museum', description: 'El museo más grande de Canadá con colecciones de arte, cultura y ciencias naturales.', tag: 'Cultura' },
      { name: 'Kensington Market', description: 'Barrio multicultural con mercados vintage, comida internacional y arte callejero.', tag: 'Cultura' },
      { name: 'Islas de Toronto', description: 'Archipiélago a minutos del centro con playas, ciclismo y vistas al skyline de Toronto.', tag: 'Naturaleza' },
      { name: 'Casa Loma', description: 'El único castillo medieval de Norteamérica con 98 habitaciones y jardines secretos.', tag: 'Historia' },
    ],
  },
  {
    code: 'CUN',
    attractions: [
      { name: 'Zona Hotelera de Cancún', description: 'Franja hotelera de 22 km con playas de arena blanca y el mar Caribe turquesa.', tag: 'Experiencia' },
      { name: 'Chichén Itzá', description: 'Ciudad maya del siglo VI, Maravilla del Mundo Moderno y Patrimonio UNESCO.', tag: 'Historia' },
      { name: 'Isla Mujeres', description: 'Pequeña isla caribeña con el banco de coral MUSA y las mejores playas de México.', tag: 'Naturaleza' },
      { name: 'Xcaret', description: 'Parque ecoarqueológico con ríos subterráneos, cenotes y espectáculos de cultura maya.', tag: 'Diversión' },
      { name: 'Cenote Dos Ojos', description: 'Sistema de cavernas subacuáticas con aguas cristalinas, ideal para buceo en caverna.', tag: 'Naturaleza' },
      { name: 'Tulum Ruinas', description: 'Ciudad amurallada maya sobre acantilados con vistas al mar Caribe.', tag: 'Historia' },
    ],
  },
  {
    code: 'MEX',
    attractions: [
      { name: 'Zócalo y Centro Histórico', description: 'La plaza más grande de América Latina con el Palacio Nacional, la Catedral Metropolitana y el Templo Mayor.', tag: 'Historia' },
      { name: 'Museo Nacional de Antropología', description: 'El museo de arqueología más importante de México con la Piedra del Sol azteca.', tag: 'Historia' },
      { name: 'Teotihuacán', description: 'Ciudad prehispánica con las pirámides del Sol y la Luna a 50 km de la capital.', tag: 'Historia' },
      { name: 'Bosque de Chapultepec', description: 'El parque urbano más grande del hemisferio occidental con zoológico, lago y museos.', tag: 'Naturaleza' },
      { name: 'Xochimilco', description: 'Canales de origen azteca Patrimonio UNESCO, con trajineras y comida típica.', tag: 'Cultura' },
      { name: 'Barrio de Coyoacán', description: 'Barrio colonial con la Casa Azul de Frida Kahlo y el mercado más pintoresco de México.', tag: 'Arte' },
    ],
  },
  {
    code: 'MTY',
    attractions: [
      { name: 'Cerro de la Silla', description: 'Montaña emblemática con forma de silla que simboliza a Monterrey en el mundo.', tag: 'Naturaleza' },
      { name: 'Macroplaza', description: 'Una de las plazas más grandes del mundo con el Faro del Comercio y monumentos históricos.', tag: 'Historia' },
      { name: 'Parque Fundidora', description: 'Antiguo complejo siderúrgico reconvertido en parque cultural con museos y teatro.', tag: 'Arte' },
      { name: 'Grutas de García', description: 'Sistema de cavernas naturales a 45 km de Monterrey con formaciones milenarias.', tag: 'Naturaleza' },
      { name: 'Cañón de la Huasteca', description: 'Cañón de paredes verticales de 300 m, ideal para senderismo y rappel.', tag: 'Naturaleza' },
      { name: 'MARCO Museo de Arte Contemporáneo', description: 'Uno de los museos de arte moderno más importantes de Latinoamérica.', tag: 'Arte' },
    ],
  },
  {
    code: 'TQO',
    attractions: [
      { name: 'Zona Arqueológica de Tulum', description: 'Ciudad maya amurallada del siglo XIII sobre los acantilados del Caribe.', tag: 'Historia' },
      { name: 'Gran Cenote', description: 'El cenote más popular de Tulum con estalactitas, tortugas y aguas cristalinas.', tag: 'Naturaleza' },
      { name: "Reserva de la Biosfera Sian Ka'an", description: 'Patrimonio UNESCO con manglares, arrecifes y canales mayas habitados por manatíes.', tag: 'Naturaleza' },
      { name: 'Playa Paraíso Tulum', description: 'Una de las playas más hermosas del mundo con arenas blancas y cenotes costeros.', tag: 'Naturaleza' },
      { name: 'Laguna Kaan Luum', description: 'Laguna de dos colores azul y verde con cenote sumergido en el centro.', tag: 'Naturaleza' },
      { name: 'Cenote Calavera', description: 'Cenote circular abierto también llamado el Templo de la Muerte, ideal para saltos.', tag: 'Experiencia' },
    ],
  },
  {
    code: 'BOS',
    attractions: [
      { name: 'Freedom Trail', description: 'Ruta de 4 km que conecta 16 sitios históricos de la Revolución Americana.', tag: 'Historia' },
      { name: 'Fenway Park', description: 'El estadio de béisbol activo más antiguo de Estados Unidos, hogar de los Red Sox.', tag: 'Diversión' },
      { name: 'Harvard University', description: 'La universidad más antigua de América, con campus histórico en Cambridge.', tag: 'Cultura' },
      { name: 'Museum of Fine Arts', description: 'Uno de los museos de arte más completos de Estados Unidos con 500.000 obras.', tag: 'Arte' },
      { name: 'Quincy Market y Faneuil Hall', description: 'Mercado histórico del siglo XIX con comida, tiendas y espectáculos callejeros.', tag: 'Experiencia' },
      { name: 'Boston Common', description: 'El parque público más antiguo de Estados Unidos en el corazón de la ciudad.', tag: 'Naturaleza' },
    ],
  },
  {
    code: 'ORD',
    attractions: [
      { name: 'Millennium Park y The Bean', description: 'Parque icónico con la escultura Cloud Gate que refleja el skyline de Chicago.', tag: 'Arte' },
      { name: 'Navy Pier', description: 'Muelle histórico sobre el lago Michigan con noria, acuario y espectáculos.', tag: 'Diversión' },
      { name: 'Art Institute of Chicago', description: 'Uno de los más grandes museos de arte del mundo con obras de Seurat y Picasso.', tag: 'Arte' },
      { name: 'Chicago Riverwalk', description: 'Paseo fluvial a lo largo del río Chicago con restaurantes y arquitectura de primer nivel.', tag: 'Experiencia' },
      { name: 'Willis Tower Skydeck', description: 'Observatorio en el piso 103 de la antigua Sears Tower con balcones de cristal.', tag: 'Experiencia' },
      { name: 'Barrio de Wicker Park', description: 'Barrio bohemio con música en vivo, arte callejero y la mejor escena gastronómica de Chicago.', tag: 'Arte' },
    ],
  },
  {
    code: 'DFW',
    attractions: [
      { name: 'Reunion Tower', description: 'Torre esférica con mirador giratorio y vistas de 360° sobre el skyline de Dallas.', tag: 'Experiencia' },
      { name: 'Dallas Arboretum', description: 'Jardín botánico de 26 hectáreas a orillas del lago White Rock con exposiciones florales.', tag: 'Naturaleza' },
      { name: 'Sixth Floor Museum', description: 'Museo en el edificio desde donde se disparó al presidente Kennedy en 1963.', tag: 'Historia' },
      { name: 'Klyde Warren Park', description: 'Parque urbano sobre una autopista enterrada que conecta los barrios de Uptown y Downtown.', tag: 'Naturaleza' },
      { name: 'Deep Ellum', description: 'Barrio de arte, música en vivo y gastronomía, el corazón cultural de Dallas.', tag: 'Arte' },
      { name: 'Dallas Museum of Art', description: 'Museo con 24.000 obras de arte de 5.000 años de historia de la humanidad.', tag: 'Arte' },
    ],
  },
  {
    code: 'FLL',
    attractions: [
      { name: 'Las Olas Boulevard', description: 'Avenida principal con boutiques de lujo, restaurantes y acceso a los canales de la ciudad.', tag: 'Experiencia' },
      { name: 'Fort Lauderdale Beach', description: 'Playa de arena blanca con aguas turquesas, ideal para familias y deportes acuáticos.', tag: 'Naturaleza' },
      { name: 'Everglades National Park', description: 'El humedal protegido más grande de Estados Unidos con caimanes, manatíes y anhinga.', tag: 'Naturaleza' },
      { name: 'Bonnet House Museum', description: 'Casa museo histórica entre la ciudad y la playa con arte y jardines tropicales.', tag: 'Arte' },
      { name: 'NSU Art Museum Fort Lauderdale', description: 'Museo con la mayor colección de expresionismo de CoBrA fuera de Europa.', tag: 'Arte' },
      { name: 'Canales de Fort Lauderdale', description: 'Red de 300 km de canales navegables que dan el apodo de la Venecia de América.', tag: 'Experiencia' },
    ],
  },
  {
    code: 'IAH',
    attractions: [
      { name: 'Space Center Houston', description: 'Centro visitante de la NASA con cohetes, simuladores y el módulo de mando del Apolo 17.', tag: 'Cultura' },
      { name: 'Museum District de Houston', description: 'Área con 19 museos, incluyendo el Museo de Ciencias Naturales y el de Bellas Artes.', tag: 'Arte' },
      { name: 'Hermann Park', description: 'Parque urbano de 180 hectáreas con jardín japonés, rosaleda y monoriel.', tag: 'Naturaleza' },
      { name: 'Houston Zoo', description: 'Uno de los zoológicos más visitados de Estados Unidos con más de 6.000 animales.', tag: 'Naturaleza' },
      { name: 'Buffalo Bayou Park', description: 'Parque lineal a orillas del río con arte público, kayak y vistas del skyline de Houston.', tag: 'Experiencia' },
      { name: 'Galveston Island', description: 'Isla a 50 minutos con playas del Golfo, arquitectura victoriana y el famoso Strand.', tag: 'Naturaleza' },
    ],
  },
  {
    code: 'LAS',
    attractions: [
      { name: 'The Las Vegas Strip', description: 'La avenida más famosa del mundo con hoteles, casinos y espectáculos de clase mundial.', tag: 'Experiencia' },
      { name: 'Fremont Street Experience', description: 'Antiguo centro de Las Vegas con el espectáculo de luz LED más grande del mundo.', tag: 'Diversión' },
      { name: 'Bellagio Fountains', description: 'El espectáculo de fuentes más famoso del mundo con coreografías musicales nocturnas.', tag: 'Arte' },
      { name: 'Grand Canyon National Park', description: 'Una de las Siete Maravillas Naturales del Mundo a 4 horas de Las Vegas.', tag: 'Naturaleza' },
      { name: 'The High Roller', description: 'La rueda de la fortuna más alta del mundo con vistas de Las Vegas desde 167 m.', tag: 'Diversión' },
      { name: 'Presa Hoover', description: 'Represa monumental de la era de la Gran Depresión entre Nevada y Arizona.', tag: 'Historia' },
    ],
  },
  {
    code: 'LAX',
    attractions: [
      { name: 'Hollywood Walk of Fame', description: 'Paseo icónico con más de 2.600 estrellas de artistas de la industria del entretenimiento.', tag: 'Cultura' },
      { name: 'Getty Center', description: 'Museo de arte con arquitectura espectacular y vistas panorámicas de Los Ángeles.', tag: 'Arte' },
      { name: 'Santa Monica Pier', description: 'Muelle histórico con noria, acuario y la icónica playa de Santa Mónica.', tag: 'Diversión' },
      { name: 'Griffith Observatory', description: 'Observatorio planetario sobre las colinas de Hollywood con vistas de toda la ciudad.', tag: 'Cultura' },
      { name: 'Venice Beach Boardwalk', description: 'Paseo frente al Pacífico con skaters, músicos callejeros y culturismo en Muscle Beach.', tag: 'Experiencia' },
      { name: 'Universal Studios Hollywood', description: 'Parque temático en los estudios más antiguos y famosos de la industria cinematográfica.', tag: 'Diversión' },
    ],
  },
  {
    code: 'MIA',
    attractions: [
      { name: 'South Beach', description: 'Playa icónica con arquitectura Art Déco, arena blanca y aguas del Atlántico.', tag: 'Naturaleza' },
      { name: 'Wynwood Walls', description: 'Barrio con el mayor museo de arte urbano al aire libre del mundo.', tag: 'Arte' },
      { name: 'Little Havana', description: 'Barrio cubano con la Calle Ocho, tabaqueros artesanales y la auténtica cultura caribeña.', tag: 'Cultura' },
      { name: 'Everglades National Park', description: 'El único ecosistema subtropical del mundo con caimanes, panteras y manatíes.', tag: 'Naturaleza' },
      { name: 'Vizcaya Museum and Gardens', description: 'Villa italiana del siglo XX con jardines sobre Biscayne Bay, la más bella de Miami.', tag: 'Arte' },
      { name: 'Bayside Marketplace', description: 'Centro comercial frente a la bahía con música en vivo, restaurantes y salidas en yate.', tag: 'Experiencia' },
    ],
  },
  {
    code: 'JFK',
    attractions: [
      { name: 'Estatua de la Libertad', description: 'El símbolo de América y de la libertad, donado por Francia en 1886 en la bahía de Nueva York.', tag: 'Historia' },
      { name: 'Central Park', description: 'El pulmón verde de Manhattan con 341 hectáreas en el corazón de la ciudad.', tag: 'Naturaleza' },
      { name: 'Times Square', description: 'El cruce de calles más famoso del mundo, conocido como el Crossroads of the World.', tag: 'Cultura' },
      { name: 'Metropolitan Museum of Art', description: 'El museo más grande de las Américas con más de 2 millones de objetos de 5.000 años.', tag: 'Arte' },
      { name: 'Brooklyn Bridge', description: 'Puente colgante inaugurado en 1883, símbolo de ingeniería del siglo XIX.', tag: 'Historia' },
      { name: 'The High Line', description: 'Parque lineal elevado sobre una antigua línea de ferrocarril con arte, plantas y vistas.', tag: 'Arte' },
    ],
  },
  {
    code: 'ONT',
    attractions: [
      { name: 'Ontario Mills', description: 'Uno de los centros comerciales más grandes de California con más de 200 tiendas.', tag: 'Experiencia' },
      { name: 'Cucamonga-Guasti Regional Park', description: 'Parque regional con lago artificial, playas de arena y deportes acuáticos.', tag: 'Naturaleza' },
      { name: 'San Bernardino Mountains', description: 'Cadena montañosa a 30 minutos con esquí en Big Bear Lake y senderismo entre pinos.', tag: 'Naturaleza' },
      { name: 'Museum of History and Art Ontario', description: 'Museo local con exposiciones de la historia del sur de California y el Inland Empire.', tag: 'Historia' },
      { name: 'Route 66', description: 'La mítica carretera madre de América atraviesa Ontario con diners y nostalgias de los 50.', tag: 'Cultura' },
      { name: 'Pomona Fairplex', description: 'El recinto ferial más grande del mundo, sede de la Feria del Condado de Los Ángeles.', tag: 'Diversión' },
    ],
  },
  {
    code: 'MCO',
    attractions: [
      { name: 'Walt Disney World Resort', description: 'El parque temático más visitado del mundo con Magic Kingdom, EPCOT y Hollywood Studios.', tag: 'Diversión' },
      { name: 'Universal Studios Florida', description: 'Parques temáticos con el Mundo Mágico de Harry Potter y las atracciones de Universal.', tag: 'Diversión' },
      { name: 'SeaWorld Orlando', description: 'Parque marino con orcas, delfines y la montaña rusa Mako.', tag: 'Naturaleza' },
      { name: 'Kennedy Space Center', description: 'Centro espacial de la NASA a 50 minutos con cohetes reales y el programa Artemis.', tag: 'Cultura' },
      { name: 'International Drive', description: 'El epicentro turístico de Orlando con la noria Icon Park y decenas de atracciones.', tag: 'Diversión' },
      { name: 'LEGOLAND Florida', description: 'Parque temático para niños construido con 50 millones de piezas LEGO.', tag: 'Diversión' },
    ],
  },
  {
    code: 'SFO',
    attractions: [
      { name: 'Golden Gate Bridge', description: 'El puente colgante más fotografiado del mundo sobre la bahía de San Francisco.', tag: 'Historia' },
      { name: 'Alcatraz Island', description: 'La infame prisión federal en una isla de la bahía, hoy museo con visitas nocturnas.', tag: 'Historia' },
      { name: "Fisherman's Wharf", description: 'Muelle histórico con mariscos frescos, lobos marinos y el Museo de Ripley.', tag: 'Experiencia' },
      { name: 'Chinatown de San Francisco', description: 'El barrio chino más antiguo de América con templos, mercados y dim sum.', tag: 'Cultura' },
      { name: 'Twin Peaks', description: 'Colinas gemelas con la mejor vista panorámica de San Francisco y la bahía.', tag: 'Naturaleza' },
      { name: 'Muir Woods National Monument', description: 'Bosque de secuoyas costeras milenarias a 30 minutos de San Francisco.', tag: 'Naturaleza' },
    ],
  },
  {
    code: 'TPA',
    attractions: [
      { name: 'Busch Gardens Tampa', description: 'Parque safari con montañas rusas y más de 12.000 animales africanos.', tag: 'Diversión' },
      { name: 'Clearwater Beach', description: 'Una de las mejores playas de Estados Unidos con arena blanca y aguas del Golfo.', tag: 'Naturaleza' },
      { name: 'Ybor City', description: 'Barrio histórico cubano-español con tabaquería artesanal, bares y música en vivo.', tag: 'Historia' },
      { name: 'Florida Aquarium', description: 'Acuario con más de 20.000 organismos acuáticos de Florida y el Caribe.', tag: 'Naturaleza' },
      { name: 'Tampa Riverwalk', description: 'Paseo de 2.6 km a orillas del río Hillsborough con museos, restaurantes y arte.', tag: 'Experiencia' },
      { name: 'Tampa Bay History Center', description: 'Museo de cinco pisos con la historia de la bahía de Tampa desde 12.000 años.', tag: 'Historia' },
    ],
  },
  {
    code: 'IAD',
    attractions: [
      { name: 'National Mall', description: 'Espacio abierto de 3 km con los monumentos y memoriales más importantes de la nación.', tag: 'Historia' },
      { name: 'Museos Smithsonian', description: 'La mayor red de museos del mundo, todos gratuitos, con el Air and Space Museum.', tag: 'Cultura' },
      { name: 'Lincoln Memorial', description: 'Memorial neoclásico con la estatua colosal de Lincoln, escenario del discurso de MLK.', tag: 'Historia' },
      { name: 'Capitolio de los Estados Unidos', description: 'Sede del Congreso federal con la cúpula más reconocible de Washington.', tag: 'Historia' },
      { name: 'La Casa Blanca', description: 'Residencia oficial del presidente con tours y el jardín de rosas histórico.', tag: 'Historia' },
      { name: 'Arlington National Cemetery', description: 'Cementerio con más de 400.000 militares americanos y la tumba del soldado desconocido.', tag: 'Historia' },
    ],
  },
  {
    code: 'AUA',
    attractions: [
      { name: 'Eagle Beach', description: 'Frecuentemente elegida entre las mejores playas del mundo con tortugas marinas anidando.', tag: 'Naturaleza' },
      { name: 'Palm Beach', description: 'Playa animada con deportes acuáticos, restaurantes en la arena y hoteles de resort.', tag: 'Experiencia' },
      { name: 'Parque Nacional Arikok', description: 'Reserva que cubre el 20% de Aruba con cactus gigantes, cuevas y fauna endémica.', tag: 'Naturaleza' },
      { name: 'California Lighthouse', description: 'Faro histórico en el extremo norte de la isla con vistas espectaculares al Caribe.', tag: 'Historia' },
      { name: 'Piscina Natural de Aruba', description: 'Formación rocosa natural que crea una piscina protegida del mar abierto.', tag: 'Naturaleza' },
      { name: 'Centro Histórico de Oranjestad', description: 'Capital con arquitectura holandesa colorida, boutiques de lujo y el Fuerte Zoutman.', tag: 'Historia' },
    ],
  },
  {
    code: 'SJO',
    attractions: [
      { name: 'Teatro Nacional de Costa Rica', description: 'El edificio más emblemático de Costa Rica, inaugurado en 1897 con ópera y ballet.', tag: 'Arte' },
      { name: 'Volcán Poás', description: 'Volcán activo con el cráter ácido más grande del mundo, a 37 km de San José.', tag: 'Naturaleza' },
      { name: 'Parque Nacional Braulio Carrillo', description: 'Selva nublada exuberante con teleférico del Atlántico y gran biodiversidad.', tag: 'Naturaleza' },
      { name: 'Mercado Central de San José', description: 'Mercado histórico de 1880 con sodas, artesanías y el mejor café de Costa Rica.', tag: 'Cultura' },
      { name: 'Museo del Jade', description: 'El museo con la mayor colección de jade precolombino de América en un edificio espectacular.', tag: 'Historia' },
      { name: 'Parque La Sabana', description: 'El parque más grande de San José con el Museo de Arte Costarricense y estadio nacional.', tag: 'Naturaleza' },
    ],
  },
  {
    code: 'CUR',
    attractions: [
      { name: 'Handelskade de Willemstad', description: 'Fila de casas de colores vibrantes a orillas del río Sint Annabaai, icono del Caribe.', tag: 'Arte' },
      { name: 'Floating Market', description: 'Mercado flotante de botes venezolanos con frutas tropicales y pescado fresco.', tag: 'Cultura' },
      { name: 'Hato Caves', description: 'Sistema de cuevas con estalactitas, estalagmitas y colonias de murciélagos.', tag: 'Naturaleza' },
      { name: 'Parque Nacional Christoffel', description: 'Reserva natural con la montaña más alta de Curazao y venados de cola blanca.', tag: 'Naturaleza' },
      { name: 'Curaçao Sea Aquarium', description: 'Acuario con tiburones nodriza, rayas y delfines entrenados en un arrecife natural.', tag: 'Naturaleza' },
      { name: 'Fort Amsterdam', description: 'Fortaleza del siglo XVII que sirvió como sede del gobierno colonial holandés.', tag: 'Historia' },
    ],
  },
  {
    code: 'SAL',
    attractions: [
      { name: 'Parque Nacional El Boquerón', description: 'Volcán Santa Ana con mirador sobre el cráter cubierto de vegetación de niebla.', tag: 'Naturaleza' },
      { name: 'Ruta de las Flores', description: 'Carretera escénica entre pueblos coloniales con flores, artesanías y gastronomía.', tag: 'Experiencia' },
      { name: 'Lago de Coatepeque', description: 'Lago de cráter volcánico con aguas azules para kayak, pesca y deportes acuáticos.', tag: 'Naturaleza' },
      { name: 'Joya de Cerén', description: 'La Pompeya de América, ciudad maya enterrada por cenizas volcánicas, Patrimonio UNESCO.', tag: 'Historia' },
      { name: 'Catedral Metropolitana de San Salvador', description: 'Catedral con las cenizas del Mons. Óscar Romero, símbolo de la memoria histórica.', tag: 'Historia' },
      { name: 'Parque Zoológico Nacional', description: 'El zoológico más grande de Centroamérica con más de 600 animales nativos.', tag: 'Naturaleza' },
    ],
  },
  {
    code: 'FRS',
    attractions: [
      { name: 'Tikal', description: 'La ciudad maya más importante de Mesoamérica con templos que superan la selva tropical.', tag: 'Historia' },
      { name: 'Lago Petén Itzá', description: 'El tercer lago más grande de Guatemala, corazón del Petén, con poblados mayas.', tag: 'Naturaleza' },
      { name: 'Yaxhá', description: 'Ciudad maya a orillas de una laguna, escenario del reality Survivor Guatemala.', tag: 'Historia' },
      { name: 'Isla de Flores', description: 'Ciudad colonial en una isla del lago Petén con calles adoquinadas y hoteles boutique.', tag: 'Historia' },
      { name: 'Reserva de Biosfera Maya', description: 'La reserva forestal tropical más grande de América Central con jaguares y quetzales.', tag: 'Naturaleza' },
      { name: 'Cerro Cahuí', description: 'Reserva biológica en la orilla del lago Petén con monos araña y aves tropicales.', tag: 'Naturaleza' },
    ],
  },
  {
    code: 'GUA',
    attractions: [
      { name: 'Antigua Guatemala', description: 'Ciudad colonial Patrimonio UNESCO con volcanes de fondo, a 45 minutos de la capital.', tag: 'Historia' },
      { name: 'Lago Atitlán', description: 'El lago más hermoso del mundo según Aldous Huxley, rodeado de tres volcanes y pueblos mayas.', tag: 'Naturaleza' },
      { name: 'Catedral Metropolitana de Guatemala', description: 'Catedral barroca del siglo XVIII en el Parque Central de la capital.', tag: 'Historia' },
      { name: 'Zoológico La Aurora', description: 'Zoológico nacional con especies de Centroamérica, África y Asia.', tag: 'Naturaleza' },
      { name: 'Mercado Central de Guatemala', description: 'Mercado subterráneo de 3 niveles con artesanías mayas, telas y souvenirs.', tag: 'Cultura' },
      { name: 'Palacio Nacional de la Cultura', description: 'Palacio de estilo neoclásico con murales históricos que narran la historia guatemalteca.', tag: 'Arte' },
    ],
  },
  {
    code: 'XPL',
    attractions: [
      { name: 'Catedral de Comayagua', description: 'Una de las catedrales más antiguas de América con el reloj árabe más viejo del mundo.', tag: 'Historia' },
      { name: 'Parque Nacional Montaña de Celaque', description: 'El pico más alto de Honduras con bosques nublados y quetzales en su cima.', tag: 'Naturaleza' },
      { name: 'Lago de Yojoa', description: 'El lago natural más grande de Honduras con aves migratorias y cascadas.', tag: 'Naturaleza' },
      { name: 'Museo de Arqueología de Comayagua', description: 'Museo en el antiguo Palacio Colonial con piezas lencas y reliquias coloniales.', tag: 'Historia' },
      { name: 'Iglesia San Francisco', description: 'Iglesia colonial del siglo XVI, la más antigua de Honduras en uso continuo.', tag: 'Historia' },
      { name: 'Reserva Biológica Texíguat', description: 'Reserva de bosque nublado con pumas, tapires y orquídeas endémicas de Honduras.', tag: 'Naturaleza' },
    ],
  },
  {
    code: 'SAP',
    attractions: [
      { name: 'Copán Ruinas', description: 'Ciudad maya famosa por sus estelas esculpidas y la escalinata jeroglífica más larga del mundo.', tag: 'Historia' },
      { name: 'Lago de Yojoa', description: 'El lago natural más grande de Honduras, a 90 minutos, con aves únicas y cascadas.', tag: 'Naturaleza' },
      { name: 'Parque Nacional Cusuco', description: 'Reserva de bosque nublado a 20 km de la ciudad con salamandras y quetzales.', tag: 'Naturaleza' },
      { name: 'Museo de Antropología e Historia', description: 'Museo con la historia prehispánica y colonial del noroeste de Honduras.', tag: 'Historia' },
      { name: 'Catedral San Pedro Apóstol', description: 'Catedral neoclásica del siglo XX en el Parque Central de San Pedro Sula.', tag: 'Cultura' },
      { name: 'Cascadas de Pulhapanzak', description: 'La cascada más imponente de Honduras a solo una hora de San Pedro Sula.', tag: 'Naturaleza' },
    ],
  },
  {
    code: 'MGA',
    attractions: [
      { name: 'Catedral Vieja de Managua', description: 'La catedral en ruinas del terremoto de 1972, hoy monumento histórico de Nicaragua.', tag: 'Historia' },
      { name: 'Lago de Managua (Xolotlán)', description: 'Lago volcánico en el corazón de la capital con proyectos de restauración ambiental.', tag: 'Naturaleza' },
      { name: 'Laguna de Tiscapa', description: 'Laguna en el cráter del volcán Tiscapa con tirolesa y vista panorámica de Managua.', tag: 'Experiencia' },
      { name: 'Teatro Nacional Rubén Darío', description: 'Teatro de referencia centroamericana con espectáculos de ballet, ópera y teatro.', tag: 'Arte' },
      { name: 'Reserva Natural Volcán Masaya', description: 'Volcán activo a 20 km con lava visible de noche y loros de la lava en su cráter.', tag: 'Naturaleza' },
      { name: 'Mercado Roberto Huembes', description: 'El mayor mercado de Nicaragua con artesanías, hamacas y comida tradicional.', tag: 'Cultura' },
    ],
  },
  {
    code: 'PTY',
    attractions: [
      { name: 'Canal de Panamá', description: 'Una de las obras de ingeniería más asombrosas del mundo que une el Atlántico y el Pacífico.', tag: 'Historia' },
      { name: 'Casco Viejo de Panamá', description: 'Patrimonio UNESCO, barrio colonial con iglesias del siglo XVII y vida bohemia.', tag: 'Historia' },
      { name: 'Causeway Amador', description: 'Paseo costero que une tres islas con vistas al canal y el skyline de Panamá.', tag: 'Experiencia' },
      { name: 'Biomuseo', description: 'Museo diseñado por Frank Gehry sobre el surgimiento del Istmo y la biodiversidad panameña.', tag: 'Naturaleza' },
      { name: 'Parque Nacional Metropolitano', description: 'El único parque forestal tropical dentro de una ciudad latinoamericana.', tag: 'Naturaleza' },
      { name: 'Islas San Blas (Guna Yala)', description: 'Archipiélago indígena Guna con playas vírgenes y cultura ancestral viva.', tag: 'Cultura' },
    ],
  },
  {
    code: 'SJU',
    attractions: [
      { name: 'Viejo San Juan', description: 'Casco histórico colonial de 500 años con adoquines azules y fortalezas del siglo XVI.', tag: 'Historia' },
      { name: 'Castillo San Felipe del Morro', description: 'Fortaleza militar del siglo XVI en el extremo norte de la isla, Patrimonio UNESCO.', tag: 'Historia' },
      { name: 'El Yunque National Forest', description: 'El único bosque tropical nacional de Estados Unidos con cascadas y cotorras puertorriqueñas.', tag: 'Naturaleza' },
      { name: 'Playa Condado', description: 'Playa urbana con hoteles de lujo, bares y aguas del Atlántico en el corazón de San Juan.', tag: 'Experiencia' },
      { name: 'Museo de Arte de Puerto Rico', description: 'El museo más importante de la isla con arte del Caribe y artistas puertorriqueños.', tag: 'Arte' },
      { name: 'La Fortaleza', description: 'Residencia oficial del gobernador, la fortaleza más antigua en uso en el hemisferio.', tag: 'Historia' },
    ],
  },
  {
    code: 'PUJ',
    attractions: [
      { name: 'Playa Bávaro', description: 'Una de las playas más extensas del Caribe con 35 km de arena blanca y palmeras.', tag: 'Naturaleza' },
      { name: 'Scape Park Cap Cana', description: 'Parque de aventuras con cenotes, zipline, safaris y cataratas en la naturaleza dominicana.', tag: 'Diversión' },
      { name: 'Isla Saona', description: 'Isla paradisíaca dentro del Parque Nacional del Este con manglares y piscinas naturales.', tag: 'Naturaleza' },
      { name: 'Hoyo Azul', description: 'Laguna cenote de aguas azul turquesa en una gruta con palmeras en Cap Cana.', tag: 'Naturaleza' },
      { name: 'Altos de Chavón', description: 'Réplica de pueblo mediterráneo del siglo XVI sobre el cañón del río Chavón.', tag: 'Arte' },
      { name: 'Bávaro Adventure Park', description: 'Parque de aventuras con buggy, tirolesa y rapel en el corazón de Punta Cana.', tag: 'Diversión' },
    ],
  },
  {
    code: 'SDQ',
    attractions: [
      { name: 'Ciudad Colonial de Santo Domingo', description: 'El primer asentamiento europeo en América, Patrimonio UNESCO con calles del siglo XV.', tag: 'Historia' },
      { name: 'Fortaleza Ozama', description: 'La fortaleza más antigua del hemisferio occidental, construida por los españoles en 1502.', tag: 'Historia' },
      { name: 'Catedral Primada de América', description: 'La catedral más antigua del hemisferio occidental, iniciada en 1514.', tag: 'Historia' },
      { name: 'Alcázar de Colón', description: 'Palacio renacentista del hijo de Cristóbal Colón, convertido en museo.', tag: 'Historia' },
      { name: 'Malecón de Santo Domingo', description: 'Paseo marítimo de 15 km con vida nocturna, restaurantes y vistas al Caribe.', tag: 'Experiencia' },
      { name: 'Parque Nacional Los Tres Ojos', description: 'Sistema de cavernas con tres lagunas de aguas cristalinas dentro de la ciudad.', tag: 'Naturaleza' },
    ],
  },
  {
    code: 'BCN',
    attractions: [
      { name: 'La Sagrada Familia', description: 'La basílica modernista de Gaudí en construcción desde 1882, obra maestra del arte universal.', tag: 'Arte' },
      { name: 'Park Güell', description: 'Parque de Gaudí con mosaicos de colores y vistas panorámicas de Barcelona.', tag: 'Arte' },
      { name: 'Las Ramblas', description: 'El paseo más famoso de España con quioscos, artistas callejeros y el Mercado de la Boqueria.', tag: 'Experiencia' },
      { name: 'Barrio Gótico', description: 'El corazón medieval de Barcelona con la Catedral, Plaça Reial y callejuelas romanas.', tag: 'Historia' },
      { name: 'Camp Nou', description: 'El estadio de fútbol más grande de Europa, hogar del FC Barcelona.', tag: 'Diversión' },
      { name: 'Museo Picasso de Barcelona', description: 'El museo más visitado de Barcelona con la mayor colección de obras de Pablo Picasso.', tag: 'Arte' },
    ],
  },
  {
    code: 'MAD',
    attractions: [
      { name: 'Museo del Prado', description: 'Uno de los museos más importantes del mundo con Las Meninas de Velázquez y Goya.', tag: 'Arte' },
      { name: 'Parque del Buen Retiro', description: 'El parque histórico de Madrid con el estanque, el Palacio de Cristal y jardines formales.', tag: 'Naturaleza' },
      { name: 'Puerta del Sol', description: 'El corazón de Madrid y de España, kilómetro cero de las carreteras radiales.', tag: 'Historia' },
      { name: 'Gran Vía', description: 'La avenida más cosmopolita de Madrid con teatros, tiendas y arquitectura monumental.', tag: 'Cultura' },
      { name: 'Palacio Real de Madrid', description: 'La residencia oficial de la corona española, el palacio real más grande de Europa occidental.', tag: 'Historia' },
      { name: 'Museo Reina Sofía', description: 'El museo de arte contemporáneo con el Guernica de Picasso como pieza central.', tag: 'Arte' },
    ],
  },
  {
    code: 'CDG',
    attractions: [
      { name: 'Torre Eiffel', description: 'El monumento más visitado del mundo, construido en 1889 como arco de entrada a la Expo Universal.', tag: 'Historia' },
      { name: 'Museo del Louvre', description: 'El museo más grande y visitado del mundo con la Mona Lisa y la Venus de Milo.', tag: 'Arte' },
      { name: 'Catedral de Notre-Dame', description: 'Obra maestra del gótico francés del siglo XII, en proceso de restauración tras el incendio de 2019.', tag: 'Historia' },
      { name: 'Montmartre y Sacré-Cœur', description: 'Barrio artístico bohemio con la basílica blanca y las vistas más románticas de París.', tag: 'Arte' },
      { name: 'Palacio de Versalles', description: 'Residencia real del siglo XVII con los jardines más grandiosos de Europa.', tag: 'Historia' },
      { name: 'Champs-Élysées y Arco del Triunfo', description: 'La avenida más famosa del mundo con el arco encargado por Napoleón Bonaparte.', tag: 'Cultura' },
    ],
  },
  {
    code: 'LHR',
    attractions: [
      { name: 'Buckingham Palace', description: 'Residencia oficial de la monarquía británica con el Cambio de Guardia diario.', tag: 'Historia' },
      { name: 'Torre de Londres', description: 'Fortaleza del siglo XI con los Joyas de la Corona, cuervos y la historia de Inglaterra.', tag: 'Historia' },
      { name: 'British Museum', description: 'El museo más visitado del mundo con la Piedra Rosetta y las esculturas del Partenón.', tag: 'Cultura' },
      { name: 'Hyde Park', description: 'El parque real más emblemático de Londres con el Speakers Corner y el lago Serpentine.', tag: 'Naturaleza' },
      { name: 'Covent Garden', description: 'Antiguo mercado reconvertido en epicentro cultural con artistas callejeros y teatro.', tag: 'Arte' },
      { name: 'Tower Bridge', description: 'El puente victoriano más icónico del mundo sobre el Támesis con museo y pasarela de cristal.', tag: 'Historia' },
    ],
  },
];

// ─── HELPERS ──────────────────────────────────────────────────────────────────

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

async function addAttractions() {
  console.log('Starting attractions import...');
  console.log(`Space: ${SPACE_ID} | Environment: ${ENVIRONMENT}\n`);

  if (!SPACE_ID || !MANAGEMENT_TOKEN) {
    console.error('Error: CONTENTFUL_SPACE_ID or CONTENTFUL_MANAGEMENT_TOKEN not set in .env');
    process.exit(1);
  }

  const client = createClient({ accessToken: MANAGEMENT_TOKEN });
  const space = await client.getSpace(SPACE_ID);
  const environment = await space.getEnvironment(ENVIRONMENT);
  console.log('✅ Connected to Contentful\n');

  let successCount = 0;
  let errorCount = 0;

  for (const { code, attractions } of destinationAttractions) {
    console.log(`📍 [${code}] Adding ${attractions.length} attractions...`);

    try {
      // 1. Find the existing entry by code
      let entry = await findDestinationByCode(environment, code);

      // 2. Unpublish to allow editing
      try { await entry.unpublish(); } catch (_) { /* already draft */ }
      entry = await environment.getEntry(entry.sys.id);

      // 3. Set the attractions JSON field
      entry.fields.attractions = { 'en-US': attractions };

      // 4. Save and republish
      const updated = await entry.update();
      await updated.publish();

      console.log(`  ✅ Done`);
      successCount++;

    } catch (err) {
      console.error(`  ✗ [${code}] ${err.message}`);
      errorCount++;
    }
  }

  console.log('\n' + '='.repeat(50));
  console.log('✅ Attractions import complete!');
  console.log('='.repeat(50));
  console.log(`  • Destinations updated: ${successCount}`);
  console.log(`  • Errors:               ${errorCount}`);
}

addAttractions().catch(err => {
  console.error('Fatal error:', err.message);
  process.exit(1);
});