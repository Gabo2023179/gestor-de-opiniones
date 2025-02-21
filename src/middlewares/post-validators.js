import { body, param } from "express-validator";
import { validarCampos } from "./validate-fields.js";
import { postExists, isPostAuthor } from "../helpers/post-helper.js";
import Post from "../post/post.model.js"; // Asegúrate de importar el modelo para validaciones personalizadas

/**
 * Valida los datos para crear o actualizar un post.
 */
export const postValidator = [
  body("title").notEmpty().withMessage("Title is required"),
  body("category").notEmpty().withMessage("Category is required"),
  body("content").notEmpty().withMessage("Content is required"),
  validarCampos
];

/**
 * Verifica si un post existe en la base de datos antes de realizar una acción.
 */
export const postExistsValidator = [
  param("postId").isMongoId().withMessage("Invalid post ID format").custom(postExists),
  validarCampos
];

/**
 * Verifica si el usuario autenticado es el autor del post antes de modificarlo o eliminarlo.
 */
export const canModifyPostValidator = [
  ...postExistsValidator,
  param("postId").custom(isPostAuthor),
  validarCampos
];
