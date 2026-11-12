import connection from "../database/db.js";

// Obtener todos los productos activos
const selectAllProducts = () => {
    const sql = "SELECT * FROM productos WHERE activo = TRUE";
    return connection.query(sql);
};

// Obtener producto por ID
const selectProductById = (id) => {
    const sql = "SELECT * FROM productos WHERE id = ?";
    return connection.query(sql, [id]);
};

// Crear producto
const insertNewProduct = (nombre, precio, imagen, categoria, activo) => {
    const sql = `
        INSERT INTO productos (nombre, precio, imagen, categoria, activo)
        VALUES (?, ?, ?, ?, ?)
    `;

    return connection.query(sql, [nombre, precio, imagen, categoria, activo]);
};

// Modificar producto
const updateProduct = (nombre, precio, imagen, categoria, activo, id) => {
    const sql = `
        UPDATE productos
        SET nombre = ?, precio = ?, imagen = ?, categoria = ?, activo = ?
        WHERE id = ?
    `;

    return connection.query(sql, [nombre, precio, imagen, categoria, activo, id]);
};

// Dar de baja un producto (baja lógica)
const deactivateProduct = (id) => {
    const sql = "UPDATE productos SET activo = FALSE WHERE id = ?";
    return connection.query(sql, [id]);
};

// Exportamos los modelos
export default {
    selectAllProducts,
    selectProductById,
    insertNewProduct,
    updateProduct,
    deactivateProduct
};
