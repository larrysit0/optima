const textarea = document.getElementById("mensaje");
const boton = document.getElementById("boton-alerta");
const estado = document.getElementById("estado");

textarea.addEventListener("input", () => {
  const texto = textarea.value.trim();
  boton.disabled = texto.length < 4;
});

boton.addEventListener("click", () => {
  const mensaje = textarea.value.trim();

  if (mensaje.length < 4) {
    estado.textContent = "Por favor, escribe una emergencia válida.";
    return;
  }

  estado.textContent = "Obteniendo ubicación...";

  if (!navigator.geolocation) {
    estado.textContent = "Tu navegador no soporta geolocalización.";
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;

      // Aquí se simula el envío del mensaje
      console.log("Mensaje:", mensaje);
      console.log("Latitud:", lat);
      console.log("Longitud:", lon);

      estado.textContent = "🚨 Emergencia enviada con ubicación.";

      // Reset
      textarea.value = "";
      boton.disabled = true;
    },
    (err) => {
      console.error(err);
      estado.textContent = "Error obteniendo la ubicación.";
    }
  );
});
