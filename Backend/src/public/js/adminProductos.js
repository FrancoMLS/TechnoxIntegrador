 const urlBase = "http://localhost:3001";
    let activoProductoModificar = true;
    const contenedorProductos = document.getElementById("contenedorProductosAdmin");
    const formBusquedaId = document.getElementById("formBusquedaId");
    const botonAgregar = document.querySelector(".botonAgregar");
    const formularioAgregar = document.getElementById("formularioAgregarProducto");
    const botonCancelarAgregar = document.getElementById("cancelarAgregar");
    const botonDescargar = document.getElementById('descargarVentas')


    botonAgregar.addEventListener("click", () => {
        formularioAgregar.style.display = "block";
    });

    botonCancelarAgregar.addEventListener("click", () => {
        formularioAgregar.style.display = "none";
    });
    const botonCancelarModificar = document.getElementById("cancelarModificar");

    botonCancelarModificar.addEventListener("click", () => {
        document.getElementById("formularioModificarProducto").style.display = "none";
    });
    const formNuevoProducto = document.getElementById("formNuevoProducto");

    formNuevoProducto.addEventListener("submit", async (event) => {
        event.preventDefault();

        const nuevoProducto = {
            nombre: document.getElementById("nombreProducto").value.trim(),
            precio: Number(document.getElementById("precioProducto").value),
            imagen: document.getElementById("imagenProducto").value.trim(),
            categoria: document.getElementById("categoriaProducto").value,
            activo: true
        };

        try {
            const respuesta = await fetch(`${urlBase}/api/products`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(nuevoProducto)
            });

            const data = await respuesta.json();

            if (!respuesta.ok) {
                alert(data.mensaje || "No se pudo agregar el producto");
                return;
            }

            alert("¡Producto agregado correctamente!");

            formNuevoProducto.reset();
            formularioAgregar.style.display = "none";

            obtenerProductos();

        } catch (error) {
            console.error(error);
            alert("Error al conectar con el servidor");
        }
    });

// FORMULARIO PARA MODIFICAR PRODUCTOS

const formModificarProducto = document.getElementById("formModificarProducto");

