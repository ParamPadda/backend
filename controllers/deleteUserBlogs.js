// const blogModel = require("../models/blog.model");
// const userModel = require("../models/user");

// const deleteBlog = async (req, res) => {
//   const { blogId, email } = req.params;
// console.log(blogId)
//   try {
//     // Validate input
//     if (!blogId || !email) {
//       return res.status(400).json({ success: false, message: "Blog ID and email are required" });
//     }

//     // Delete blog from blog collection
 

//     // Remove reference from user's blogs array
//     await userModel.findOneAndUpdate(
//       { email },
//       { $pull: { blogs: blogId } },
//       { new: true }
//     );

//     res.status(200).json({ success: true, message: "Blog deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting blog:", error);
//     res.status(500).json({ success: false, message: "Server error", error: error.message });
//   }
// };

// module.exports = deleteBlog;

const blogModel = require("../models/blog.model");
const userModel = require("../models/user");

const deleteBlog = async (req, res) => {
  console.log("DELETE blog route hit!");
  const { blogId, email } = req.params;
  console.log("Params:", req.params);
  console.log(`Attempting to delete Blog ID: ${blogId} for user: ${email}`);

  try {
    if (!blogId || !email) {
      console.warn("Missing blogId or email");
      return res.status(400).json({
        success: false,
        message: "Blog ID and email are required",
      });
    }

    // Check if blog exists before deleting
    const blogExists = await blogModel.findOne({ id: blogId });
    if (!blogExists) {
      console.warn(`No blog found with id: ${blogId}`);
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }
    console.log("Blog found, proceeding to delete...");

    // Delete the blog from blogs collection
    const deletedBlog = await blogModel.findOneAndDelete({ id: blogId });

    if (!deletedBlog) {
      // This case is unlikely now since we checked existence before
      console.warn("Blog was not deleted (not found)");
      return res.status(404).json({
        success: false,
        message: "Blog not found during deletion",
      });
    }
    console.log("Blog deleted from blogs collection");

    // Remove the blog reference from the user's blogs array
    const updatedUser = await userModel.findOneAndUpdate(
      { email },
      { $pull: { blogs: blogId } },
      { new: true }
    );

    if (!updatedUser) {
      console.warn("User not found when removing blog reference");
      return res.status(404).json({
        success: false,
        message: "User not found when updating blogs",
      });
    }
    console.log("User blogs array updated");

    res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = deleteBlog;

