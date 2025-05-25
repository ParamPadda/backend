const User = require("../models/user"); 

// Remove completed task by email and taskId
const removeCompletedTask = async (req, res) => {
  const { email, taskId } = req.params;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const beforeCount = user.completedTasks.length;

    // Assuming completedTasks is an array of objects with _id field
    user.completedTasks = user.completedTasks.filter(
      (task) => task._id.toString() !== taskId
    );

    if (user.completedTasks.length === beforeCount) {
      // Task not found in completedTasks
      return res.status(404).json({ success: false, message: "Completed task not found" });
    }

    await user.save();

    return res.json({ success: true, message: "Completed task removed successfully" });
  } catch (error) {
    console.error("Error removing completed task:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = removeCompletedTask;
