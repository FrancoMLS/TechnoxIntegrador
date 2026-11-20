const urlBase = "http://localhost:3001";
    const contenedorProductos = document.getElementById("contenedorProductos");
    let productosCargados = [];
    const nombre = sessionStorage.getItem('nombreCliente');
    
    document.getElementById('nombre-usuario').textContent = nombre || 'invitado';

    function mostrarError(mensaje) {
        contenedorProductos.innerHTML = `
            <p class="mensaje error">${mensaje}</p>
        `;
    }

    async function obtenerProductos() {
        try {
            const response = await fetch(`${urlBase}/api/products`);

            console.log(response);

            const data = await response.json();

            if (!response.ok) {
                console.log(data.mensaje);
                return mostrarError(data.mensaje);
            }

            productosCargados = data.payload;
            console.log("Categorías encontradas:", productosCargados.map(producto => producto.categoria));
            console.log("Productos funda:", productosCargados.filter(p => p.categoria === "funda"));

            renderizarProductos(productosCargados);

        } catch (error) {
            console.error("Error al obtener productos: ", error);
            return mostrarError("Error de conexión con el servidor");
        }
    }

    
    function renderizarProductos(array) {
        let htmlProductos = "";

        array.forEach(producto => {
            htmlProductos += `
                <div class="card-producto">
                    <img class="card-img" src="${producto.imagen}" alt="${producto.nombre}">
                    <h4>${producto.nombre}</h4>
                    
                    <p>$${producto.precio}</p>

                    <button class="btn-agregar"
                        onclick="agregarAlCarrito(${producto.id})">
                        + Agregar al carrito
                    </button>
                </div>
            `;
        });

        contenedorProductos.innerHTML = htmlProductos;
    }

    function agregarAlCarrito(id) {
        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

        const producto = productosCargados.find(p => p.id == id);

        if (!producto) {
            alert("No se encontró el producto.");
            return;
        }

        const productoExistente = carrito.find(p => p.id == id);

        if (productoExistente) {
            productoExistente.cantidad++;
        } else {
            carrito.push({
                id: producto.id,
                nombre: producto.nombre,
                precio: producto.precio,
                imagen: producto.imagen,
                categoria: producto.categoria,
                cantidad: 1
            });
        }

        localStorage.setItem("carrito", JSON.stringify(carrito));

        window.location.href = "/dashboard/carrito";
    }


    function filtrarCategoria(categoria) {

    let termino = categoria.toLowerCase().includes("celular")
        ? "celular"
        : "funda";

    const productosFiltrados = productosCargados.filter(producto =>
        producto.categoria.toLowerCase().includes(termino)
    );
    

    if (productosFiltrados.length === 0) {
        contenedorProductos.innerHTML = "<p>No hay productos en esta categoría.</p>";
        return;
    }

    renderizarProductos(productosFiltrados);
}

    obtenerProductos();