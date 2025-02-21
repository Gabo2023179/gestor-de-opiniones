import User from "./user.model.js";
import { updateUserFields } from "../helpers/user-helper.js";

/**
 * Obtiene un usuario por su ID.
 */
export const getUserById = async (req, res) => {
  try {
    const { uid } = req.params;
    const user = await User.findById(uid).select("-password"); // 🔹 Evita mostrar la contraseña

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Usuario no encontrado"
      });
    }

    return res.status(200).json({
      success: true,
      user
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error al obtener el usuario",
      error: err.message
    });
  }
};

/**
 * Obtiene una lista de usuarios con paginación.
 */
export const getUsers = async (req, res) => {
  try {
    const { limite = 5, desde = 0 } = req.query;
    const query = { status: true };

    const [total, users] = await Promise.all([
      User.countDocuments(query),
      User.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
        .select("-password") // 🔹 No devolver la contraseña de los usuarios
    ]);

    return res.status(200).json({
      success: true,
      total,
      users
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error al obtener los usuarios",
      error: err.message
    });
  }
};

/**
 * Actualiza un usuario.
 */
export const updateUser = async (req, res) => {  
  try {  
    const uid = req.params.uid || req.usuario._id;
    const user = await User.findById(uid);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Usuario no encontrado"
      });
    }

    // 🔹 Usamos el helper para actualizar solo si hay cambios
    if (updateUserFields(user, req.body)) {
      await user.save();
    }

    return res.status(200).json({
      success: true, 
      message: "Usuario actualizado", 
      user
    });

  } catch (err) {  
    return res.status(500).json({
      success: false, 
      message: "Error al actualizar usuario", 
      error: err.message 
    });
  }
};
