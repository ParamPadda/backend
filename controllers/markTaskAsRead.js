const userModel = require("../models/user");

const markTaskAsRead = async (req, res) => {
  const { id } = req.params; // task ID from URL
  const { email, status, task } = req.body;

  if (!email || !id) {
    return res.status(400).json({ success: false, message: "Email and task ID are required." });
  }

  try {
    const user = await userModel.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    if (!user.completedTasks) user.completedTasks = [];

    // Debugging logs
    console.log("User completedTasks:", user.completedTasks);
    console.log("Looking for task ID:", id);

    // Fix: convert ObjectId to string before comparison
    const alreadyCompleted = user.completedTasks.some(t => t.id.toString() === id);

    // ✅ Mark as complete
    if (status === "complete") {
      if (alreadyCompleted) {
        return res.status(409).json({ success: false, message: "Task already marked as completed" });
      }

      if (!task || task.id !== id) {
        return res.status(400).json({ success: false, message: "Full task info must be provided." });
      }

      user.completedTasks.push(task);
    }
    // ✅ Undo
    else if (status === "undo") {
      if (!alreadyCompleted) {
        return res.status(404).json({ success: false, message: "Completed task not found" });
      }

      user.completedTasks = user.completedTasks.filter(t => t.id.toString() !== id);
    }

    // Save changes
    await user.save();

    res.status(200).json({
      success: true,
      message: status === "complete" ? "Task marked as completed" : "Task marked as incomplete",
    });
  } catch (error) {
    console.error("Error updating task status", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = markTaskAsRead;
