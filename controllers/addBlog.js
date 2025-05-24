const multer = require("multer");
const blogModel = require("../models/blog.model");
const userModel = require("../models/user");

// Multer config
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
}).fields([
  { name: "image", maxCount: 1 },
  { name: "audio", maxCount: 1 },
]);

const addBlog = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ success: false, message: err.message });
    }

    const { title, about, email } = req.body;

    if (!title || !about || !email) {
      return res.status(400).json({ success: false, message: "Title, about, and email are required." });
    }

    if (!req.files.image || !req.files.audio) {
      return res.status(400).json({ success: false, message: "Image and audio files are required." });
    }

    try {
      // Check if blog with the same title already exists
      const existingBlog = await blogModel.findOne({ title });
      if (existingBlog) {
        return res.status(409).json({ success: false, message: "A blog with this title already exists." });
      }

      // Convert files to base64
      const base64Image = req.files.image[0].buffer.toString("base64");
      const base64Audio = req.files.audio[0].buffer.toString("base64");

      // Create new blog
      const newBlog = new blogModel({
        title,
        about,
        image: {
          data: base64Image,
          contentType: req.files.image[0].mimetype,
        },
        audio: {
          data: base64Audio,
          contentType: req.files.audio[0].mimetype,
        },
      });

      await newBlog.save();
              console.log(newBlog)
      // Find user and push blog reference
      const user = await userModel.findOne({ email });
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found with this email." });
      }

      user.blogs.push(newBlog);
      await user.save();

      res.status(201).json({
        success: true,
        message: "Blog created and linked to user.",
        blogId: newBlog._id,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
  });
};

module.exports = addBlog;
