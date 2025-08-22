// ==========================
// Vincular botones de productos
// ==========================
document.addEventListener("DOMContentLoaded", () => {
    const botones = document.querySelectorAll(".agregar");

    botones.forEach(boton => {
        boton.addEventListener("click", () => {
            const nombre = boton.dataset.nombre;
            const precio = parseFloat(boton.dataset.precio);
            const img = boton.dataset.img;

            agregarCarrito(nombre, precio, img);
            alert(`${nombre} agregado al carrito ✅`);
        });
    });
});
