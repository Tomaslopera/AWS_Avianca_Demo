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

  // Estados Unidos
  { name: "Miami", code: "MIA", country: "Estados Unidos", region: "NA", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-yopal.jpg" },
  { name: "Nueva York", code: "JFK", country: "Estados Unidos", region: "NA", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-yopal.jpg" },
  { name: "Los Ángeles", code: "LAX", country: "Estados Unidos", region: "NA", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-yopal.jpg" },
  { name: "Chicago", code: "ORD", country: "Estados Unidos", region: "NA", image: "https://d1cq6wgq3znilx.cloudfront.net/images/cities/image-yopal.jpg" }
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

// Renderizar ofertas según ciudad de origen y país seleccionado
function renderOffers(selectedOrigin, selectedCountry){

  const grid = document.getElementById("offersGrid");
  grid.innerHTML = "";

  const filtered = destinations.filter(city => {

    // Excluir ciudad origen
    if(city.name === selectedOrigin) return false;

    // Filtrar por país
    if(selectedCountry && city.country !== selectedCountry) return false;

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
