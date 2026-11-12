import ProductModels from "../models/product.models.js";

// Obtener todos los productos
export const getAllProducts = async (req, res) => {
    try {
        const [rows] = await ProductModels.selectAllProducts();

        if (rows.length === 0) {
            return res.status(404).json({
                mensaje: "No hay productos disponibles"
            });
        }

        res.status(200).json({
            payload: rows,
            total: rows.length
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: "Error al obtener los productos"
        });
    }
};

// Obtener un producto por ID
export const getProductById = async (req, res) => {
    try {
        const [rows] = await ProductModels.selectProductById(req.id);

        if (rows.length === 0) {
            return res.status(404).json({
                mensaje: "Producto no encontrado"
            });
        }

        res.status(200).json({
            payload: rows[0]
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: "Error al obtener el producto"
        });
    }
};

// Crear un producto
export const createProduct = async (req, res) => {
    try {
        const { nombre, precio, imagen, categoria, activo } = req.body;

        const [result] = await ProductModels.insertNewProduct(
            nombre, precio, imagen, categoria, activo
        );

        res.status(201).json({
            mensaje: "Producto creado correctamente",
            id: result.insertId
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: "Error al crear el producto"
        });
    }
};

// Modificar un producto
export const modifyProduct = async (req, res) => {
    try {
        const { nombre, precio, imagen, categoria, activo, id } = req.body;

        const [result] = await ProductModels.updateProduct(
            nombre, precio, imagen, categoria, activo, id
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                mensaje: "Producto no encontrado"
            });
        }

        res.status(200).json({
            mensaje: "Producto modificado correctamente"
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: "Error al modificar el producto"
        });
    }
};

// Dar de baja un producto (baja lógica)
export const removeProduct = async (req, res) => {
    try {
        const [result] = await ProductModels.deactivateProduct(req.id);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                mensaje: "Producto no encontrado"
            });
        }

        res.status(200).json({
            mensaje: "Producto dado de baja correctamente"
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: "Error al dar de baja el producto"
        });
    }
};
