const mongoose = require("mongoose");

const blogSubSchema = new mongoose.Schema(
  {
    id: String,
    title: String,
    about: String,
    image: {
      data: String,
      contentType: String,
    },
    audio: {
      data: String,
      contentType: String,
    },
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },

    blogs: [blogSubSchema], // Embedded blog entries

   completedTasks: [
  {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DailyTask",
    },
    title: String,
    description: String,
  },
],
 // Tracks completed daily tasks by this user
  },
  { timestamps: true }
);

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;
