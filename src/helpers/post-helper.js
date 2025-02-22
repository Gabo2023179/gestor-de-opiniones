import Post from "../post/post.model.js";  


/**
 * Verifica si un post existe en la base de datos por su ID.
 * @param {string} postId - ID del post a verificar.
 * @throws {Error} Si el post no existe.
 */
export const postExists = async (postId) => {
    const post = await Post.findById(postId);
    if (!post) {
      throw new Error("Post not found");
    }
  };

  /**
 * Verifica si el usuario autenticado es el autor del post.
 * @param {string} postId - ID del post a verificar.
 * @param {object} userId - ID del usuario autenticado.
 * @throws {Error} Si el usuario no es el autor del post.
 */
export const isPostAuthor = async (postId, userId) => {
    const post = await Post.findById(postId);
    if (!post) {
      throw new Error("Post not found");
    }
    if (post.author.toString() !== userId.toString()) {
      throw new Error("Not authorized to modify this post");
    }
  };

  /**
 * Actualiza los campos de un post solo si han cambiado.
 * @param {object} post - Objeto del post obtenido desde la base de datos.
 * @param {object} newData - Datos nuevos enviados en la petición.
 * @returns {boolean} - `true` si hubo cambios, `false` si no.
 */
export const updatePostFields = (post, newData) => {
    let updated = false;
  
    ["title", "category", "content"].forEach(field => {
      if (newData[field] && newData[field] !== post[field]) {
        post[field] = newData[field];
        updated = true;
      }
    });
  
    return updated;
  };
  