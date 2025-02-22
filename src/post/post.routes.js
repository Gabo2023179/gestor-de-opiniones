import { Router } from "express";
import { createPost, getPosts, getPostById, updatePost, deletePost } from "./post.controller.js";
import { validateJWT } from "../middlewares/validate-jwt.js";
import { postValidator, postExistsValidator, canModifyPostValidator } from "../middlewares/post-validators.js";

const router = Router();

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Create a new post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Post Title"
 *               category:
 *                 type: string
 *                 example: "Technology"
 *               content:
 *                 type: string
 *                 example: "This is the content of the post"
 *     responses:
 *       201:
 *         description: Post created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.post("/", validateJWT, postValidator, createPost);

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Get all posts
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: List of posts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   title:
 *                     type: string
 *                     example: "Post Title"
 *                   category:
 *                     type: string
 *                     example: "Technology"
 *                   content:
 *                     type: string
 *                     example: "This is the content of the post"
 *       500:
 *         description: Internal server error
 */
router.get("/", getPosts);

/**
 * @swagger
 * /posts/{postId}:
 *   get:
 *     summary: Get a post by ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: postId
 *         schema:
 *           type: string
 *         required: true
 *         description: The post ID
 *     responses:
 *       200:
 *         description: Post details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 title:
 *                   type: string
 *                   example: "Post Title"
 *                 category:
 *                   type: string
 *                   example: "Technology"
 *                 content:
 *                   type: string
 *                   example: "This is the content of the post"
 *       404:
 *         description: Post not found
 *       500:
 *         description: Internal server error
 */
router.get("/:postId", postExistsValidator, getPostById);

/**
 * @swagger
 * /posts/updatePost/{postId}:
 *   put:
 *     summary: Update a post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         schema:
 *           type: string
 *         required: true
 *         description: The post ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Updated Post Title"
 *               category:
 *                 type: string
 *                 example: "Updated Technology"
 *               content:
 *                 type: string
 *                 example: "This is the updated content of the post"
 *     responses:
 *       200:
 *         description: Post updated successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Post not found
 *       500:
 *         description: Internal server error
 */
router.put("/updatePost/:postId", validateJWT, canModifyPostValidator, postValidator, updatePost);

/**
 * @swagger
 * /posts/delete/{postId}:
 *   delete:
 *     summary: Delete a post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         schema:
 *           type: string
 *         required: true
 *         description: The post ID
 *     responses:
 *       200:
 *         description: Post deleted successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Post not found
 *       500:
 *         description: Internal server error
 */
router.delete("/delete/:postId", validateJWT, canModifyPostValidator, deletePost);

export default router;
