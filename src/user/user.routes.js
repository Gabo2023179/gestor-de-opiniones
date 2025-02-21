import { Router } from 'express';
import { getUserById, getUsers, updateUser } from "./user.controller.js";
import { getUserByIdValidator, adminUpdateUserValidator, updateUserValidator } from "../middlewares/user-validators.js";
import { validateJWT } from "../middlewares/validate-jwt.js";
import { hasRoles } from "../middlewares/validate-roles.js";

const router = Router();

// 🔹 Obtener todos los usuarios (Solo ADMIN)
router.get("/", validateJWT, hasRoles("ADMIN"), getUsers);

// 🔹 Obtener un usuario por ID (Solo ADMIN)
router.get("/findUser/:uid", getUserByIdValidator, getUserById);

// 🔹 Actualizar usuario (ADMIN puede actualizar a otros usuarios)
router.put("/admin/updateUser/:uid", adminUpdateUserValidator, updateUser);

// 🔹 Actualizar perfil del usuario autenticado
router.put("/user/updateProfile", updateUserValidator, updateUser);

export default router;
