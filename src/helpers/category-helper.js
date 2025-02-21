import Category from '../category/category.model.js';

/**
 * Valida si una categoría con el mismo nombre ya existe en la base de datos.
 * @param {string} name - Nombre de la categoría a verificar.
 * @throws {Error} Si la categoría ya existe.
 */
export const isCategoryDuplicate = async (name) => {
    const exists = await Category.findOne({ name });
    if (exists) {
      throw new Error("Category already exists");
    }
  };

  /**
 * Verifica si una categoría existe en la base de datos por su ID.
 * @param {string} categoryId - ID de la categoría a verificar.
 * @throws {Error} Si la categoría no existe.
 */
export const categoryExists = async (categoryId) => {
    const category = await Category.findById(categoryId);
    if (!category) {
      throw new Error("Category not found");
    }
  };