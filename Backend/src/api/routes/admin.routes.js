import { Router } from "express";
import {
    loginAdmin,
    logoutAdmin
} from "../controllers/admin.controllers.js";

const router = Router();

// Iniciar sesión
router.post("/login", loginAdmin);

// Cerrar sesión
router.post("/logout", logoutAdmin);

export default router;