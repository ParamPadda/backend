// badgesRoutes.js (CommonJS style)
const express = require('express');
const { getAllBadges, createBadge } = require('../../controllers/badgesController');

const router = express.Router();

router.get('/', getAllBadges);
router.post('/', createBadge);

module.exports = router;
