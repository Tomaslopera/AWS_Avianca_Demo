const destinations = [
  // Colombia
  { name: "Arauca", code: "AUC", country: "Colombia", type: "national", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-arauca.jpg" },
  { name: "Armenia", code: "AXM", country: "Colombia", type: "national", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-armenia.png" },
  { name: "Barrancabermeja", code: "EJA", country: "Colombia", type: "national", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-barrancabermeja.jpg" },
  { name: "Barranquilla", code: "BAQ", country: "Colombia", type: "national", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-barranquilla.webp" },
  { name: "Bogotá", code: "BOG", country: "Colombia", type: "national", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-bogota.jpg" },
  { name: "Bucaramanga", code: "BGA", country: "Colombia", type: "national", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-bucaramanga.jpg" },
  { name: "Cali", code: "CLO", country: "Colombia", type: "national", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-cali.jpg" },
  { name: "Cartagena de Indias", code: "CTG", country: "Colombia", type: "national", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-cartagena.jpg" },
  { name: "Cúcuta", code: "CUC", country: "Colombia", type: "national", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-cucuta.jpg" },
  { name: "Ibagué", code: "IBE", country: "Colombia", type: "national", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-ibague.jpg" },
  { name: "Ipiales", code: "IPI", country: "Colombia", type: "national", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-ipiales.jpg" },
  { name: "Leticia", code: "LET", country: "Colombia", type: "national", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-leticia.jpg" },
  { name: "Medellín", code: "MDE", country: "Colombia", type: "national", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-medellin.jpg" },
  { name: "Montería", code: "MTR", country: "Colombia", type: "national", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-monteria.jpg" },
  { name: "Neiva", code: "NVA", country: "Colombia", type: "national", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-neiva.jpg" },
  { name: "Pasto", code: "PSO", country: "Colombia", type: "national", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-pasto.jpg" },
  { name: "Pereira", code: "PEI", country: "Colombia", type: "national", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-pereira.webp" },
  { name: "Popayán", code: "PPN", country: "Colombia", type: "national", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-popayan.jpg" },
  { name: "Quibdó", code: "UIB", country: "Colombia", type: "national", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-quibdo.jpg" },
  { name: "Riohacha", code: "RCH", country: "Colombia", type: "national", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-riohacha.jpg" },
  { name: "San Andrés", code: "ADZ", country: "Colombia", type: "national", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-sanandres.webp" },
  { name: "Santa Marta", code: "SMR", country: "Colombia", type: "national", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-santamarta.jpg" },
  { name: "Valledupar", code: "VUP", country: "Colombia", type: "national", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-valledupar.jpg" },
  { name: "Villavicencio", code: "VVC", country: "Colombia", type: "national", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-villavicencio.jpg" },
  { name: "Yopal", code: "EYP", country: "Colombia", type: "national", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-yopal.jpg" },

  // Suramérica
  { name: "Buenos Aires", code: "AEP", country: "Argentina", type: "international", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-buenos-aires.webp" },
  { name: "Buenos Aires", code: "EZE", country: "Argentina", type: "international", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-buenos-aires.webp" },
  { name: "Córdoba", code: "COR", country: "Argentina", type: "international", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-cordoba.jpg" },
  { name: "La Paz", code: "LPB", country: "Bolivia", type: "international", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-la-paz.jpg" },
  { name: "Santa Cruz de la Sierra", code: "VVI", country: "Bolivia", type: "international", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-santa-cruz.jpg" },
  { name: "Belém", code: "BEL", country: "Brasil", type: "international", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-belem.jpg" },
  { name: "Brasilia", code: "BSB", country: "Brasil", type: "international", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-brasilia.jpg" },
  { name: "Manaos", code: "MAO", country: "Brasil", type: "international", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-manaos.webp" },
  { name: "Río de Janeiro", code: "GIG", country: "Brasil", type: "international", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-rio-de-janeiro.jpeg" },
  { name: "São Paulo", code: "GRU", country: "Brasil", type: "international", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-sao-paulo.png" },
  { name: "Santiago", code: "SCL", country: "Chile", type: "international", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-santiago.jpg" },
  { name: "Cuenca", code: "CUE", country: "Ecuador", type: "international", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-cuenca.jpg" },
  { name: "Guayaquil", code: "GYE", country: "Ecuador", type: "international", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-guayaquil.jpg" },
  { name: "Isla Baltra", code: "GPS", country: "Ecuador", type: "international", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-isla-baltra.webp" },
  { name: "Manta", code: "MEC", country: "Ecuador", type: "international", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-manta.jpg" },
  { name: "Quito", code: "UIO", country: "Ecuador", type: "international", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-quito.webp" },
  { name: "San Cristóbal", code: "SCY", country: "Ecuador", type: "international", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-san-cristobal.jpg" },
  { name: "Georgetown", code: "GEO", country: "Guyana", type: "international", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-georgetown.webp" },
  { name: "Asunción", code: "ASU", country: "Paraguay", type: "international", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-asuncion.jpg" },
  { name: "Cusco", code: "CUZ", country: "Perú", type: "international", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-cusco.webp" },
  { name: "Lima", code: "LIM", country: "Perú", type: "international", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-lima.jpg" },
  { name: "Montevideo", code: "MVD", country: "Uruguay", type: "international", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-montevideo.webp" },
  { name: "Caracas", code: "CCS", country: "Venezuela", type: "international", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-caracas.webp" },

  // Norteamérica
  { name: "Montreal", code: "YUL", country: "Canadá", type: "international", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-montreal.webp" },
  { name: "Toronto", code: "YYZ", country: "Canadá", type: "international", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-toronto.jpg" },
  { name: "Cancún", code: "CUN", country: "México", type: "international", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-cancun.webp" },
  { name: "Ciudad de México", code: "MEX", country: "México", type: "international", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-ciudad-de-mexico.webp" },
  { name: "Monterrey", code: "MTY", country: "México", type: "international", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-monterrey.jpg" },
  { name: "Tulum", code: "TQO", country: "México", type: "international", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-tulum.webp" },
  { name: "Boston", code: "BOS", country: "Estados Unidos", type: "international", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-boston.webp" },
  { name: "Chicago", code: "ORD", country: "Estados Unidos", type: "international", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-chicago.jpg" },
  { name: "Dallas", code: "DFW", country: "Estados Unidos", type: "international", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-dallas.jpg" },
  { name: "Fort Lauderdale", code: "FLL", country: "Estados Unidos", type: "international", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-fort-lauderdale.jpg" },
  { name: "Houston", code: "IAH", country: "Estados Unidos", type: "international", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-houston.webp" },
  { name: "Las Vegas", code: "LAS", country: "Estados Unidos", type: "international", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-las-vegas.webp" },
  { name: "Los Ángeles", code: "LAX", country: "Estados Unidos", type: "international", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-los-angeles.jpg" },
  { name: "Miami", code: "MIA", country: "Estados Unidos", type: "international", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-miami.webp" },
  { name: "Nueva York", code: "JFK", country: "Estados Unidos", type: "international", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-nueva-york.jpg" },
  { name: "Ontario", code: "ONT", country: "Estados Unidos", type: "international", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-ontario.jpg" },
  { name: "Orlando", code: "MCO", country: "Estados Unidos", type: "international", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-orlando.jpg" },
  { name: "San Francisco", code: "SFO", country: "Estados Unidos", type: "international", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-san-francisco.webp" },
  { name: "Tampa", code: "TPA", country: "Estados Unidos", type: "international", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-tampa.webp" },
  { name: "Washington D.C.", code: "IAD", country: "Estados Unidos", type: "international", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-washington.webp" },

  // Centroamérica y Caribe
  { name: "Oranjestad", code: "AUA", country: "Aruba", type: "international", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-oranjestad.jpg" },
  { name: "San José", code: "SJO", country: "Costa Rica", type: "international", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-san-jose.webp" },
  { name: "Willemstad", code: "CUR", country: "Curazao", type: "international", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-willemstad.jpg" },
  { name: "San Salvador", code: "SAL", country: "El Salvador", type: "international", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-san-salvador.jpg" },
  { name: "Flores", code: "FRS", country: "Guatemala", type: "international", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-flores.webp" },
  { name: "Ciudad de Guatemala", code: "GUA", country: "Guatemala", type: "international", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-ciudad-de-guatemala.jpg" },
  { name: "Comayagua", code: "XPL", country: "Honduras", type: "international", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-comayagua.jpg" },
  { name: "San Pedro Sula", code: "SAP", country: "Honduras", type: "international", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-san-pedro-sula.jpg" },
  { name: "Managua", code: "MGA", country: "Nicaragua", type: "international", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-managua.jpg" },
  { name: "Ciudad de Panamá", code: "PTY", country: "Panamá", type: "international", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-ciudad-de-panama.jpg" },
  { name: "San Juan", code: "SJU", country: "Puerto Rico", type: "international", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-san-juan.jpg" },
  { name: "Punta Cana", code: "PUJ", country: "República Dominicana", type: "international", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-punta-cana.webp" },
  { name: "Santo Domingo", code: "SDQ", country: "República Dominicana", type: "international", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-santo-domingo.jpg" },

  // Europa
  { name: "Barcelona", code: "BCN", country: "España", type: "international", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-barcelona.jpg" },
  { name: "Madrid", code: "MAD", country: "España", type: "international", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-madrid.jpg" },
  { name: "París", code: "CDG", country: "Francia", type: "international", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-paris.webp" },
  { name: "Londres", code: "LHR", country: "Reino Unido", type: "international", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-londres.jpg" }
];

const tourismData = {
  "Armenia": [
    {
      name: "Valle del Cocora",
      description: "Hogar de la palma de cera más alta del mundo.",
      image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-londres.jpg",
      tag: "Naturaleza"
    },
    {
      name: "Parque del Café",
      description: "Parque temático dedicado a la cultura cafetera.",
      image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-londres.jpg",
      tag: "Diversión"
    }
  ],

  "Buenos Aires": [
    {
      name: "Obelisco",
      description: "Símbolo icónico de la ciudad.",
      image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-londres.jpg",
      tag: "Cultura"
    },
    {
      name: "La Boca",
      description: "Barrio famoso por sus casas coloridas.",
      image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-londres.jpg",
      tag: "Historia"
    }
  ],

  "La Paz": [
    {
      name: "Valle de la Luna",
      description: "Formaciones rocosas impresionantes.",
      image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-londres.jpg",
      tag: "Naturaleza"
    },
    {
      name: "Teleférico Mi Teleférico",
      description: "Sistema de transporte con vistas panorámicas.",
      image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-londres.jpg",
      tag: "Experiencia"
    }
  ]
};
