// ==========================
// Carrito en memoria
// ==========================
let carrito = [];

// ==========================
// Función para agregar productos
// ==========================
function agregarCarrito(nombre, precio) {
    const item = carrito.find(p => p.nombre === nombre);
    if (item) {
        item.cantidad += 1;
    } else {
        carrito.push({ nombre, precio, cantidad: 1 });
    }
    console.log("Carrito:", carrito);
    actualizarCarritoDOM(); // Solo si estás en carrito.html
}

// ==========================
// Función para vaciar carrito
// ==========================
function vaciarCarrito() {
    carrito = [];
    actualizarCarritoDOM();
}

// ==========================
// Función para enviar carrito por WhatsApp
// ==========================
function enviarCarritoWhatsApp() {
    if (carrito.length === 0) {
        alert("El carrito está vacío");
        return;
    }

    let mensaje = "¡Hola! Quiero comprar los siguientes productos:\n";
    carrito.forEach(item => {
        mensaje += `- ${item.nombre} x${item.cantidad} ($${item.precio})\n`;
    });

    const numero = "5491112345678"; // Cambiar por tu número
    const esMovil = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    const url = esMovil
        ? `whatsapp://send?phone=${numero}&text=${encodeURIComponent(mensaje)}`
        : `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;

    window.open(url, "_blank");
}

// ==========================
// Función para mostrar carrito en carrito.html
// ==========================
function actualizarCarritoDOM() {
    const lista = document.getElementById("lista-carrito");
    if (!lista) return; // Si no estamos en carrito.html, salimos

    lista.innerHTML = ""; // Limpiar lista

    carrito.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.nombre} x${item.cantidad} - $${item.precio}`;
        lista.appendChild(li);
    });
}
