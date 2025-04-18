const textarea = document.getElementById('descripcion');
const boton = document.getElementById('btnEmergencia');

// Activar botón cuando hay 4+ caracteres
textarea.addEventListener('input', () => {
  const texto = textarea.value.trim();
  if (texto.length >= 4 && texto.length <= 300) {
    boton.disabled = false;
    boton.classList.add('enabled');
  } else {
    boton.disabled = true;
    boton.classList.remove('enabled');
  }
});

// Enviar alerta
boton.addEventListener('click', () => {
  const descripcion = textarea.value.trim();

  if (!navigator.geolocation) {
    alert("Geolocalización no disponible.");
    return;
  }

  boton.disabled = true;
  boton.textContent = "Enviando...";

  navigator.geolocation.getCurrentPosition(position => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    // Puedes reemplazar esto con una llamada al servidor o al bot
    console.log({
      tipo: 'alerta_roja',
      descripcion,
      ubicacion: { latitud: lat, longitud: lon }
    });

    alert("✅ Alerta enviada:\n" + descripcion + 
          "\nLatitud: " + lat + "\nLongitud: " + lon);

    // Reiniciar
    textarea.value = '';
    boton.disabled = true;
    boton.classList.remove('enabled');
    boton.textContent = "🚨 Enviar Alerta Roja";

  }, error => {
    alert("No se pudo obtener la ubicación: " + error.message);
    boton.disabled = false;
    boton.textContent = "🚨 Enviar Alerta Roja";
  });
});
