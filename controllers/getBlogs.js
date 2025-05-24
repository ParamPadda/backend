const blogModel = require("../models/blog.model");

const getBlogs = async (req, res) => {
  try {
    const blogs = await blogModel.find().sort({ createdAt: -1 });

    const formattedBlogs = blogs.map(blog => {
      const imageSrc = `data:${blog.image.contentType};base64,${blog.image.data}`;
      const audioSrc = `data:${blog.audio.contentType};base64,${blog.audio.data}`;

      return {
        _id: blog._id,
        title: blog.title,
        about: blog.about,
        imageSrc,
        audioSrc,
        createdAt: blog.createdAt,
      };
    });

    res.status(200).json({
      success: true,
      data:blogs,
      blogs: formattedBlogs,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

module.exports = getBlogs;
