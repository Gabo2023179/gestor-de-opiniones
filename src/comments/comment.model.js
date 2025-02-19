// src/comment/comment.model.js
import { Schema, model } from 'mongoose';

const commentSchema = new Schema(
  {
    text: {
      type: String,
      required: [true, "Text is required"]
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    post: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

commentSchema.methods.toJSON = function(){
    const {_id, ...publi} = this.toObject()
    publi.uid = _id
    return publi
}

export default model("Comment", commentSchema);
