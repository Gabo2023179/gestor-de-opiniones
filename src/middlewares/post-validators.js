// src/middlewares/post-validators.js
import { body } from "express-validator";
import { validarCampos } from "./validate-fields.js";

export const postValidator = [
  body("title").notEmpty().withMessage("Title is required"),
  body("category").notEmpty().withMessage("Category is required"),
  body("content").notEmpty().withMessage("Content is required"),
  validarCampos
];
