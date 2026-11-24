
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
                    <div class="card-producto-carrito">
                        <div class="div-img-carrito">
                            <img class="card-img" src="${producto.imagen}" alt="${producto.nombre}">
                        </div>
                        <div class="descrip-carrito-card">
                            <h3>${producto.nombre}</h3>
                            <p>Precio: $${producto.precio}</p>
                            <p>Cantidad</p>

                            <div class="botonesMasYMenos">
                                <button class="botonCarritoMenos" onclick="cambiarCantidad(${producto.id}, -1)">-</button>
                                ${producto.cantidad}
                                <button class="botonCarritoMas" onclick="cambiarCantidad(${producto.id}, 1)">+</button>
                            </div>
                                <button class="botonCarritoLogoEliminar claro" onclick="eliminarProducto(${producto.id})"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="24px" width="24px" fill="currentColor"><path d="M7,21q-0.82,0-1.41-0.59T5,19V6H4V4H9V3h6V4h5V6H19V19q0,0.82-0.59,1.41T17,21H7ZM17,6H7V19H17V6ZM9,17h2V8H9v9Zm4,0h2V8H13v9ZM7,6V19V6Z"/></svg></button>
                            <p>Subtotal: $${subtotal}</p>    
                        </div>
                    </div>
                `;
            });

            contenedorCarrito.innerHTML = html;
            if (totalCarrito) {
                totalCarrito.innerHTML = `
                                        <div class="totalCarrito">
                                            <p>Total: $${total}</p>
                                            <button id="botonComprar">Comprar</button>`
                                            
            }

            const botonComprar = document.getElementById("botonComprar");
            botonComprar.addEventListener("click", (event) => {
                event.preventDefault();
                mostrarTicket();
            })
        }

        function cambiarCantidad(id, cambio) {
            let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

            let producto = carrito.find(p => p.id == id);

            if (producto) {
                producto.cantidad += cambio;

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
        async function mostrarTicket() {
            const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
            const nombreCliente = sessionStorage.getItem("nombreCliente");

            if (!nombreCliente) {
                alert("No se encontró el nombre del cliente.");
                return;
            }

            if (carrito.length === 0) {
                alert("El carrito está vacío.");
                return;
            }

            try {
                const respuesta = await fetch("http://localhost:3001/api/sales", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        nombre_cliente: nombreCliente,
                        productos: carrito.map(producto => ({
                            id: producto.id,
                            cantidad: producto.cantidad
                        }))
                    })
                });

                const datos = await respuesta.json();

                if (!respuesta.ok) {
                    alert(datos.mensaje || "No se pudo registrar la venta.");
                    return;
                }

                sessionStorage.setItem(
                    "ventaRegistrada",
                    JSON.stringify(datos.payload)
                );

                window.location.href = "/dashboard/ticket";

            } catch (error) {
                console.error("Error al registrar la venta:", error);
                alert("No se pudo conectar con el servidor. Intentá nuevamente.");
            }
        }


        mostrarCarrito();