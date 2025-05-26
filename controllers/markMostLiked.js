// const express = require('express');
// const router = express.Router();
// const blogModel = require('../models/blog.model');

// // Mark blog as most liked
// const mostLiked= async (req, res) => {
//   try {
//     const blogId = req.params.id;

//     // Optional: Unmark other blogs if only one most liked is allowed
//     await blogModel.updateMany({}, { mostLiked: false });

//     // Update selected blog
//     const updatedBlog = await blogModel.findByIdAndUpdate(
//       blogId,
//       {
//         $set: { mostLiked: true },
//         $inc: { likes: 1 }
//       },
//       { new: true }
//     );

//     if (!updatedBlog) {
//       return res.status(404).json({ success: false, message: 'Blog not found' });
//     }

//     res.status(200).json({
//       success: true,
//       message: 'Blog marked as most liked',
//       blog: updatedBlog,
//     });
//   } catch (error) {
//     console.error('Error marking most liked blog:', error);
//     res.status(500).json({ success: false, message: 'Server error' });
//   }
// }

// module.exports = mostLiked;



const blogModel = require("../models/blog.model");

const markMostLiked = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Find the current blog
    const currentBlog = await blogModel.findById(id);
    if (!currentBlog) {
      return res.status(404).json({ success: false, message: "Blog not found." });
    }

    // Toggle the mostLiked status
    const newStatus = !currentBlog.mostLiked;
    
    // Update the blog's mostLiked status
    const updatedBlog = await blogModel.findByIdAndUpdate(
      id,
      { mostLiked: newStatus },
      { new: true }
    );

    const action = newStatus ? 'marked as liked' : 'removed from liked';
    
    res.status(200).json({
      success: true,
      message: `Blog ${action} successfully.`,
      data: {
        blogId: updatedBlog._id,
        title: updatedBlog.title,
        mostLiked: updatedBlog.mostLiked
      }
    });
  } catch (error) {
    console.error("Error in markMostLiked:", error);
    res.status(500).json({ 
      success: false, 
      message: "Server error", 
      error: error.message 
    });
  }
};

module.exports = markMostLiked;