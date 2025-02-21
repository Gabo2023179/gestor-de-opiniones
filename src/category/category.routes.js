import { Router } from "express";
import { createCategory, getCategories, deleteCategory } from "./category.controller.js";
import { validateJWT } from "../middlewares/validate-jwt.js";
import { categoryValidator, categoryExistsValidator } from "../middlewares/category-validators.js";
import { hasRoles } from "../middlewares/validate-roles.js";

const router = Router();

router.post("/", validateJWT, hasRoles("ADMIN"), categoryValidator, createCategory);
router.get("/", getCategories);
router.delete("/:categoryId", validateJWT, hasRoles("ADMIN"), categoryExistsValidator, deleteCategory);

export default router;