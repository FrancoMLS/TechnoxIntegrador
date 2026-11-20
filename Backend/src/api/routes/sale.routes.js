import { Router } from "express";
import { createSale } from "../controllers/sale.controllers.js";

const router = Router();

// Registrar una nueva venta
router.post("/", createSale);

export default router;
