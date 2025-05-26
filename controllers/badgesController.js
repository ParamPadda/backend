// import Badge from '../models/badgeModel.js';
// import userModel from '../models/user.js';

// // GET all badges
// export const getAllBadges = async (req, res) => {
//   try {
//     const badges = await Badge.find().populate('assignedTo', 'name email').sort({ createdAt: -1 });
//     res.json(badges);
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to fetch badges' });
//   }
// };

// // POST new badge
// export const createBadge = async (req, res) => {
//   try {
//     const { title, icon, color } = req.body;
//     if (!title || !icon) {
//       return res.status(400).json({ error: 'Title and icon are required' });
//     }
//     const newBadge = new Badge({ title, icon, color, assignedTo });
//     await newBadge.save();
//     res.status(201).json(newBadge);
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to add badge' });
//   }
// };
// // GET badges by user email
// export const getBadgesByUserEmail = async (req, res) => {
//   try {
//     const { email } = req.params;
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }
//     const badges = await Badge.find({ assignedTo: user._id });
//     res.json(badges);
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to fetch badges' });
//   }
// };



const Badge = require('../models/badgeModel.js');
const User = require('../models/user.js');

// GET all badges
const getAllBadges = async (req, res) => {
  try {
    const badges = await Badge.find().populate('assignedTo', 'name email').sort({ createdAt: -1 });
    res.json(badges);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch badges' });
  }
};

// POST new badge
const createBadge = async (req, res) => {
  try {
    const { title, icon, color, assignedTo } = req.body;
    if (!title || !icon) {
      return res.status(400).json({ error: 'Title and icon are required' });
    }
    const newBadge = new Badge({ title, icon, color, assignedTo });
    await newBadge.save();
    res.status(201).json(newBadge);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add badge' });
  }
};

// GET badges by user email
const getBadgesByUserEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const badges = await Badge.find({ assignedTo: user._id });
    res.json(badges);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch badges' });
  }
};

module.exports = {
  getAllBadges,
  createBadge,
  getBadgesByUserEmail,
};
