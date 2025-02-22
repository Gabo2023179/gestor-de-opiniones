import { Schema, model } from "mongoose";

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      trim: true,
      lowercase: true, // Normaliza el texto a minúsculas para evitar duplicados con mayúsculas
      maxLength: [50, "Category name cannot exceed 50 characters"]
    },
    description: {
      type: String,
      trim: true,
      maxLength: [200, "Description cannot exceed 200 characters"]
    }
  },
  {
    timestamps: true
  }
);

// ✅ Mantén el índice único aquí, eliminando `unique: true` dentro del campo name
categorySchema.index({ name: 1 }, { unique: true });

export default model("Category", categorySchema);
