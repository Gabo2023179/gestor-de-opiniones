import { Schema, model } from "mongoose";

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      unique: true, // Asegurar que no haya duplicados
      trim: true,
      lowercase: true, // Evita nombres duplicados con diferente capitalización
      maxLength: [50, "Category name cannot exceed 50 characters"]
    },
    description: {
      type: String,
      trim: true,
      maxLength: [200, "Description cannot exceed 200 characters"]
    }
  },
  {
    timestamps: true // Agrega createdAt y updatedAt automáticamente
  }
);

// Asegurar unicidad real a nivel de base de datos
categorySchema.index({ name: 1 }, { unique: true });

export default model("Category", categorySchema);
