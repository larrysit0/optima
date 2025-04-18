document.addEventListener("DOMContentLoaded", () => {
    const sendButton = document.getElementById("sendAlert");
    const messageBox = document.getElementById("messageBox");
    const statusMsg = document.getElementById("statusMsg");

    // Habilitar o deshabilitar el botón según el contenido
    messageBox.addEventListener("input", () => {
        const text = messageBox.value.trim();
        sendButton.disabled = text.length < 4 || text.length > 250;
    });

    sendButton.addEventListener("click", () => {
        const message = messageBox.value.trim();

        if (message.length < 4 || message.length > 250) {
            statusMsg.textContent = "⚠️ El mensaje debe tener entre 4 y 250 caracteres.";
            return;
        }

        statusMsg.textContent = "🔄 Enviando alerta...";

        // Obtener ubicación
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    sendData(message, latitude, longitude);
                },
                (error) => {
                    console.warn("Ubicación no disponible:", error);
                    sendData(message, null, null);
                }
            );
        } else {
            sendData(message, null, null);
        }
    });

    function sendData(message, lat, lon) {
        fetch("http://localhost:5000/api/alert", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                mensaje: message,
                latitud: lat,
                longitud: lon
            }),
        })
        .then((res) => res.json())
        .then((data) => {
            statusMsg.textContent = "✅ " + data.mensaje;
            messageBox.value = "";
            sendButton.disabled = true;
        })
        .catch((error) => {
            console.error("Error:", error);
            statusMsg.textContent = "❌ No se pudo enviar la alerta.";
        });
    }
});
