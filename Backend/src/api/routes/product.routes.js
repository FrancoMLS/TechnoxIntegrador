import { Router } from "express";

import {
    validateId,
    validateProduct
} from "../middlewares/middlewares.js";

import {
    createProduct,
    getAllProducts,
    getProductById,
    modifyProduct,
    removeProduct
} from "../controllers/product.controllers.js";

const router = Router();

// Obtener todos los productos activos
router.get("/", getAllProducts);

// Obtener un producto por ID
router.get("/:id", validateId, getProductById);

// Crear un producto
router.post("/", validateProduct, createProduct);

// Modificar un producto
router.put("/", validateProduct, modifyProduct);

// Dar de baja un producto (baja lógica)
router.put("/baja/:id", validateId, removeProduct);

export default router;
