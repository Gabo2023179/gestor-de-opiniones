// src/post/post.controller.js
import Post from "./post.model.js";

export const createPost = async (req, res) => {
  try {
    const data = req.body;
    const usuario = req.usuario._id; // Se obtiene desde el middleware de JWT
    const post = new Post(data);
    await post.save();
    res.status(201).json({
      success: true,
      message: "Post created successfully",
      post
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error creating post",
      error: err.message
    });
  }
};

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('author', 'username name');
    res.status(200).json({
      success: true,
      posts
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching posts",
      error: err.message
    });
  }
};

export const getPostById = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId).populate('author', 'username name');
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found"
      });
    }
    res.status(200).json({
      success: true,
      post
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching post",
      error: err.message
    });
  }
};

export const updatePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found"
      });
    }
    // Solo el autor puede editar su propia publicación
    if (post.author.toString() !== req.usuario._id.toString()) {
      return res.status(401).json({
        success: false,
        message: "Not authorized to update this post"
      });
    }
    const { title, category, content } = req.body;
    if (title) post.title = title;
    if (category) post.category = category;
    if (content) post.content = content;
    await post.save();
    res.status(200).json({
      success: true,
      message: "Post updated successfully",
      post
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error updating post",
      error: err.message
    });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found"
      });
    }
    // Solo el autor puede eliminar su propia publicación
    if (post.author.toString() !== req.usuario._id.toString()) {
      return res.status(401).json({
        success: false,
        message: "Not authorized to delete this post"
      });
    }
    await post.remove();
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
