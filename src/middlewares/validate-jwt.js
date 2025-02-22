import jwt from "jsonwebtoken";
import User from "../user/user.model.js";

export const validateJWT = async (req, res, next) => {
    try {
        let token = req.body.token || req.query.token || req.headers["authorization"];

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "No se proporcionó un token en la petición"
            });
        }

        // Limpia el token si contiene "Bearer"
        token = token.replace(/^Bearer\s+/, "");

        // Verifica y decodifica el token
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        // Buscar usuario en la DB
        const user = await User.findById(uid);

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "El usuario asociado al token no existe"
            });
        }

        if (!user.status) {
            return res.status(400).json({
                success: false,
                message: "El usuario ha sido eliminado o desactivado"
            });
        }

        // Guardamos el usuario en la request
        req.usuario = user;
        next();
    } catch (err) {
        let errorMessage = "Error al validar el token";

        if (err.name === "TokenExpiredError") {
            errorMessage = "El token ha expirado, por favor inicie sesión nuevamente.";
        } else if (err.name === "JsonWebTokenError") {
            errorMessage = "Token inválido.";
        }

        return res.status(401).json({
            success: false,
            message: errorMessage,
            error: err.message
        });
    }
};
