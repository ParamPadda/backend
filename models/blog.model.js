const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const blogSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      default: uuidv4,
      unique: true,
    },
    title: { type: String, required: true, unique: true },
    about: { type: String, required: true },
    image: {
      data: String,
      contentType: String,
    },
    audio: {
      data: String,
      contentType: String,
    },
    likes: {
      type: Number,
      default: 0,
    },
    mostLiked: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);
