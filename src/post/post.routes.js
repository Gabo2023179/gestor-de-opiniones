import { Router } from "express";
import { createPost, getPosts, getPostById, updatePost, deletePost } from "./post.controller.js";
import { validateJWT } from "../middlewares/validate-jwt.js";
import { postValidator, postExistsValidator, canModifyPostValidator } from "../middlewares/post-validators.js"; // ✅ Ajusté los nombres

const router = Router();

// Crear un post (requiere autenticación y validaciones)
router.post("/", validateJWT, postValidator, createPost);

// Obtener todos los posts
router.get("/", getPosts);

// Obtener un post por ID (primero verifica si existe)
router.get("/:postId", postExistsValidator, getPostById);

// Actualizar un post (requiere autenticación y ser el autor)
router.put("/:postId", validateJWT, canModifyPostValidator, postValidator, updatePost);

// Eliminar un post (requiere autenticación y ser el autor)
router.delete("/:postId", validateJWT, canModifyPostValidator, deletePost);

export default router;
