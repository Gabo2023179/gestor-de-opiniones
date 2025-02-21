import Post from "./post.model.js";
import { updatePostFields } from "../helpers/post-helper.js";

/**
 * Crea una nueva publicación.
 */
export const createPost = async (req, res) => {
  try {
    const { title, category, content } = req.body;
    const author = req.usuario._id;

    const post = new Post({ title, category, content, author });
    await post.save();

    res.status(201).json({
      success: true,
      message: "Post created successfully",
      post: post.toJSON()
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error creating post",
      error: err.message
    });
  }
};

/**
 * Obtiene todas las publicaciones.
 */
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("author", "username name");
    res.status(200).json({
      success: true,
      posts: posts.map(post => post.toJSON())
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching posts",
      error: err.message
    });
  }
};

/**
 * Obtiene una publicación por ID.
 */
export const getPostById = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId).populate("author", "username name");

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found"
      });
    }

    res.status(200).json({
      success: true,
      post: post.toJSON()
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching post",
      error: err.message
    });
  }
};

/**
 * Actualiza una publicación.
 */
export const updatePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const updatedPost = await Post.findById(postId);

    if (!updatedPost) {
      return res.status(404).json({
        success: false,
        message: "Post not found"
      });
    }

    // Usamos el helper para actualizar solo si hay cambios
    if (updatePostFields(updatedPost, req.body)) {
      await updatedPost.save();
    }

    res.status(200).json({
      success: true,
      message: "Post updated successfully",
      post: updatedPost.toJSON()
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error updating post",
      error: err.message
    });
  }
};


/**
 * Elimina una publicación.
 */
export const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Post.findByIdAndDelete(postId);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Post deleted successfully"
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error deleting post",
      error: err.message
    });
  }
};
