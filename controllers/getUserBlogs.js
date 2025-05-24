const userModel = require("../models/user");

const getUserBlogs = async (req, res) => {
  const { email } = req.params; // You can use req.params or req.body if preferred
  console.log(email);
  try {
    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Email is required" });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    console.log(user.blogs);
    const formattedBlogs = user.blogs.map((blog) => {
      const imageSrc = `data:${blog.image.contentType};base64,${blog.image.data}`;
      const audioSrc = `data:${blog.audio.contentType};base64,${blog.audio.data}`;

      return {
        id: blog.id,
        title: blog.title,
        about: blog.about,
        imageSrc,
        audioSrc,
        createdAt: blog.createdAt || user.createdAt, // fallback if blog timestamp missing
      };
    });

    res.status(200).json({
      success: true,
      userEmail: user.email,
      blogs: formattedBlogs,
    });
  } catch (error) {
    console.error("Error fetching user blogs:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

module.exports = getUserBlogs;
