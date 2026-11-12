import ProductModels from "../models/product.models.js";

// Registrar las solicitudes que llegan al servidor
export const loggerUrl = (req, res, next) => {
    console.log(
        new Date().toLocaleString(),
        req.method,
        req.url
    );

    next();
};

// Validar el ID recibido por parámetro
export const validateId = (req, res, next) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            mensaje: "El ID del producto no es válido"
        });
    }

    req.id = id;

    next();
};

// Validar los datos de un producto
export const validateProduct = (req, res, next) => {
    const { nombre, precio, categoria } = req.body;

    if (!nombre || typeof nombre !== "string") {
        return res.status(400).json({
            mensaje: "El nombre del producto es obligatorio"
        });
    }

    if (precio === undefined || precio === null ||
        precio === "" || !Number.isFinite(Number(precio)) ||
        Number(precio) <= 0) {
        return res.status(400).json({
            mensaje: "El precio debe ser un número mayor a cero"
        });
    }

    if (!["celular", "funda"].includes(categoria)) {
        return res.status(400).json({
            mensaje: "La categoría debe ser celular o funda"
        });
    }

    next();
};
