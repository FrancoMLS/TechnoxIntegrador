import bcrypt from "bcrypt";
import connection from "./src/api/database/db.js";
import readline from "readline/promises";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const crearAdmins = async () => {
    try {
        const contrasenia = await rl.question(
            "Ingrese la contraseña para ambos administradores: "
        );

        if (!contrasenia.trim()) {
            console.log("La contraseña no puede estar vacía.");
            return;
        }

        const hashYamila = await bcrypt.hash(contrasenia, 10);
        const hashFranco = await bcrypt.hash(contrasenia, 10);

        await connection.query(
            `INSERT INTO administradores (usuario, contrasenia)
             VALUES (?, ?), (?, ?)`,
            [
                "yamila@technox.com",
                hashYamila,
                "franco@technox.com",
                hashFranco
            ]
        );

        console.log("Administradores creados correctamente.");

    } catch (error) {
        console.error("Error al crear administradores:", error.message);
    } finally {
        rl.close();
        await connection.end();
    }
};

crearAdmins();