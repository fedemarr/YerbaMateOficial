let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function actualizarCarritoDOM() {
    const lista = document.getElementById("lista-carrito");
    const totalElem = document.getElementById("total-carrito");
    if (!lista) return;

    lista.innerHTML = "";
    let total = 0;

    carrito.forEach(item => {
        const li = document.createElement("li");

       const img = document.createElement("img");
       img.src = item.img;
       img.alt = item.nombre;
       img.width = 60;
       img.height = 60;
       img.style.objectFit = "cover";
       img.style.borderRadius = "6px";

        const texto = document.createTextNode(` ${item.nombre} x${item.cantidad} - $${item.precio}`);

        li.appendChild(img);
        li.appendChild(texto);
        lista.appendChild(li);

        total += item.precio * item.cantidad;
    });

    totalElem.textContent = total;
}


function vaciarCarrito() {
    carrito = [];
    localStorage.removeItem("carrito");
    actualizarCarritoDOM();
}

function finalizarCompra() {
    if (carrito.length === 0) {
        alert("El carrito está vacío");
        return;
    }

    let mensaje = "¡Hola! Quiero comprar los siguientes productos:\n";
    carrito.forEach(item => {
        mensaje += `- ${item.nombre} x${item.cantidad} ($${item.precio})\n`;
    });

    const numero = "5491112345678";
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank");
}

document.addEventListener("DOMContentLoaded", actualizarCarritoDOM);
