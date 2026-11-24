/* ==========================
     Rutas vistas
========================== */

import { Router } from "express";
import { vistaAdmin, vistaAdminIndex, vistaCarrito, vistaClienteIndex, vistaProductosCliente, vistaTicket } from "../controllers/view.controllers.js";
import { verificarAdmin } from "../middlewares/middlewares.js";
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
router.get("/principalAdmin", verificarAdmin, vistaAdmin);

router.get("/ticket", vistaTicket);

// Exportamos las rutas de las vistas (todo de una)
export default router;