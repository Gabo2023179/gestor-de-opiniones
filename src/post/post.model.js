import { Schema, model } from 'mongoose';

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true
    },
    content: {
      type: String,
      required: [true, "Content is required"]
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

postSchema.methods.toJSON = function(){
    const {_id, ...publi} = this.toObject()
    publi.uid = _id
    return publi
}

export default model("Post", postSchema);
