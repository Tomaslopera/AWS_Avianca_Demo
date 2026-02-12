// Datos de ciudades
const destinations = [
  // Colombia
  { name: "Arauca", code: "AUC", country: "Colombia", region: "CO", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-arauca.jpg" },
  { name: "Armenia", code: "AXM", country: "Colombia", region: "CO", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-armenia.png" },
  { name: "Barrancabermeja", code: "EJA", country: "Colombia", region: "CO", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-barrancabermeja.jpg" },
  { name: "Barranquilla", code: "BAQ", country: "Colombia", region: "CO", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-barranquilla.webp" },
  { name: "Bogotá", code: "BOG", country: "Colombia", region: "CO", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-bogota.jpg" },
  { name: "Bucaramanga", code: "BGA", country: "Colombia", region: "CO", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-bucaramanga.jpg" },
  { name: "Cali", code: "CLO", country: "Colombia", region: "CO", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-cali.jpg" },
  { name: "Cartagena de Indias", code: "CTG", country: "Colombia", region: "CO", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-cartagena.jpg" },
  { name: "Cúcuta", code: "CUC", country: "Colombia", region: "CO", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-cucuta.jpg" },
  { name: "Ibagué", code: "IBE", country: "Colombia", region: "CO", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-ibague.jpg" },
  { name: "Ipiales", code: "IPI", country: "Colombia", region: "CO", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-ipiales.jpg" },
  { name: "Leticia", code: "LET", country: "Colombia", region: "CO", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-leticia.jpg" },
  { name: "Medellín", code: "MDE", country: "Colombia", region: "CO", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-medellin.jpg" },
  { name: "Montería", code: "MTR", country: "Colombia", region: "CO", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-monteria.jpg" },
  { name: "Neiva", code: "NVA", country: "Colombia", region: "CO", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-neiva.jpg" },
  { name: "Pasto", code: "PSO", country: "Colombia", region: "CO", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-pasto.jpg" },
  { name: "Pereira", code: "PEI", country: "Colombia", region: "CO", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-pereira.webp" },
  { name: "Popayán", code: "PPN", country: "Colombia", region: "CO", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-popayan.jpg" },
  { name: "Quibdó", code: "UIB", country: "Colombia", region: "CO", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-quibdo.jpg" },
  { name: "Riohacha", code: "RCH", country: "Colombia", region: "CO", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-riohacha.jpg" },
  { name: "San Andrés", code: "ADZ", country: "Colombia", region: "CO", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-sanandres.webp" },
  { name: "Santa Marta", code: "SMR", country: "Colombia", region: "CO", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-santamarta.jpg" },
  { name: "Valledupar", code: "VUP", country: "Colombia", region: "CO", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-valledupar.jpg" },
  { name: "Villavicencio", code: "VVC", country: "Colombia", region: "CO", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-villavicencio.jpg" },
  { name: "Yopal", code: "EYP", country: "Colombia", region: "CO", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-yopal.jpg" },

  // Suramérica
  { name: "Buenos Aires", code: "AEP", country: "Argentina", region: "INT", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-buenos-aires.webp" },
  { name: "Buenos Aires", code: "EZE", country: "Argentina", region: "INT", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-buenos-aires.webp" },
  { name: "Córdoba", code: "COR", country: "Argentina", region: "INT", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-cordoba.jpg" },
  { name: "La Paz", code: "LPB", country: "Bolivia", region: "INT", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-la-paz.jpg" },
  { name: "Santa Cruz de la Sierra", code: "VVI", country: "Bolivia", region: "INT", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-santa-cruz.jpg" },
  { name: "Belém", code: "BEL", country: "Brasil", region: "INT", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-belem.jpg" },
  { name: "Brasilia", code: "BSB", country: "Brasil", region: "INT", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-brasilia.jpg" },
  { name: "Manaos", code: "MAO", country: "Brasil", region: "INT", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-manaos.webp" },
  { name: "Río de Janeiro", code: "GIG", country: "Brasil", region: "INT", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-rio-de-janeiro.jpeg" },
  { name: "São Paulo", code: "GRU", country: "Brasil", region: "INT", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-sao-paulo.png" },
  { name: "Santiago", code: "SCL", country: "Chile", region: "INT", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-santiago.jpg" },
  { name: "Cuenca", code: "CUE", country: "Ecuador", region: "INT", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-cuenca.jpg" },
  { name: "Guayaquil", code: "GYE", country: "Ecuador", region: "INT", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-guayaquil.jpg" },
  { name: "Isla Baltra", code: "GPS", country: "Ecuador", region: "INT", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-isla-baltra.webp" },
  { name: "Manta", code: "MEC", country: "Ecuador", region: "INT", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-manta.jpg" },
  { name: "Quito", code: "UIO", country: "Ecuador", region: "INT", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-quito.webp" },
  { name: "San Cristóbal", code: "SCY", country: "Ecuador", region: "INT", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-san-cristobal.jpg" },
  { name: "Georgetown", code: "GEO", country: "Guyana", region: "INT", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-georgetown.webp" },
  { name: "Asunción", code: "ASU", country: "Paraguay", region: "INT", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-asuncion.jpg" },
  { name: "Cusco", code: "CUZ", country: "Perú", region: "INT", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-cusco.webp" },
  { name: "Lima", code: "LIM", country: "Perú", region: "INT", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-lima.jpg" },
  { name: "Montevideo", code: "MVD", country: "Uruguay", region: "INT", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-montevideo.webp" },
  { name: "Caracas", code: "CCS", country: "Venezuela", region: "INT", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-caracas.webp" },

  // Norteamérica
  { name: "Montreal", code: "YUL", country: "Canadá", region: "INT", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-montreal.jpg" },
  { name: "Toronto", code: "YYZ", country: "Canadá", region: "INT", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-toronto.jpg" },
  { name: "Cancún", code: "CUN", country: "México", region: "INT", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-cancun.jpg" },
  { name: "Ciudad de México", code: "MEX", country: "México", region: "INT", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-ciudad-de-mexico.jpg" },
  { name: "Monterrey", code: "MTY", country: "México", region: "INT", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-monterrey.jpg" },
  { name: "Tulum", code: "TQO", country: "México", region: "INT", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-tulum.jpg" },
  { name: "Boston", code: "BOS", country: "Estados Unidos", region: "INT", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-boston.jpg" },
  { name: "Chicago", code: "ORD", country: "Estados Unidos", region: "INT", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-chicago.jpg" },
  { name: "Dallas", code: "DFW", country: "Estados Unidos", region: "INT", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-dallas.jpg" },
  { name: "Fort Lauderdale", code: "FLL", country: "Estados Unidos", region: "INT", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-fort-lauderdale.jpg" },
  { name: "Houston", code: "IAH", country: "Estados Unidos", region: "INT", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-houston.jpg" },
  { name: "Las Vegas", code: "LAS", country: "Estados Unidos", region: "INT", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-las-vegas.jpg" },
  { name: "Los Ángeles", code: "LAX", country: "Estados Unidos", region: "INT", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-los-angeles.jpg" },
  { name: "Miami", code: "MIA", country: "Estados Unidos", region: "INT", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-miami.jpg" },
  { name: "Nueva York", code: "JFK", country: "Estados Unidos", region: "INT", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-nueva-york.jpg" },
  { name: "Ontario", code: "ONT", country: "Estados Unidos", region: "INT", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-ontario.jpg" },
  { name: "Orlando", code: "MCO", country: "Estados Unidos", region: "INT", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-orlando.jpg" },
  { name: "San Francisco", code: "SFO", country: "Estados Unidos", region: "INT", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-san-francisco.jpg" },
  { name: "Tampa", code: "TPA", country: "Estados Unidos", region: "INT", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-tampa.jpg" },
  { name: "Washington D.C.", code: "IAD", country: "Estados Unidos", region: "INT", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-washington.jpg" },

  // Centroamérica y Caribe
  { name: "Oranjestad", code: "AUA", country: "Aruba", region: "INT", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-oranjestad.jpg" },
  { name: "San José", code: "SJO", country: "Costa Rica", region: "INT", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-san-jose.jpg" },
  { name: "Willemstad", code: "CUR", country: "Curazao", region: "INT", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-willemstad.jpg" },
  { name: "San Salvador", code: "SAL", country: "El Salvador", region: "INT", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-san-salvador.jpg" },
  { name: "Flores", code: "FRS", country: "Guatemala", region: "INT", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-flores.jpg" },
  { name: "Ciudad de Guatemala", code: "GUA", country: "Guatemala", region: "INT", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-ciudad-de-guatemala.jpg" },
  { name: "Comayagua", code: "XPL", country: "Honduras", region: "INT", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-comayagua.jpg" },
  { name: "San Pedro Sula", code: "SAP", country: "Honduras", region: "INT", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-san-pedro-sula.jpg" },
  { name: "Managua", code: "MGA", country: "Nicaragua", region: "INT", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-managua.jpg" },
  { name: "Ciudad de Panamá", code: "PTY", country: "Panamá", region: "INT", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-ciudad-de-panama.jpg" },
  { name: "San Juan", code: "SJU", country: "Puerto Rico", region: "INT", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-san-juan.jpg" },
  { name: "Punta Cana", code: "PUJ", country: "República Dominicana", region: "INT", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-punta-cana.jpg" },
  { name: "Santo Domingo", code: "SDQ", country: "República Dominicana", region: "INT", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-santo-domingo.jpg" },

  // Europa
  { name: "Barcelona", code: "BCN", country: "España", region: "INT", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-barcelona.jpg" },
  { name: "Madrid", code: "MAD", country: "España", region: "INT", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-madrid.jpg" },
  { name: "París", code: "CDG", country: "Francia", region: "INT", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-paris.jpg" },
  { name: "Londres", code: "LHR", country: "Reino Unido", region: "INT", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-londres.jpg" }
];

function generatePriceByCountry(country){

  let min, max;

  switch(country){

    case "Colombia":
      min = 70000;
      max = 220000;
      break;

    case "Argentina":
    case "Bolivia":
    case "Brasil":
    case "Chile":
    case "Ecuador":
    case "Guyana":
    case "Paraguay":
    case "Perú":
    case "Uruguay":
    case "Venezuela":
      min = 450000;
      max = 950000;
      break;

    case "Costa Rica":
    case "El Salvador":
    case "Guatemala":
    case "Honduras":
    case "Nicaragua":
    case "Panamá":
    case "Aruba":
    case "Curazao":
    case "Puerto Rico":
    case "República Dominicana":
      min = 700000;
      max = 1400000;
      break;

    case "Estados Unidos":
    case "Canadá":
    case "México":
      min = 900000;
      max = 2200000;
      break;

    case "España":
    case "Francia":
    case "Reino Unido":
      min = 2800000;
      max = 5500000;
      break;

    default:
      min = 500000;
      max = 1000000;
  }

  return Math.floor(Math.random() * (max - min) + min);
}


// Cargar selector de origen en la página de ofertas
function loadOriginSelector() {

  const select = document.getElementById("originSelector");

  destinations
    .filter(city => city.country === "Colombia")
    .forEach(city => {

      const option = document.createElement("option");
      option.value = city.name;
      option.textContent = city.name;

      if(city.name === "Bogotá"){
        option.selected = true;
      }

      select.appendChild(option);
    });

}


// Cargar selector de país en la página de ofertas
function loadCountrySelector() {

  const selector = document.getElementById("countrySelector");

  // Obtener países únicos
  const countries = [...new Set(destinations.map(d => d.country))];

  countries.sort(); // opcional, orden alfabético

  countries.forEach(country => {
    const option = document.createElement("option");
    option.value = country;
    option.textContent = country;
    selector.appendChild(option);
  });

}

const internationalHubs = ["Bogotá", "Medellín", "Cali"];

// Renderizar ofertas según ciudad de origen y país seleccionado
function renderOffers(selectedOrigin, selectedCountry){

  const grid = document.getElementById("offersGrid");
  grid.innerHTML = "";

  const filtered = destinations.filter(city => {

    if(city.name === selectedOrigin) return false;

    if(city.region === "INT" && !internationalHubs.includes(selectedOrigin)){
      return false;
    }

    if(selectedCountry && selectedCountry !== "ALL"){
      if(city.country !== selectedCountry) return false;
    }

    return true;
  });


  filtered.forEach(city => {

    const card = document.createElement("div");
    const price = generatePriceByCountry(city.country);

    card.className = "offer-card";

    card.innerHTML = `
      <div class="offer-image"
           style="background-image:url('${city.image}')">
      </div>

      <div class="offer-info">
        <div>
          <h4>${city.name}</h4>
          <h5>${city.country}</h5>
          <p>Por trayecto desde</p>
        </div>

        <div>
          <span class="badge">Acumula millas</span>
          <strong>COP ${price.toLocaleString("es-CO")}</strong>
        </div>
      </div>
    `;

    grid.appendChild(card);

  });

}

// Inicialización de la página de ofertas
document.addEventListener("DOMContentLoaded", () => {

  loadOriginSelector();
  loadCountrySelector();

  const originSelector = document.getElementById("originSelector");
  const countrySelector = document.getElementById("countrySelector");
  const originLabel = document.getElementById("originCityLabel");

  function updateOffers(){
    renderOffers(originSelector.value, countrySelector.value);
  }

  originSelector.addEventListener("change", () => {
    originLabel.textContent = originSelector.value;
    updateOffers();
  });

  countrySelector.addEventListener("change", updateOffers);

  updateOffers();
});
