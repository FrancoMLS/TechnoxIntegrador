import connection from "../database/db.js";

const buscarPorUsuario = async (usuario) => {
    const [resultado] = await connection.query(
        "SELECT id, usuario, contrasenia FROM administradores WHERE usuario = ?",
        [usuario]
    );

    return resultado[0];
};

export default {
    buscarPorUsuario
};