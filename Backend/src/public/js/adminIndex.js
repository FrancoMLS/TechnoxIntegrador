const formulario = document.getElementById("formAdminInicio");
const mensaje = document.getElementById("mensajeLogin");

formulario.addEventListener("submit", async (event) => {
    event.preventDefault();

    const usuario = document.getElementById("usuarioAdminInicio").value.trim();
    const contrasenia = document.getElementById("contraseniaAdminInicio").value;

    try {
        const respuesta = await fetch("/api/admin/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                usuario,
                contrasenia
            })
        });

        const resultado = await respuesta.json();

        if (!respuesta.ok) {
            mensaje.textContent = resultado.mensaje;
            return;
        }

        window.location.href = "/dashboard/principalAdmin";

    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        mensaje.textContent = "No se pudo conectar con el servidor.";
    }
});