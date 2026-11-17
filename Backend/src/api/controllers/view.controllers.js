
import ProductModels from "../models/product.models.js";

export const vistaProductosCliente = (req, res) =>  {
    res.render("productos", {
        title: "Technox | Productos"
    });
}

export const vistaAdmin = (req, res) =>  {
    res.render("adminProductos", {
        title: "Technox | Admin Productos"
    });
}

export const vistaClienteIndex = (req, res) =>  {
    res.render("index", {
        title: "Technox | Inicio"
    });
}

export const vistaAdminIndex = (req, res) =>  {
    res.render("adminIndex", {
        title: "Technox | Admin"
    });
}

export const vistaCarrito = (req, res) =>  {
    res.render("carrito", {
        title: "Technox | Mi carrito"
    });
}