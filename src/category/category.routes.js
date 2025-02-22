import { Router } from "express";
import { createCategory, getCategories, deleteCategory } from "./category.controller.js";
import { validateJWT } from "../middlewares/validate-jwt.js";
import { categoryValidator, categoryExistsValidator } from "../middlewares/category-validators.js";
import { hasRoles } from "../middlewares/validate-roles.js";

const router = Router();

/**
 * @swagger
 * /category:
 *   post:
 *     summary: Create a new category
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Technology"
 *               description:
 *                 type: string
 *                 example: "All about technology"
 *     responses:
 *       201:
 *         description: Category created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.post("/", validateJWT, hasRoles("ADMIN"), categoryValidator, createCategory);

/**
 * @swagger
 * /category:
 *   get:
 *     summary: Get all categories
 *     tags: [Category]
 *     responses:
 *       200:
 *         description: List of categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     example: "Technology"
 *                   description:
 *                     type: string
 *                     example: "All about technology"
 *       500:
 *         description: Internal server error
 */
router.get("/", getCategories);

/**
 * @swagger
 * /category/{categoryId}:
 *   delete:
 *     summary: Delete a category
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         schema:
 *           type: string
 *         required: true
 *         description: The category ID
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Category not found
 *       500:
 *         description: Internal server error
 */
router.delete("/:categoryId", validateJWT, hasRoles("ADMIN"), categoryExistsValidator, deleteCategory);

export default router;