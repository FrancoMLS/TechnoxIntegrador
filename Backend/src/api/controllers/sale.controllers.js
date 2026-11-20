
import SaleModels from "../models/sale.models.js";

export const createSale = async (req, res) => {
    try {
        const { nombre_cliente, productos } = req.body;

        // Validamos el nombre del cliente
        if (
            !nombre_cliente ||
            typeof nombre_cliente !== "string" ||
            nombre_cliente.trim().length === 0 ||
            nombre_cliente.trim().length > 100
        ) {
            return res.status(400).json({
                mensaje: "El nombre del cliente es obligatorio y debe tener hasta 100 caracteres."
            });
        }

        // Validamos que haya productos
        if (!Array.isArray(productos) || productos.length === 0) {
            return res.status(400).json({
                mensaje: "El carrito no contiene productos."
            });
        }

        // Validamos los identificadores y las cantidades
        const ids = new Set();

        for (const producto of productos) {
            const id = Number(producto.id);
            const cantidad = Number(producto.cantidad);

            if (
                !Number.isInteger(id) ||
                id <= 0 ||
                !Number.isInteger(cantidad) ||
                cantidad <= 0
            ) {
                return res.status(400).json({
                    mensaje: "Hay productos o cantidades inválidas."
                });
            }

            if (ids.has(id)) {
                return res.status(400).json({
                    mensaje: "Hay productos repetidos en el carrito."
                });
            }

            ids.add(id);
        }

        const venta = await SaleModels.createSale(
            nombre_cliente.trim(),
            productos
        );

        return res.status(201).json({
            mensaje: "Venta guardada correctamente.",
            payload: venta
        });

    } catch (error) {
        console.error("Error al guardar la venta:", error);

        return res.status(500).json({
            mensaje: error.message || "No se pudo guardar la venta."
        });
    }
};
