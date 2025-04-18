// 📡 Este archivo enviará una petición al backend en Python para hacer la llamada

// Asignamos botones por ID
const btnWithLocation = document.getElementById("alertWithLocation");
const btnWithoutLocation = document.getElementById("alertWithoutLocation");
const statusMsg = document.getElementById("statusMsg");

// Función para enviar petición POST al servidor
function sendAlert(type) {
    // Cambiamos el estado visual
    statusMsg.textContent = "🔄 Enviando alerta al servidor...";

    fetch("http://localhost:5000/api/alert", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ tipo: type }),
    })
    .then((res) => res.json())
    .then((data) => {
        statusMsg.textContent = "✅ " + data.mensaje;
    })
    .catch((error) => {
        console.error("Error:", error);
        statusMsg.textContent = "❌ Error al contactar con el servidor.";
    });
}

// ⏺️ Eventos de clic
btnWithLocation.addEventListener("click", () => sendAlert("con_ubicacion"));
btnWithoutLocation.addEventListener("click", () => sendAlert("sin_ubicacion"));
