import { body, param } from "express-validator";
import { validarCampos } from "./validate-fields.js";
import { isCategoryDuplicate, categoryExists } from "../helpers/category-helper.js";
import Category from "../category/category.model.js";

/**
 * Valida los datos para crear una categoría.
 */
export const categoryValidator = [
  body("name").notEmpty().withMessage("Category name is required").custom(isCategoryDuplicate),
  body("description").optional().isLength({ max: 200 }).withMessage("Description cannot exceed 200 characters"),
  validarCampos
];

/**
 * Valida si una categoría existe antes de eliminarla.
 */
export const categoryExistsValidator = [
  param("categoryId").isMongoId().withMessage("Invalid category ID format").custom(categoryExists),
  validarCampos
];
