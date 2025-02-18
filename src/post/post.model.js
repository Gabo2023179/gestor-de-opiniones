import { Schema, model } from 'mongoose';

const postSchema = new Schema({
    title:{
        type: String,
        required: [true, "Title is required"],
        maxLength: [15, "Title cannot exceed 15 characters"]
    },
    category:{
        type: String,
        required: [true, "Category is required"],
        maxLength: [15, "Category cannot exceed 15 characters"]

    },
    text:{
        type: String,
        required: [true, "The principal text is required"],
        maxLength: [500, "The principal text cannot exceed 500 characters"]

    },
    status:{
        type: Boolean,
        default: true
    }

},
{
    versionKey: false,
    timeStamps: true
})

postSchema.methods.toJson = function(){
    const {_id, ...usuario} = this.toObject()
    usuario.uid = _id
    return usuario
}