const textarea = document.getElementById('descripcion');
const boton = document.getElementById('btnEmergencia');

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

boton.addEventListener('click', () => {
  const descripcion = textarea.value.trim();

  if (!navigator.geolocation) {
    alert("Tu navegador no permite acceder a la ubicación.");
    return;
  }

  boton.disabled = true;
  boton.textContent = "Enviando...";

  navigator.geolocation.getCurrentPosition(position => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    fetch('/api/alert', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tipo: 'alerta_roja',
        descripcion,
        ubicacion: {
          latitud: lat,
          longitud: lon
        }
      })
    })
    .then(response => response.json())
    .then(data => {
      alert('✅ Alerta enviada con ubicación');
      textarea.value = '';
      boton.disabled = true;
      boton.classList.remove('enabled');
      boton.textContent = "Enviar Alerta Roja";
    })
    .catch(error => {
      alert('❌ Error al enviar la alerta');
      console.error(error);
      boton.disabled = false;
      boton.textContent = "Enviar Alerta Roja";
    });

  }, error => {
    alert("No se pudo obtener la ubicación: " + error.message);
    boton.disabled = false;
    boton.textContent = "Enviar Alerta Roja";
  });
});
