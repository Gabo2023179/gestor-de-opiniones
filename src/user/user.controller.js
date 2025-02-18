import User from "./user.model.js"

export const getUserById = async (req, res) => {
    try {
        const { usuario } = req
        const user = await User.findById(usuario)

        if(!user){
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado"
            })
        }

        return res.status(200).json({
            success: true,
            user
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al obtener el usuario",
            error: err.message
        })
    }
}

export const getUsers = async (req, res) => {
    try {
        const { limite = 5, desde = 0 } = req.query
        const query = { status: true }

        const [total, users ] = await Promise.all([
            User.countDocuments(query),
            User.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
        ])

        return res.status(200).json({
            success: true,
            total,
            users
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al obtener los usuarios",
            error: err.message
        })
    }
}

export const updateUser = async (req, res) => {  
    try {  
        const { uid } = req.params; // Obtiene el ID del usuario (`uid`) desde los parámetros de la URL.
        const data = req.body; // Obtiene los datos a actualizar desde el `body` de la petición.

        // Busca el usuario en la base de datos y actualiza sus datos.
        const user = await User.findByIdAndUpdate(uid, data, { new: true });  
        // 🔹 `uid` → ID del usuario a actualizar.
        // 🔹 `data` → Datos que se actualizarán.
        // 🔹 `{ new: true }` → Devuelve el usuario actualizado en la respuesta.


        res.status(200).json({
            success: true, 
            msg: 'Usuario Actualizado', 
            user, 
        });

    } catch (err) {  
        res.status(500).json({
            success: false, 
            msg: 'Error al actualizar usuario', 
            error: err.message 
        });
    }
};
