import { body } from "express-validator";
import { validarCampos } from "./validate-fields.js";

export const commentValidator = [
  body("text").notEmpty().withMessage("Comment text is required"),
  body("postId").notEmpty().withMessage("postId is required").isMongoId().withMessage("Invalid post ID"),
  validarCampos
];
