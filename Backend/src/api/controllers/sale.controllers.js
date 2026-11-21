import ExcelJS from 'exceljs';
import connection from '../database/db.js'; 
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



export const descargarVentas = async (req, res) => {
  try {
    const [rows] = await connection.query(`
      SELECT v.id AS venta_id, v.fecha, v.nombre_cliente, v.total,
             d.nombre_producto, d.precio_unitario, d.cantidad, d.subtotal
      FROM ventas v
      JOIN detalle_ventas d ON d.venta_id = v.id
      ORDER BY v.fecha DESC, v.id DESC
    `);

    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Ventas');

    sheet.columns = [
      { header: 'N° Venta', key: 'venta_id', width: 10 },
      { header: 'Fecha', key: 'fecha', width: 14 },
      { header: 'Cliente', key: 'nombre_cliente', width: 25 },
      { header: 'Producto', key: 'nombre_producto', width: 30 },
      { header: 'Precio unitario', key: 'precio_unitario', width: 16 },
      { header: 'Cantidad', key: 'cantidad', width: 10 },
      { header: 'Subtotal', key: 'subtotal', width: 14 },
      { header: 'Total venta', key: 'total', width: 14 },
    ];

    // mysql2 devuelve los DECIMAL como texto, así que los paso a número
    sheet.addRows(rows.map(r => ({
      ...r,
      precio_unitario: Number(r.precio_unitario),
      subtotal: Number(r.subtotal),
      total: Number(r.total),
    })));

    sheet.getRow(1).font = { bold: true };

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader('Content-Disposition', 'attachment; filename=ventas.xlsx');

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'No se pudo generar el Excel' });
  }
};