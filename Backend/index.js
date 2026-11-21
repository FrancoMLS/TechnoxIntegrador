
// Importamos Express
import express from "express";

// Importamos CORS
import cors from "cors";
import session from "express-session";

// Importamos la configuración del entorno
import environments from "./src/api/config/environments.js";

// Importamos la conexión a la BBDD
import connection from "./src/api/database/db.js";

// Importamos las rutas
import {
    productRoutes,
    viewRoutes,
    saleRoutes,
    adminRoutes
} from "./src/api/routes/index.js";
// Importamos los middlewares
import { loggerUrl } from "./src/api/middlewares/middlewares.js";

import { __dirname, join } from "./src/api/utils/index.js";


// Inicializamos Express
const app = express();


app.set("view engine", "ejs"); // Configuramos EJS como motor de plantillas
app.set("views", join(__dirname, "src/views")); // Le indicamos donde se encuentran las vistas ejs -> src/views



// Middlewares
// Middleware para servir archivos estaticos
app.use(express.static(join(__dirname, "src/public"))); // Ahora decimos que los archivos estaticos estan en public

app.use(cors({
  origin: 'http://127.0.0.1:5501',
  credentials: true,
}));

app.use(express.json());

app.use(session({
    secret: environments.sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 1000 * 60 * 60
    }
}));

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
// Registramos las rutas de ventas
app.use("/api/sales", saleRoutes);
// Rutas de autenticación de administradores
app.use("/api/admin", adminRoutes);


// Redirijo todas las peticiones a /dashboard a viewRoutes.js
app.use("/dashboard", viewRoutes)


// Iniciamos el servidor
app.listen(environments.port, () => {
    console.log(`Servidor iniciado en el puerto ${environments.port}`);
});
