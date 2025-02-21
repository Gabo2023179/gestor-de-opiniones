import User from "../user/user.model.js";

/**
 * Actualiza solo los campos permitidos de un usuario si han cambiado.
 * @param {object} user - Objeto del usuario obtenido desde la base de datos.
 * @param {object} newData - Datos nuevos enviados en la petición.
 * @returns {boolean} - `true` si hubo cambios, `false` si no.
 */
export const updateUserFields = (user, newData) => {
    let updated = false;
  
    ["name", "surname", "email", "username", "phone"].forEach(field => {
      if (newData[field] && newData[field] !== user[field]) {
        user[field] = newData[field];
        updated = true;
      }
    });
  
    return updated;
  };