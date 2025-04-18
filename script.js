// main.js
const sendButton = document.getElementById("sendAlert");
const messageBox = document.getElementById("messageBox");
const statusMsg = document.getElementById("statusMsg");

// Habilitar/deshabilitar botón
messageBox.addEventListener("input", () => {
    const text = messageBox.value.trim();
    if (text.length >= 4 && text.length <= 300) {
        sendButton.disabled = false;
        sendButton.classList.add("enabled");
    } else {
        sendButton.disabled = true;
        sendButton.classList.remove("enabled");
    }
});

// Evento al hacer clic en el botón
sendButton.addEventListener("click", () => {
    const message = messageBox.value.trim();

    if (message.length < 4 || message.length > 300) {
        statusMsg.textContent = "⚠️ El mensaje debe tener entre 4 y 300 caracteres.";
        return;
    }

    statusMsg.textContent = "🔄 Enviando alerta...";
    sendButton.disabled = true;
    sendButton.textContent = "Enviando...";

    if (!navigator.geolocation) {
        statusMsg.textContent = "❌ No se puede acceder a la ubicación.";
        resetButton();
        return;
    }

    navigator.geolocation.getCurrentPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            sendData(message, latitude, longitude);
        },
        (error) => {
            statusMsg.textContent = "❌ Error de geolocalización: " + error.message;
            resetButton();
        }
    );
});

function sendData(message, lat, lon) {
    fetch('/api/alert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            tipo: 'alerta_roja',
            descripcion: message,
            ubicacion: {
                latitud: lat,
                longitud: lon
            }
        })
    })
    .then(response => response.json())
    .then(data => {
        statusMsg.textContent = "✅ Alerta enviada con éxito.";
        messageBox.value = "";
        sendButton.classList.remove("enabled");
        resetButton();
    })
    .catch(error => {
        console.error(error);
        statusMsg.textContent = "❌ Error al enviar la alerta.";
        resetButton();
    });
}

function resetButton() {
    sendButton.disabled = true;
    sendButton.textContent = "🚨 Enviar Alerta Roja";
}
