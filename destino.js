document.addEventListener("DOMContentLoaded", () => {

  const params = new URLSearchParams(window.location.search);
  const cityNameParam = params.get("city");

  if (!cityNameParam) return;

  const cityName = decodeURIComponent(cityNameParam).trim();

  if (typeof destinations === "undefined") {
    console.error("destinations no está definido");
    return;
  }

  const cityData = destinations.find(c =>
    c.name.toLowerCase() === cityName.toLowerCase()
  );

  if (!cityData) {
    console.warn("Ciudad no encontrada:", cityName);
    return;
  }

  const title = document.getElementById("destinationTitle");
  if (title) {
    title.textContent = cityData.name;
  }

  const heroBackground = document.querySelector(".city-destination-hero .hero-background");
  if (heroBackground && cityData.image) {
    heroBackground.style.backgroundImage = `url('${cityData.image}')`;
    heroBackground.style.backgroundSize = "cover";
    heroBackground.style.backgroundPosition = "center";
  }

  const destinationInput = document.getElementById("destinationInput");
  if (destinationInput) {
    destinationInput.value = `${cityData.name} (${cityData.code})`;
  }

  const tourismGrid = document.getElementById("tourismGrid");

  tourismData[cityData.name].forEach(place => {

    const card = document.createElement("div");
    card.className = "tourism-card";

    // 👇 La imagen ahora va en el card, no en un div interno
    card.style.backgroundImage = `url('${place.image}')`;

    card.innerHTML = `
      <div class="tourism-overlay"></div>

      <div class="tourism-content">
        <h4>${place.name}</h4>
        <p>${place.description}</p>
      </div>
    `;

    tourismGrid.appendChild(card);
  });


});
