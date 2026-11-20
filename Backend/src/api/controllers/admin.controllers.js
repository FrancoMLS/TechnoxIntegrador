import bcrypt from "bcrypt";
import AdminModels from "../models/admin.models.js";

export const loginAdmin = async (req, res) => {
    try {
        const { usuario, contrasenia } = req.body;

        if (
            typeof usuario !== "string" ||
            typeof contrasenia !== "string" ||
            !usuario.trim() ||
            !contrasenia
        ) {
            return res.status(400).json({
                mensaje: "Ingrese usuario y contraseña."
            });
        }

        const admin = await AdminModels.buscarPorUsuario(usuario.trim());

        if (!admin) {
            return res.status(401).json({
                mensaje: "Usuario o contraseña incorrectos."
            });
        }

        const passwordValida = await bcrypt.compare(
            contrasenia,
            admin.contrasenia
        );

        if (!passwordValida) {
            return res.status(401).json({
                mensaje: "Usuario o contraseña incorrectos."
            });
        }

        req.session.regenerate((error) => {
            if (error) {
                console.error(error);
                return res.status(500).json({
                    mensaje: "No se pudo iniciar la sesión."
                });
            }

            req.session.admin = {
                id: admin.id,
                usuario: admin.usuario
            };

            return res.json({
                mensaje: "Inicio de sesión correcto.",
                usuario: admin.usuario
            });
        });

    } catch (error) {
        console.error("Error al iniciar sesión:", error);

        return res.status(500).json({
            mensaje: "Error interno al iniciar sesión."
        });
    }
};

export const logoutAdmin = (req, res) => {
    req.session.destroy((error) => {
        if (error) {
            return res.status(500).json({
                mensaje: "No se pudo cerrar la sesión."
            });
        }

        res.clearCookie("connect.sid");

        return res.json({
            mensaje: "Sesión cerrada correctamente."
        });
    });
};