const btnWithLocation = document.getElementById("alertWithLocation");
const btnWithoutLocation = document.getElementById("alertWithoutLocation");
const statusMsg = document.getElementById("statusMsg");
const descriptionField = document.getElementById("emergencyDescription");

// 🧠 Escuchamos cambios en el texto para activar los botones
descriptionField.addEventListener("input", () => {
    const isNotEmpty = descriptionField.value.trim().length > 0;
    btnWithLocation.disabled = !isNotEmpty;
    btnWithoutLocation.disabled = !isNotEmpty;
});

// 🚨 Función para enviar el tipo de alerta
function sendAlert(type) {
    const description = descriptionField.value.trim();
    if (!description) return;

    statusMsg.textContent = "🔄 Enviando alerta al servidor...";

    fetch("http://localhost:5000/api/alert", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            tipo: type,
            descripcion: description
        }),
    })
    .then((res) => res.json())
    .then((data) => {
        statusMsg.textContent = "✅ Alerta enviada correctamente.";
        descriptionField.value = "";
        btnWithLocation.disabled = true;
        btnWithoutLocation.disabled = true;
    })
    .catch((err) => {
        console.error("Error:", err);
        statusMsg.textContent = "❌ Error al enviar la alerta.";
    });
}

// 🎯 Asignamos eventos a los botones
btnWithLocation.addEventListener("click", () => sendAlert("con_ubicacion"));
btnWithoutLocation.addEventListener("click", () => sendAlert("sin_ubicacion"));
