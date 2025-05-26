const userModel = require("../models/user");

const getCompletedTasks = async (req, res) => {
  const { email } = req.params;
  console.log("Fetching completed tasks for email:", email);

  if (!email) {
    return res.status(400).json({ message: "Email is required." });
  }

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      console.log(`User not found with email: ${email}`);
      return res.status(404).json({ message: "User not found" });
    }

    // Return completedTasks array (can be empty)
    const completedTasks = user.completedTasks || [];
    
    console.log("Found completed tasks:", completedTasks);

    // Ensure all completed tasks are in consistent format (task IDs as strings)
    const normalizedCompletedTasks = completedTasks.map(task => {
      if (typeof task === 'string') {
        return task;
      }
      if (typeof task === 'object' && task !== null) {
        return task._id ? task._id.toString() : task.id ? task.id.toString() : task;
      }
      return task;
    });

    res.status(200).json({ 
      success: true, 
      completedTasks: normalizedCompletedTasks 
    });
    
  } catch (error) {
    console.error("Error fetching completed tasks:", error);
    res.status(500).json({ 
      success: false,
      message: "Internal server error",
      error: error.message 
    });
  }
};

module.exports = getCompletedTasks;