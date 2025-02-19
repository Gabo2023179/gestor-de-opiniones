import { Router } from 'express';
import { createComment, updateComment, deleteComment, getCommentsByPost } from "./comment.controller.js";
import { validateJWT } from "../middlewares/validate-jwt.js";
import { commentValidator } from "../middlewares/comment-validators.js";

const router = Router();

router.post("/", validateJWT, commentValidator, createComment);
router.put("/:commentId", validateJWT, commentValidator, updateComment);
router.delete("/:commentId", validateJWT, deleteComment);
router.get("/post/:postId", getCommentsByPost);

export default router;
