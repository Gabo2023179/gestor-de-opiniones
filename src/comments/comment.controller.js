// src/comment/comment.controller.js
import Comment from "./comment.model.js";
import Post from "../post/post.model.js";

export const createComment = async (req, res) => {
  try {
    const { postId, text } = req.body;
    // Verificar que la publicación exista
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found"
      });
    }
    const author = req.usuario._id;
    const comment = new Comment({ text, post: postId, author });
    await comment.save();
    res.status(201).json({
      success: true,
      message: "Comment created successfully",
      comment
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error creating comment",
      error: err.message
    });
  }
};

export const updateComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found"
      });
    }
    // Solo el autor puede editar su comentario
    if (comment.author.toString() !== req.usuario._id.toString()) {
      return res.status(401).json({
        success: false,
        message: "Not authorized to update this comment"
      });
    }
    const { text } = req.body;
    if (text) comment.text = text;
    await comment.save();
    res.status(200).json({
      success: true,
      message: "Comment updated successfully",
      comment
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error updating comment",
      error: err.message
    });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found"
      });
    }
    // Solo el autor puede eliminar su comentario
    if (comment.author.toString() !== req.usuario._id.toString()) {
      return res.status(401).json({
        success: false,
        message: "Not authorized to delete this comment"
      });
    }
    await comment.remove();
    res.status(200).json({
      success: true,
      message: "Comment deleted successfully"
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error deleting comment",
      error: err.message
    });
  }
};

export const getCommentsByPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const comments = await Comment.find({ post: postId }).populate('author', 'username name');
    res.status(200).json({
      success: true,
      comments
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching comments",
      error: err.message
    });
  }
};
