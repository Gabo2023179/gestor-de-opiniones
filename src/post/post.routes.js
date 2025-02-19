// src/post/post.routes.js
import { Router } from 'express';
import { createPost, getPosts, getPostById, updatePost, deletePost } from "./post.controller.js";
import { validateJWT } from "../middlewares/validate-jwt.js";
import { postValidator } from "../middlewares/post-validators.js";

const router = Router();

router.post("/", validateJWT, postValidator, createPost);
router.get("/", getPosts);
router.get("/:postId", getPostById);
router.put("/:postId", validateJWT, postValidator, updatePost);
router.delete("/:postId", validateJWT, deletePost);

export default router;
