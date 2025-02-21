import { Schema, model } from "mongoose";

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      lowercase: true, //Evita duplicados con diferente capitalización
      maxLength: 100
    },
    category: {
      type: String,
      required: true,
      trim: true,
      lowercase: true, //Normaliza la categoría
      maxLength: 50
    },
    content: {
      type: String,
      required: true,
      trim: true,
      maxLength: 1000 //Evita contenido excesivo
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  {
    timestamps: true
  }
);

// Formatear la salida JSON ocultando __v y cambiando _id por uid
postSchema.methods.toJSON = function () {
  const { _id, __v, ...post } = this.toObject();
  post.uid = _id;
  return post;
};

export default model("Post", postSchema);
