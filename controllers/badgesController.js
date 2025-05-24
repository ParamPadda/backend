import Badge from '../models/badgeModel.js';

// GET all badges
export const getAllBadges = async (req, res) => {
  try {
    const badges = await Badge.find().sort({ createdAt: -1 });
    res.json(badges);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch badges' });
  }
};

// POST new badge
export const createBadge = async (req, res) => {
  try {
    const { title, icon, color } = req.body;
    if (!title || !icon) {
      return res.status(400).json({ error: 'Title and icon are required' });
    }
    const newBadge = new Badge({ title, icon, color });
    await newBadge.save();
    res.status(201).json(newBadge);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add badge' });
  }
};
