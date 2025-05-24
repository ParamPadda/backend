const DailyTask = require("../models/task");

// Add a new task
const addTask = async (req, res) => {
  try {
    const { title, description, image } = req.body;
    const newTask = new DailyTask({ title, description, image });
    await newTask.save();
    res.status(201).json({ success: true, task: newTask });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to add task", error: err.message });
  }
};

// Get all tasks
const getAllTasks = async (req, res) => {
  try {
    const tasks = await DailyTask.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, tasks });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch tasks", error: err.message });
  }
};

// Delete task
const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    await DailyTask.findByIdAndDelete(taskId);
    res.status(200).json({ success: true, message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to delete task", error: err.message });
  }
};

module.exports = {
  addTask,
  getAllTasks,
  deleteTask,
};
