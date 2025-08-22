// ==========================
// Carrito en memoria + localStorage
// ==========================
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Guardar en localStorage
function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// ==========================
// Agregar producto (con imagen)
// ==========================
function agregarCarrito(nombre, precio, img) {
    const item = carrito.find(p => p.nombre === nombre);
    if (item) {
        item.cantidad += 1;
    } else {
        carrito.push({ nombre, precio, img, cantidad: 1 });
    }
    guardarCarrito();
    actualizarCarritoDOM(); // Solo si estamos en carrito.html
}

// ==========================
// Vaciar carrito
// ==========================
function vaciarCarrito() {
    carrito = [];
    guardarCarrito();
    actualizarCarritoDOM();
}

// ==========================
// Enviar por WhatsApp
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

    const numero = "5491112345678"; // tu número real
    const esMovil = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    const url = esMovil
        ? `whatsapp://send?phone=${numero}&text=${encodeURIComponent(mensaje)}`
        : `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;

    window.open(url, "_blank");
}

// ==========================
// Mostrar carrito (con imagen)
// ==========================
function actualizarCarritoDOM() {
    const lista = document.getElementById("lista-carrito");
    if (!lista) return; 

    lista.innerHTML = "";

    carrito.forEach(item => {
        const li = document.createElement("li");
        li.innerHTML = `
            <img src="${item.img}" alt="${item.nombre}" 
                 style="width:60px; height:auto; border-radius:6px; margin-right:10px;">
            <span>${item.nombre} x${item.cantidad} - $${item.precio}</span>
        `;
        lista.appendChild(li);
    });
}

// ==========================
// Al cargar carrito.html → mostrar carrito
// ==========================
document.addEventListener("DOMContentLoaded", actualizarCarritoDOM);
