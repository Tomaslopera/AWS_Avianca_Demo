document.addEventListener("DOMContentLoaded", () => {

  // 1️⃣ Obtener ciudad desde la URL
  const params = new URLSearchParams(window.location.search);
  const cityName = params.get("city");

  if (!cityName) return;

  // 2️⃣ Buscar ciudad en el array global destinations
  const cityData = destinations.find(c => c.name === cityName);

  if (!cityData) return;

  // 3️⃣ Cambiar título grande blanco
  const title = document.getElementById("destinationTitle");
  title.textContent = cityData.name;

  // 4️⃣ Cambiar imagen de fondo
  const heroBackground = document.querySelector(".hero-background");
  heroBackground.style.backgroundImage = `url('${cityData.image}')`;
  heroBackground.style.backgroundSize = "cover";
  heroBackground.style.backgroundPosition = "center";

  // 5️⃣ Autocompletar campo destino
  const destinationInput = document.getElementById("destinationInput");
  if (destinationInput) {
    destinationInput.value = `${cityData.name} (${cityData.code})`;
  }

});

