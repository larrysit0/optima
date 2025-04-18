const messageInput = document.getElementById('emergencyMessage');
const sendButton = document.getElementById('sendAlert');
const status = document.getElementById('status');

messageInput.addEventListener('input', () => {
  const text = messageInput.value.trim();
  sendButton.disabled = text.length < 4 || text.length > 250;
});

sendButton.addEventListener('click', () => {
  const message = messageInput.value.trim();

  if (message.length < 4 || message.length > 250) {
    status.textContent = 'Tu mensaje debe tener entre 4 y 250 caracteres.';
    return;
  }

  if (!navigator.geolocation) {
    status.textContent = 'Geolocalización no soportada por tu navegador.';
    return;
  }

  status.textContent = 'Obteniendo tu ubicación...';

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      // Aquí puedes enviar esta información a tu servidor o bot
      console.log('Mensaje:', message);
      console.log('Latitud:', lat, 'Longitud:', lon);

      status.textContent = '🚨 Alerta enviada con éxito.';
      messageInput.value = '';
      sendButton.disabled = true;
    },
    (error) => {
      console.error(error);
      status.textContent = 'No se pudo obtener la ubicación.';
    }
  );
});
