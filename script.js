const textarea = document.getElementById("mensaje");
const boton = document.getElementById("boton-emergencia");
const estado = document.getElementById("estado");

textarea.addEventListener("input", () => {
  const texto = textarea.value.trim();
  boton.disabled = texto.length < 4;
});

boton.addEventListener("click", () => {
  const texto = textarea.value.trim();

  if (texto.length < 4) {
    estado.textContent = "Por favor, escribe al menos 4 caracteres.";
    return;
  }

  estado.textContent = "Obteniendo ubicación...";

  if (!navigator.geolocation) {
    estado.textContent = "Geolocalización no disponible en este navegador.";
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;

      console.log("Mensaje:", texto);
      console.log("Ubicación:", lat, lon);

      estado.textContent = `🚨 Emergencia enviada con ubicación.\nLat: ${lat}, Lon: ${lon}`;

      textarea.value = "";
      boton.disabled = true;
    },
    (err) => {
      console.error(err);
      estado.textContent = "No se pudo obtener la ubicación.";
    }
  );
});
