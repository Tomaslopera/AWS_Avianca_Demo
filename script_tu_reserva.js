document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("reservationForm");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const code = document.getElementById("reservationCode").value.trim();
    const identification = document.getElementById("identification").value.trim();

    if (!code || !identification) {
      alert("Por favor completa todos los campos");
      return;
    }

    // Simulación de búsqueda
    console.log("Buscando reserva:", code, lastName);

    document.getElementById("reservationResult")
      .classList.remove("hidden");

  });

});
