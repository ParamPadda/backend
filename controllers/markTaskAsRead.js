const userModel = require("../models/user");

const markTaskAsRead = async (req, res) => {
  const { id } = req.params; // task ID in URL param
  const { email, status, task } = req.body; // task is the full task info object

  console.log("Received request:", { id, email, status, task }); // Debug log

  if (!email || !id) {
    return res.status(400).json({ message: "Email and task ID are required." });
  }

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      console.log(`User not found with email: ${email}`);
      return res.status(404).json({ message: "User not found" });
    }

    // Initialize completedTasks array if it doesn't exist
    if (!user.completedTasks) {
      user.completedTasks = [];
    }

    console.log("Current completed tasks:", user.completedTasks);

    // Check if task is already completed
    // Handle both string IDs and object IDs
    const alreadyCompleted = user.completedTasks.some(completedTask => {
      if (typeof completedTask === 'string') {
        return completedTask === id;
      }
      if (typeof completedTask === 'object' && completedTask !== null) {
        return (completedTask._id && completedTask._id.toString() === id) || 
               (completedTask.id && completedTask.id.toString() === id);
      }
      return false;
    });

    console.log(`Task ${id} already completed:`, alreadyCompleted);

    if (status === "complete" && !alreadyCompleted) {
      if (!task || !task._id) {
        return res.status(400).json({ message: "Complete task info must be provided." });
      }
      
      // Store the task ID as string for consistency
      user.completedTasks.push(id);
      console.log("Added task to completed tasks");
      
    } else if (status === "undo" && alreadyCompleted) {
      // Remove the task from completed tasks
      user.completedTasks = user.completedTasks.filter((completedTask) => {
        if (typeof completedTask === 'string') {
          return completedTask !== id;
        }
        if (typeof completedTask === 'object' && completedTask !== null) {
          return !(
            (completedTask._id && completedTask._id.toString() === id) || 
            (completedTask.id && completedTask.id.toString() === id)
          );
        }
        return true;
      });
      console.log("Removed task from completed tasks");
      
    } else {
      console.log("No action taken - task status unchanged");
    }

    await user.save();
    console.log("User saved successfully");

    res.status(200).json({ 
      success: true, 
      message: "Task status updated successfully",
      completedTasks: user.completedTasks 
    });
    
  } catch (error) {
    console.error("Error updating task status:", error);
    res.status(500).json({ 
      success: false,
      message: "Internal server error",
      error: error.message 
    });
  }
};

module.exports = markTaskAsRead;