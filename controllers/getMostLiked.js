const blogModel = require("../models/blog.model");

const getMarkMostLiked = async (req, res) => {
try {
    const mostLikedBlogs = await blogModel.find({ mostLiked: true }).sort({ updatedAt: -1 });
    res.status(200).json({
      success: true,
      blogs: mostLikedBlogs,
    });blogModel
  } catch (error) {
    console.error('Error fetching most liked blogs:', error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

module.exports = getMarkMostLiked;
