const userModel = require("../models/user");

const getUserBlogs = async (req, res) => {
  const { email } = req.params;
  console.log("Fetching blogs for user:", email);

  try {
    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    console.log("User blogs:", user.blogs);

    const formattedBlogs = user.blogs.map((blog) => {
      // Safely create imageSrc
      let imageSrc = "";
      if (blog.image && blog.image.data && blog.image.contentType) {
        const base64Image = blog.image.data.toString("base64");
        imageSrc = `data:${blog.image.contentType};base64,${base64Image}`;
      }

      // Safely create audioSrc
      let audioSrc = "";
      if (blog.audio && blog.audio.data && blog.audio.contentType) {
        const base64Audio = blog.audio.data.toString("base64");
        audioSrc = `data:${blog.audio.contentType};base64,${base64Audio}`;
      }

      return {
        id: blog.id || (blog._id ? blog._id.toString() : null),
        title: blog.title || "",
        about: blog.about || "",
        imageSrc,
        audioSrc,
        createdAt: blog.createdAt || user.createdAt || null,
      };
    }).filter(blog => blog.id !== null); // Filter out blogs without id

    res.status(200).json({
      success: true,
      userEmail: user.email,
      blogs: formattedBlogs,
    });
  } catch (error) {
    console.error("Error fetching user blogs:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

module.exports = getUserBlogs;
