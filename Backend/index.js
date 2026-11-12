
// Importamos Express
import express from "express";

// Importamos CORS
import cors from "cors";

// Importamos la configuración del entorno
import environments from "./src/api/config/environments.js";

// Importamos la conexión a la BBDD
import connection from "./src/api/database/db.js";

// Importamos las rutas
import { productRoutes } from "./src/api/routes/index.js";

// Importamos los middlewares
import { loggerUrl } from "./src/api/middlewares/middlewares.js";

// Inicializamos Express
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(loggerUrl);

// Ruta de prueba del servidor
app.get("/", (req, res) => {
    res.send("Servidor funcionando correctamente");
});

// Ruta para probar la conexión a MySQL
app.get("/probar-db", async (req, res) => {
    try {
        const [resultado] = await connection.query("SELECT 1");

        res.json({
            mensaje: "Conexion a MySQL exitosa",
            resultado
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            mensaje: "Error al conectar con MySQL"
        });
    }
});

// Registramos las rutas de productos
app.use("/api/products", productRoutes);

// Iniciamos el servidor
app.listen(environments.port, () => {
    console.log(`Servidor iniciado en el puerto ${environments.port}`);
});
