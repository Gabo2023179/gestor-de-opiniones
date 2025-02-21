import Category from './category.model.js';

/**
 * Crea una nueva categoría.
 * Se asume que:
 * - La validación de datos (nombre, descripción) se realiza en el middleware (categoryValidator).
 * - La autenticación y autorización (por ejemplo, solo ADMIN) se validan previamente.
 */
export const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const category = new Category({ name, description });
    await category.save();

    res.status(201).json({
      success: true,
      message: "Category created successfully",
      category
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error creating category",
      error: err.message
    });
  }
};

/**
 * Obtiene todas las categorías.
 */
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({
      success: true,
      categories
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching categories",
      error: err.message
    });
  }
};

/**
 * Elimina una categoría (solo ADMIN).
 * Se asume que se ha validado previamente:
 * - El token JWT
 * - El rol del usuario mediante middleware.
 * - La existencia de la categoría (categoryExistsValidator).
 */
export const deleteCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    await Category.findByIdAndDelete(categoryId);
    res.status(200).json({
      success: true,
      message: "Category deleted successfully"
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error deleting category",
      error: err.message
    });
  }
};
