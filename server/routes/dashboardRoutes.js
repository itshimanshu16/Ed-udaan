const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');
const {   getInfluencerDashboard } = require('../controllers/dashboardController');

 router.get('/influencer', verifyToken, getInfluencerDashboard);

module.exports = router;