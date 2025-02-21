import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        maxLength: [25, "Name cannot exceed 25 characters"]
    },
    surname: {
        type: String,
        required: [true, "Surname is required"],
        maxLength: [25, "Surname cannot exceed 25 characters"]
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true, // 🔹 Elimina espacios innecesarios
        lowercase: true // 🔹 Convierte a minúsculas automáticamente
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true, // 🔹 Elimina espacios innecesarios
        lowercase: true // 🔹 Convierte a minúsculas automáticamente
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    phone: {
        type: String,
        required: true,
        minLength: 8,
        maxLength: 8,
        match: /^[0-9]{8}$/ // 🔹 Solo permite números
    },
    role: {
        type: String,
        required: true,
        enum: ["ADMIN", "CLIENT"]
    },
    status: {
        type: Boolean,
        default: true
    }
},
{
    versionKey: false,
    timestamps: true // 🔹 Corrección de `timeStamps` a `timestamps`
});

// 🔹 Ocultar contraseña y renombrar `_id` a `uid`
userSchema.methods.toJSON = function(){
    const { password, _id, ...usuario } = this.toObject();
    usuario.uid = _id;
    return usuario;
};

export default model("User", userSchema);
