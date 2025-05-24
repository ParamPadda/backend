const userModel = require("../models/user");

const markTaskAsRead = async (req, res) => {
  const { id } = req.params; // task ID in URL param
  const { email, status, task } = req.body; // task is the full task info object

  if (!email || !id) {
    return res.status(400).json({ message: "Email and task ID are required." });
  }

  try {
    const user = await userModel.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (!user.completedTasks) user.completedTasks = [];

    // Check if task is already completed by matching task.id
    const alreadyCompleted = user.completedTasks.some(t => t.id === id);

    if (status === "complete" && !alreadyCompleted) {
      if (!task || task.id !== id) {
        return res.status(400).json({ message: "Complete task info must be provided." });
      }
      user.completedTasks.push(task);
    } else if (status === "undo" && alreadyCompleted) {
      user.completedTasks = user.completedTasks.filter((t) => t.id !== id);
    }

    await user.save();

    res.status(200).json({ success: true, message: "Task status updated successfully" });
  } catch (error) {
    console.error("Error updating task status", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = markTaskAsRead;
