const formulario = document.getElementById("formClienteInicio");

    formulario.addEventListener("submit", function(event) {
        event.preventDefault();

        const nombre = document.getElementById("nombreClienteInicio").value.trim();

        if (nombre === "") {
            alert("Por favor, ingresá tu nombre");
            return;
        }

        sessionStorage.setItem("nombreCliente", nombre);

        window.location.href = "/dashboard/principalCliente";
    });