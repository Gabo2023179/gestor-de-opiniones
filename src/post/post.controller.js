import Post from "./post.model.js"

export const updatePost = async (req, res) => {
    try {
        const { uid } = req.params;
        const data = req.body

        const post = await Post.findByIdAndUpdate(uid, data, { new: true }); 
    
        res.status(200).json({
            success: true, 
            msg: 'Post Actualizado', 
            user, 
        });

    } catch (err) {
        res.status(500).json({
            success: false, 
            msg: 'Error al actualizar el post', 
            error: err.message 
        });
    }
}

export const deletePost = async(req, res) => {
    try {
        const { usuario } = req;

        if(!usuario || !usuario._id){
            return res.status(400).json({
                success: false,
                message: "ID de post no proporcionado"
            });
        }

        const post = await Post.findByIdAndUpdate(usuario._id, { status: false }, { new: true });

        return res.status(200).json({  // código 200 (OK) indicando éxito
            success: true,  
            message: "Post eliminado",  
            user: user.username  
        });

    } catch (err) {
        return res.status(500).json({  // código 500 (Internal Server Error)
            success: false,  
            message: "Error al eliminar el post", 
            error: err.message  // Devuelve el mensaje del error específico para depuración
        });
    };
}