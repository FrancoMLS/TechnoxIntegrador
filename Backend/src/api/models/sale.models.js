import connection from "../database/db.js";

const createSale = async (nombreCliente, productos) => {
    const conn = await connection.getConnection();

    try {
        await conn.beginTransaction();

        const ids = productos.map(producto => Number(producto.id));

        const [productosDB] = await conn.query(
            "SELECT id, nombre, precio FROM productos WHERE id IN (?) AND activo = TRUE",
            [ids]
        );

        if (productosDB.length !== ids.length) {
            throw new Error("Uno o más productos no existen o están inactivos.");
        }

        let total = 0;
        const detalles = [];

        for (const producto of productos) {
            const productoDB = productosDB.find(
                p => p.id === Number(producto.id)
            );

            const cantidad = Number(producto.cantidad);
            const precio = Number(productoDB.precio);
            const subtotal = Math.round(precio * cantidad * 100) / 100;

            total += subtotal;

            detalles.push([
                productoDB.id,
                productoDB.nombre,
                precio,
                cantidad,
                subtotal
            ]);
        }

        total = Math.round(total * 100) / 100;

        const [venta] = await conn.query(
            `INSERT INTO ventas (nombre_cliente, total)
             VALUES (?, ?)`,
            [nombreCliente, total]
        );

        for (const detalle of detalles) {
            await conn.query(
                `INSERT INTO detalle_ventas
                (venta_id, producto_id, nombre_producto, precio_unitario, cantidad, subtotal)
                VALUES (?, ?, ?, ?, ?, ?)`,
                [venta.insertId, ...detalle]
            );
        }

        await conn.commit();

        return {
            id: venta.insertId,
            nombre_cliente: nombreCliente,
            total
        };

    } catch (error) {
        await conn.rollback();
        throw error;

    } finally {
        conn.release();
    }
};

export default {
    createSale
};
