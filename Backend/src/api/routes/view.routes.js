/* ==========================
     Rutas vistas
========================== */

import { Router } from "express";
import { vistaAdmin, vistaAdminIndex, vistaCarrito, vistaClienteIndex, vistaProductosCliente } from "../controllers/view.controllers.js";

const router = Router();

// Vista principal
router.get("/indexCliente", vistaClienteIndex);

// Vista consultar
router.get("/indexAdmin", vistaAdminIndex);

// Vista crear
router.get("/carrito", vistaCarrito);

// Vista modificar
router.get("/principalCliente", vistaProductosCliente);

// Vista eliminar
router.get("/principalAdmin", vistaAdmin);

// Exportamos las rutas de las vistas (todo de una)
export default router;