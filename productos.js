let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

document.querySelectorAll(".agregar").forEach(btn => {
    btn.addEventListener("click", () => {
        const nombre = btn.dataset.nombre;
        const precio = parseFloat(btn.dataset.precio);
        const img = btn.dataset.img;

        const item = carrito.find(p => p.nombre === nombre);
        if (item) {
            item.cantidad += 1;
        } else {
            carrito.push({ nombre, precio, cantidad: 1, img });
        }

        localStorage.setItem("carrito", JSON.stringify(carrito));
        alert(`${nombre} agregado al carrito`);
    });
});
