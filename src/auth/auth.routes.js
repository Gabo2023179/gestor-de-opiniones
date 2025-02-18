import { Router } from "express";
import { register, login } from "./auth.controller.js";
import { registerValidator, loginValidator } from "../middlewares/user-validators.js";

/**
 * Crea un nuevo enrutador de Express.
 * 
 * Este enrutador permite definir rutas para el registro e inicio de sesión de usuarios,
 * manteniendo la modularidad y organización del código.
 */
const router = Router();

router.post(
    "/register",  // Endpoint para el registro de usuario
    registerValidator, // Middleware de validación de datos
    register // Controlador que maneja el registro
);

router.post(
    "/login",  // Endpoint para el inicio de sesión
    loginValidator, // Middleware de validación de datos de inicio de sesión
    login // Controlador que maneja la autenticación
);

export default router; // Exportamos el enrutador para su uso en la aplicación principal
