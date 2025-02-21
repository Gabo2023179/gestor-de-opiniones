import { body, param } from "express-validator";
import { emailExists, usernameExists, userExists, validateUserNotDeleted } from "../helpers/db-validators.js"; // ✅ Usamos el db-validators
import { validarCampos } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";
import { hasRoles, validateUpdateRole } from "./validate-roles.js";
import { validateJWT } from "./validate-jwt.js";
import { check } from "express-validator";

/**
 * Valida el registro de un nuevo usuario.
 */
export const registerValidator = [
  body("name").notEmpty().withMessage("El nombre es requerido"),
  body("username").notEmpty().withMessage("El username es requerido"),
  body("email").notEmpty().withMessage("El email es requerido"),
  body("email").isEmail().withMessage("No es un email válido"),
  body("email").custom(emailExists), 
  body("username").custom(usernameExists), 
  body("password").isStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1
  }).withMessage("El password debe ser fuerte."),
  body("role").optional().isIn(["ADMIN", "CLIENT"]).withMessage("Rol no válido, debe ser 'ADMIN' o 'CLIENT'"),
  validarCampos,
  handleErrors
];

/**
 * Valida los datos de inicio de sesión.
 */
export const loginValidator = [
  body("email").optional().isEmail().withMessage("No es un email válido"),
  body("username").optional().isString().withMessage("El username es inválido"),
  body("password").isLength({ min: 8 }).withMessage("El password debe contener al menos 8 caracteres"),
  validarCampos,
  handleErrors
];

/**
 * Valida la obtención de un usuario por su ID.
 */
export const getUserByIdValidator = [
  validateJWT,
  hasRoles("ADMIN"),
  param("uid").isMongoId().withMessage("No es un ID válido de MongoDB"),
  param("uid").custom(userExists), // ✅ Usamos el helper del db-validators
  validarCampos,
  handleErrors
];

/**
 * Valida la eliminación de un usuario.
 */
export const deleteUserValidator = [
  validateJWT,
  hasRoles("ADMIN"),
  check("usuario").custom(validateUserNotDeleted), // ✅ Verifica que el usuario exista antes de eliminarlo
  validarCampos,
  handleErrors
];

/**
 * Valida la actualización de un usuario (ADMIN puede actualizar otros usuarios).
 */
export const adminUpdateUserValidator = [
  validateJWT,
  hasRoles("ADMIN"),
  param("uid").isMongoId().withMessage("No es un ID válido"),
  param("uid").custom(userExists), // ✅ Usamos el helper del db-validators
  validarCampos,
  handleErrors
];

/**
 * Valida la actualización de los datos del usuario autenticado.
 */
export const updateUserValidator = [
  validateJWT,
  hasRoles("ADMIN", "CLIENT"), // ✅ Ambos pueden actualizar su info
  validateUpdateRole,
  body("email").optional().isEmail().withMessage("No es un email válido"),
  body("email").optional().custom(emailExists), // ✅ Evita que el usuario ponga un email ya registrado
  body("password").optional().isLength({ min: 8 }).withMessage("El password debe contener al menos 8 caracteres"),
  validarCampos,
  handleErrors
];
