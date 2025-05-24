const User = require('../models/user');

// GET all non-deleted users
const getAllUsers = async (req, res) => {
  try {
    // const users = await User.find({ isDeleted: false });
     const users = await User.find({
            $or: [
                { isDeleted: false },       // Users explicitly marked as not deleted
                { isDeleted: { $exists: false } } // Users who don't have the field yet
            ]
        });
    console.log(users);
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Error fetching users", error: err });
  }
};
// get api to get all users whose isDeleted is true
// SOFT DELETE user
const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, { isDeleted: true });
    //add user model to save delete users and add to tag staus which will be like isDeleted: true that means user is deleted so we can get delete user and recover
    res.status(200).json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting user", error: err });
  }
};

// UNDO delete
const undoDeleteUser = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, { isDeleted: false });
    //update the user model in that update the isDeleted key which boolean to false
    res.status(200).json({ message: "User restored" });
  } catch (err) {
    res.status(500).json({ message: "Error restoring user", error: err });
  }
};

// ADD or UPDATE badge (optional)
const updateBadge = async (req, res) => {
  const { badge } = req.body;
  try {
    await User.findByIdAndUpdate(req.params.id, { badge });
    res.status(200).json({ message: "Badge updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error updating badge", error: err });
  }
};

module.exports = {
  getAllUsers,
  deleteUser,
  undoDeleteUser,
  updateBadge
};
