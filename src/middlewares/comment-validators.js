import {body, param } from "express-validator";
import { handleErrors } from "./handle-errors";
import { validarCampos } from "./validate-fields";
import { validateJWT } from "./validate-jwt";

export const createComentValidator = [
    validateJWT,
    body("text").notEmpty().withMessage("No puede quedar vacio su comentario!"),
    body("author").notEmpty().withMessage("Debe colocar quien es el autor"),
    body("post").notEmpty().withMessage("Debe incluir a que post esta comentando!")
]


export const commentValidator = [
  body("text").notEmpty().withMessage("Comment text is required"),
  // Para la creación se requiere que postId sea un ID válido
  body("postId").optional().isMongoId().withMessage("Invalid post ID"),
  validarCampos
];

