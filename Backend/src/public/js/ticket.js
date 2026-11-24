const ticket = document.getElementById("ticket");
        const nombreCliente = sessionStorage.getItem("nombreCliente");
        const ventaRegistrada = JSON.parse(sessionStorage.getItem("ventaRegistrada"));
        if (!ventaRegistrada) {
            alert("No se encontraron los datos de la venta.");
            window.location.href = "carrito.html";
        } else {
            ticket.innerHTML = `
                <p class="nombreEmpresaTicket">Technox</p>
                <p class="nombreClienteTicket">Cliente: ${ventaRegistrada.nombre_cliente}</p>
                <p>Número de venta: ${ventaRegistrada.id}</p>
                <p>Fecha: ${new Date().toLocaleString("es-AR")}</p>
            `;

            let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

            carrito.forEach(producto => {
                const subtotal = producto.precio * producto.cantidad;

                ticket.innerHTML += `
                    <div class="productoTicket">
                        <p>${producto.nombre}</p>
                        <p>(${producto.cantidad})</p>
                        <p>$${producto.precio}</p>
                        <p>$${subtotal}</p>
                    </div>
                `;
            });

            ticket.innerHTML += `
                <p class="totalTicket">
                    TOTAL: $${ventaRegistrada.total}
                </p>
            `;
        }





        function descargarPDF() {
            const ticket = document.getElementById("ticket");

            const opciones = {
                margin: 10,
                filename: "ticket-technox.pdf",
                image: {
                    type: "jpeg",
                    quality: 0.98
                },
                html2canvas: {
                    scale: 2
                },
                jsPDF: {
                    unit: "mm",
                    format: "a4",
                    orientation: "portrait"
                }
            };

            html2pdf().set(opciones).from(ticket).save();
        }


        function salir() {

            localStorage.removeItem("carrito");
            sessionStorage.removeItem("nombreCliente");
            sessionStorage.removeItem("ventaRegistrada");

            window.location.href = "/dashboard/indexCliente";
        }