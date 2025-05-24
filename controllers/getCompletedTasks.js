// controllers/getCompletedTasks.js

const userModel = require("../models/user");

const getCompletedTasks = async (req, res) => {
  const { email } = req.params;
console.log(email)
  if (!email) {
    return res.status(400).json({ message: "Email is required." });
  }

  try {
    const user = await userModel.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Return completedTasks array (can be empty)
    const completedTasks = user.completedTasks || [];

    res.status(200).json({ success: true, completedTasks });
  } catch (error) {
    console.error("Error fetching completed tasks", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = getCompletedTasks;
