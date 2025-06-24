const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');
const { getMyApplications, getInfluencerStats } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.get('/my-applications', verifyToken, getMyApplications);
router.get('/stats', verifyToken, getInfluencerStats);

module.exports = router;
