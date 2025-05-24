const blogModel = require("../models/blog.model");
const userModel = require("../models/user");

const deleteBlog = async (req, res) => {
  const { blogId, email } = req.params;
console.log(blogId)
  try {
    // Validate input
    if (!blogId || !email) {
      return res.status(400).json({ success: false, message: "Blog ID and email are required" });
    }

    // Delete blog from blog collection
 

    // Remove reference from user's blogs array
    await userModel.findOneAndUpdate(
      { email },
      { $pull: { blogs: blogId } },
      { new: true }
    );

    res.status(200).json({ success: true, message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

module.exports = deleteBlog;
