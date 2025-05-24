const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  deleteUser,
  undoDeleteUser,
  updateBadge
} = require('../../controllers/userController');

// GET all users (non-deleted)
router.get('/', getAllUsers);

// DELETE user (soft delete)
router.put('/delete/:id', deleteUser);

// UNDO delete
router.put('/restore/:id', undoDeleteUser);

// UPDATE badge
router.put('/badge/:id', updateBadge);

module.exports = router;
