import { Router } from "express";
import { createSale, descargarVentas } from "../controllers/sale.controllers.js";

const router = Router();

// Registrar una nueva venta
router.post("/", createSale);

router.get('/exportar', descargarVentas);

export default router;