formModificarProducto.addEventListener("submit", async (event) => {
    event.preventDefault();

    const productoModificado = {
        id: Number(document.getElementById("idModificar").value),
        nombre: document.getElementById("nombreModificar").value.trim(),
        precio: Number(document.getElementById("precioModificar").value),
        categoria: document.getElementById("categoriaModificar").value,
        imagen: document.getElementById("imagenModificar").value.trim(),
        activo: activoProductoModificar
    };

    try {
        const respuesta = await fetch(`${urlBase}/api/products`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(productoModificado)
        });

        const data = await respuesta.json();

        if (!respuesta.ok) {
            alert(data.mensaje || "No se pudo modificar el producto");
            return;
        }

        alert("¡Producto modificado correctamente!");

        formModificarProducto.reset();
        document.getElementById("formularioModificarProducto").style.display = "none";

        obtenerProductos();

    } catch (error) {
        console.error(error);
        alert("Error al conectar con el servidor");
    }
});
    

    function mostrarError(mensaje) {
        contenedorProductos.innerHTML = `
            <p class="mensaje error">${mensaje}</p>
        `;
    }
    async function cambiarEstadoProducto(id, activo) {
        const estaActivo = Number(activo) === 1;

        const accion = estaActivo ? "dar de baja" : "reactivar";

        const confirmar = confirm(`¿Estás seguro de que querés ${accion} este producto?`);

        if (!confirmar) {
            return;
        }

        const ruta = estaActivo
            ? `/api/products/baja/${id}`
            : `/api/products/alta/${id}`;

        try {
            const response = await fetch(`${urlBase}${ruta}`, {
                method: "PUT"
            });

            const data = await response.json();

            if (!response.ok) {
                alert(data.mensaje || "No se pudo modificar el estado del producto");
                return;
            }

            alert(data.mensaje);
            obtenerProductos();

        } catch (error) {
            console.error("Error al cambiar el estado:", error);
            alert("Error de conexión con el servidor");
        }
    }

    // Al hacer click en Consultar, hacemos un callback asincrono para pegarle a http://localhost:3001/api/products/x
        formBusquedaId.addEventListener("submit", async (event) => {
            event.preventDefault(); // Evitamos el envio por defecto del formulario

            // console.log(event.target);
            const botonPresionado = event.submitter;
            
            if (botonPresionado.id === "botonBuscarID") {
                // Extraemos el valor del campo con id idProd
            const idProd = event.target.idProd.value.trim();
            console.log(idProd); // Vemos por consola el valor de id extraido del <form> para parsarselo a la url en el fetch


            if (!idProd) {
                return mostrarError("Ingresa un id valido");
            }
            

            try {
                const response = await fetch(`${urlBase}/api/products/${idProd}`);
                console.log(response);

                // Accemos al JSON dentro del cuerpo de la respuesta y lo convertimos a objeto JS
                const data = await response.json(); 
                

                // Procesamos respuestas 400 o 500
                if (!response.ok) {
                    console.error(data.mensaje);
                    return mostrarError(data.mensaje);
                }

                const producto = data.payload; // Traigo el primer objeto de mi array (de 1 solo objeto)
                console.log(data.payload);
                renderizarProducto(producto);

            } catch (error) {
                // Estos errores son errores REALES de red, no capturan 404, 500, etc
                console.error("Error al obtener productos: ", error);
                return mostrarError("Error de conexion con el servidor");
            }
            } else {
                obtenerProductos();
            }

            
        });


        function renderizarProducto(producto) {
            let htmlProducto = `
                <div class="card-producto-admin">
                    <img class="card-img-admin" src="${producto.imagen}" alt="${producto.nombre}">
                    <h4>${producto.nombre}</h4>
                    <p>${producto.categoria}</p>
                    <p>ID:${producto.id}</p>
                    <p>$${producto.precio}</p> 
                    <div class="div-botones-admin">       
                        <button type="button" class="botonModificar" onclick="abrirFormularioModificar(${producto.id})">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="24px" width="24px" fill="currentColor"><path d="M9.25,22l-0.4-3.2q-0.32-0.13-0.61-0.3T7.68,18.13L4.7,19.38L1.95,14.63l2.58-1.95Q4.5,12.5 4.5,12.34q0-0.16 0-0.34t0-0.34t0.03-0.34L1.95,9.38L4.7,4.63L7.68,5.88Q7.95,5.68 8.25,5.5t0.6-0.3L9.25,2h5.5l0.4,3.2q0.33,0.13 0.61,0.3t0.56,0.38L19.3,4.63l2.75,4.75l-2.57,1.95q0.02,0.18 0.02,0.34t0,0.34t0,0.34t-0.05,0.34l2.57,1.95l-2.75,4.75l-2.95-1.25q-0.27,0.2-0.57,0.38t-0.6,0.3L14.75,22H9.25ZM11,20h1.98l0.35-2.65q0.78-0.2 1.44-0.59t1.21-0.94l2.47,1.03l0.98-1.7l-2.15-1.63q0.13-0.35 0.17-0.74T17.5,12t-0.05-0.79q-0.05-0.39-0.17-0.74l2.15-1.63l-0.98-1.7L15.98,8.2q-0.55-0.57-1.21-0.96T13.33,6.65L13,4H11.03L10.68,6.65Q9.9,6.85 9.24,7.24T8.03,8.17L5.55,7.15L4.58,8.85l2.15,1.6Q6.6,10.83 6.55,11.2T6.5,12q0,0.4 0.05,0.77t0.17,0.75L4.58,15.15l0.98,1.7L8.03,15.8q0.55,0.58 1.21,0.96t1.44,0.59L11,20Zm1.05-4.5q1.45,0 2.47-1.03T15.55,12T14.53,9.52T12.05,8.5q-1.47,0-2.49,1.02T8.55,12t1.01,2.47t2.49,1.03ZM12,12Z"/></svg>
                        </button>
                        
                        <!-- Ternario para decidir que icono corresponde segun si está activo o no -->
                        <button type="button" class="${producto.activo ? 'botonDeshabilitar' : 'botonHabilitar'}" onclick="cambiarEstadoProducto(${producto.id}, ${producto.activo})">
                            ${producto.activo ? 
                            `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="24px" width="24px" fill="currentColor">
                                <path d="M8.4,17L12,13.4L15.6,17L17,15.6L13.4,12L17,8.4L15.6,7L12,10.6L8.4,7L7,8.4L10.6,12L7,15.6L8.4,17ZM12,22q-2.07,0-3.9-0.79q-1.82-0.79-3.17-2.14Q3.58,17.73 2.79,15.9T2,12Q2,9.92 2.79,8.1Q3.58,6.27 4.93,4.93Q6.28,3.57 8.1,2.79Q9.93,2 12,2t3.9,0.79t3.17,2.14q1.35,1.35 2.14,3.17Q22,9.92 22,12t-0.79,3.9t-2.14,3.17q-1.35,1.35-3.17,2.14T12,22Zm0-2q3.35,0 5.68-2.32T20,12T17.68,6.32T12,4T6.33,6.32T4,12t2.33,5.68T12,20Zm0-8Z"/>
                            </svg>`
                            : 
                            `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="24px" width="24px" fill="currentColor">
                                <path d="M10.6,16.6l7.05-7.05l-1.4-1.4L10.6,13.8L7.75,10.95l-1.4,1.4L10.6,16.6ZM12,22q-2.07,0-3.9-0.79q-1.82-0.79-3.17-2.14Q3.58,17.73 2.79,15.9T2,12Q2,9.92 2.79,8.1Q3.58,6.27 4.93,4.93Q6.28,3.57 8.1,2.79Q9.93,2 12,2t3.9,0.79t3.17,2.14q1.35,1.35 2.14,3.17Q22,9.92 22,12t-0.79,3.9t-2.14,3.17q-1.35,1.35-3.17,2.14T12,22Zm0-2q3.35,0 5.68-2.32T20,12T17.68,6.32T12,4T6.33,6.32T4,12t2.33,5.68T12,20Zm0-8Z"/>
                            </svg>`
                            }
                        </button>
                    </div>
                </div>
            `;

            contenedorProductos.innerHTML = htmlProducto;
        }




    async function obtenerProductos() {
        try {
            const response = await fetch(`${urlBase}/api/products?admin=true`);

            console.log(response);

            const data = await response.json();

            if (!response.ok) {
                console.log(data.mensaje);
                return mostrarError(data.mensaje);
            }

            const productos = data.payload;

            renderizarProductos(productos);


        } catch (error) {
            console.error("Error al obtener productos: ", error);
            return mostrarError("Error de conexión con el servidor");
        }
    }

    function renderizarProductos(array) {
        let htmlProductos = "";

        array.forEach(producto => {
            htmlProductos += `
                <div class="card-producto-admin">
                    <img class="card-img-admin" src="${producto.imagen}" alt="${producto.nombre}">
                    <h4>${producto.nombre}</h4>
                    <p>${producto.categoria}</p>
                    <p>ID:${producto.id}</p>
                    <p>$${producto.precio}</p> 
                    <div class="div-botones-admin">       
                        <button type="button" class="botonModificar" onclick="abrirFormularioModificar(${producto.id})">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="24px" width="24px" fill="currentColor"><path d="M9.25,22l-0.4-3.2q-0.32-0.13-0.61-0.3T7.68,18.13L4.7,19.38L1.95,14.63l2.58-1.95Q4.5,12.5 4.5,12.34q0-0.16 0-0.34t0-0.34t0.03-0.34L1.95,9.38L4.7,4.63L7.68,5.88Q7.95,5.68 8.25,5.5t0.6-0.3L9.25,2h5.5l0.4,3.2q0.33,0.13 0.61,0.3t0.56,0.38L19.3,4.63l2.75,4.75l-2.57,1.95q0.02,0.18 0.02,0.34t0,0.34t0,0.34t-0.05,0.34l2.57,1.95l-2.75,4.75l-2.95-1.25q-0.27,0.2-0.57,0.38t-0.6,0.3L14.75,22H9.25ZM11,20h1.98l0.35-2.65q0.78-0.2 1.44-0.59t1.21-0.94l2.47,1.03l0.98-1.7l-2.15-1.63q0.13-0.35 0.17-0.74T17.5,12t-0.05-0.79q-0.05-0.39-0.17-0.74l2.15-1.63l-0.98-1.7L15.98,8.2q-0.55-0.57-1.21-0.96T13.33,6.65L13,4H11.03L10.68,6.65Q9.9,6.85 9.24,7.24T8.03,8.17L5.55,7.15L4.58,8.85l2.15,1.6Q6.6,10.83 6.55,11.2T6.5,12q0,0.4 0.05,0.77t0.17,0.75L4.58,15.15l0.98,1.7L8.03,15.8q0.55,0.58 1.21,0.96t1.44,0.59L11,20Zm1.05-4.5q1.45,0 2.47-1.03T15.55,12T14.53,9.52T12.05,8.5q-1.47,0-2.49,1.02T8.55,12t1.01,2.47t2.49,1.03ZM12,12Z"/></svg>
                        </button>
                        <!-- Ternario para decidir que icono corresponde segun si está activo o no -->
                        <button type="button" class="${producto.activo ? 'botonDeshabilitar' : 'botonHabilitar'}" onclick="cambiarEstadoProducto(${producto.id}, ${producto.activo})">
                            ${producto.activo ? 
                            `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="24px" width="24px" fill="currentColor">
                                <path d="M8.4,17L12,13.4L15.6,17L17,15.6L13.4,12L17,8.4L15.6,7L12,10.6L8.4,7L7,8.4L10.6,12L7,15.6L8.4,17ZM12,22q-2.07,0-3.9-0.79q-1.82-0.79-3.17-2.14Q3.58,17.73 2.79,15.9T2,12Q2,9.92 2.79,8.1Q3.58,6.27 4.93,4.93Q6.28,3.57 8.1,2.79Q9.93,2 12,2t3.9,0.79t3.17,2.14q1.35,1.35 2.14,3.17Q22,9.92 22,12t-0.79,3.9t-2.14,3.17q-1.35,1.35-3.17,2.14T12,22Zm0-2q3.35,0 5.68-2.32T20,12T17.68,6.32T12,4T6.33,6.32T4,12t2.33,5.68T12,20Zm0-8Z"/>
                            </svg>`
                            : 
                            `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="24px" width="24px" fill="currentColor">
                                <path d="M10.6,16.6l7.05-7.05l-1.4-1.4L10.6,13.8L7.75,10.95l-1.4,1.4L10.6,16.6ZM12,22q-2.07,0-3.9-0.79q-1.82-0.79-3.17-2.14Q3.58,17.73 2.79,15.9T2,12Q2,9.92 2.79,8.1Q3.58,6.27 4.93,4.93Q6.28,3.57 8.1,2.79Q9.93,2 12,2t3.9,0.79t3.17,2.14q1.35,1.35 2.14,3.17Q22,9.92 22,12t-0.79,3.9t-2.14,3.17q-1.35,1.35-3.17,2.14T12,22Zm0-2q3.35,0 5.68-2.32T20,12T17.68,6.32T12,4T6.33,6.32T4,12t2.33,5.68T12,20Zm0-8Z"/>
                            </svg>`
                            }
                        </button>
                    </div>
                </div>
            `;
        });

        contenedorProductos.innerHTML = htmlProductos;
    }
async function abrirFormularioModificar(id) {
    try {
        const respuesta = await fetch(`${urlBase}/api/products/${id}`);
        const data = await respuesta.json();

        if (!respuesta.ok) {
            alert(data.mensaje || "No se pudo obtener el producto");
            return;
        }

        const producto = data.payload;
        activoProductoModificar = producto.activo;

        document.getElementById("idModificar").value = producto.id;
        document.getElementById("nombreModificar").value = producto.nombre;
        document.getElementById("precioModificar").value = producto.precio;
        document.getElementById("categoriaModificar").value = producto.categoria;
        document.getElementById("imagenModificar").value = producto.imagen;

        formularioAgregar.style.display = "none";

        document.getElementById("formularioModificarProducto").style.display = "block";

    } catch (error) {
        console.error(error);
        alert("Error al obtener los datos del producto");
    }
}


botonDescargar.addEventListener("click", async () => {
    const res = await fetch('http://localhost:3001/api/sales/exportar', { credentials: 'include' })
  if (!res.ok) return alert('Error al descargar');

  const blob = await res.blob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'ventas.xlsx';
  a.click();
  URL.revokeObjectURL(url);
})


    obtenerProductos();