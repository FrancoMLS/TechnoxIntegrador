const contenedorCarrito = document.getElementById("contenedorCarrito");
        const totalCarrito = document.getElementById("totalCarrito");

        function mostrarCarrito() {
            let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

            if (carrito.length === 0) {
                contenedorCarrito.innerHTML = "<p>Tu carrito está vacío.</p>";
                totalCarrito.innerHTML = "";
                return;
            }

            let html = "";
            let total = 0;

            carrito.forEach(producto => {
                let subtotal = producto.precio * producto.cantidad;
                total += subtotal;

                html += `
                    <div class="card-producto">
                        <img class="card-img" src="${producto.imagen}" alt="${producto.nombre}">
                        <h3>${producto.nombre}</h3>
                        <p>Precio: $${producto.precio}</p>
                        <p>Cantidad: ${producto.cantidad}</p>
                        <p>Subtotal: $${subtotal}</p>

                        <button onclick="cambiarCantidad(${producto.id}, -1)">-</button>
                        <button onclick="cambiarCantidad(${producto.id}, 1)">+</button>
                        <button onclick="eliminarProducto(${producto.id})">Eliminar</button>
                    </div>
                `;
            });

            contenedorCarrito.innerHTML = html;
            totalCarrito.innerHTML = "Total: $" + total;
        }

        function cambiarCantidad(id, cambio) {
            let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

            let producto = carrito.find(p => p.id == id);

            if (producto) {
                producto.cantidad = Number(producto.cantidad) + Number(cambio);

                if (producto.cantidad <= 0) {
                    carrito = carrito.filter(p => p.id != id);
                }
            }

            localStorage.setItem("carrito", JSON.stringify(carrito));
            mostrarCarrito();
        }

        function eliminarProducto(id) {
            let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

            carrito = carrito.filter(p => p.id != id);

            localStorage.setItem("carrito", JSON.stringify(carrito));
            mostrarCarrito();
        }

        mostrarCarrito();