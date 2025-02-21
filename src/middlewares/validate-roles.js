import User from "../user/user.model.js";

export const hasRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.usuario) {
      return res.status(500).json({
        success: false,
        message: "Se requiere validar el role antes de validar el token"
      });
    }

    // Si el usuario autenticado ya es ADMIN y se intenta enviar un cambio de rol, se rechaza
    if (req.usuario.role === "ADMIN" && req.body.role) {
      return res.status(400).json({
        success: false,
        message: "Ya tienes el rol ADMIN"
      });
    }

    if (!roles.includes(req.usuario.role)) {
      return res.status(401).json({
        success: false,
        message: `Usuario no autorizado, el recurso requiere uno de los siguientes roles: ${roles}`
      });
    }
    next();
  };
};

export const validateUpdateRole = (req, res, next) => {
  if (req.usuario.role === "CLIENT" && req.body.role) {
    return res.status(400).json({
      success: false,
      message: "No tienes permiso para cambiar tu propio rol. Solo un ADMIN puede hacerlo."
    });
  }
  next();
};

// La función adminCantEditOtherAdmin se elimina o se reestructura si es necesaria.
