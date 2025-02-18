import { body, param } from "express-validator";
import { emailExists, usernameExists, userExists, validateUserNotDeleted } from "../helpers/db-validators.js";
import { validarCampos } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";
import { hasRoles, validateUpdateRole } from "./validate-roles.js";
import { validateJWT } from "./validate-jwt.js";
import { check } from "express-validator";




export const deleteUserValidator = [
    validateJWT, // Verifica que el usuario tenga un token válido
    hasRoles("ADMIN", "CLIENT"), // Solo ADMIN o CLIENT pueden eliminar usuarios
    check("usuario").custom(validateUserNotDeleted), // Usa el validador importado
    validarCampos, // Revisa si hay errores en la validación antes de continuar
    handleErrors // Maneja errores y los devuelve en formato JSON
];

export const updateUserValidator = [
    validateJWT, // Verifica que el usuario tenga un token JWT válido.
    hasRoles("ADMIN", "CLIENT"), // Solo ADMIN y CLIENT pueden actualizar usuarios.
    validateUpdateRole, // Valida que los cambios en el rol sean correctos.
    validarCampos, // Revisa si hay errores en las validaciones antes de continuar.
    handleErrors // Maneja errores y los devuelve en formato JSON.
];