const blogModel = require("../models/blog.model");
const userModel = require("../models/user");

const deleteBlog = async (req, res) => {
  const { blogId, email } = req.params;
  console.log("DELETE blog route hit!");
  console.log("Params:", req.params);
  console.log(`Attempting to delete Blog ID: ${blogId} for user: ${email}`);

  try {
    // Validate input
    if (!blogId || !email) {
      return res.status(400).json({ 
        success: false, 
        message: "Blog ID and email are required" 
      });
    }

    // First, find the blog to make sure it exists
    const blog = await blogModel.findOne({ id: blogId });
    if (!blog) {
      console.log(`No blog found with id: ${blogId}`);
      return res.status(404).json({ 
        success: false, 
        message: "Blog not found" 
      });
    }

    // Delete blog from blog collection using the custom 'id' field
    const deletedBlog = await blogModel.findOneAndDelete({ id: blogId });
    
    if (!deletedBlog) {
      return res.status(404).json({ 
        success: false, 
        message: "Blog not found for deletion" 
      });
    }

    // Remove reference from user's blogs array using the blog's _id
    const updatedUser = await userModel.findOneAndUpdate(
      { email },
      { $pull: { blogs: { id: blogId } } }, // Pull by the custom id field
      { new: true }
    );

    if (!updatedUser) {
      console.log(`User with email ${email} not found`);
      // Blog was deleted but user update failed - this is still a partial success
    }

    console.log(`Blog ${blogId} deleted successfully`);
    res.status(200).json({ 
      success: true, 
      message: "Blog deleted successfully" 
    });
    
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(500).json({ 
      success: false, 
      message: "Server error", 
      error: error.message 
    });
  }
};

module.exports = deleteBlog;