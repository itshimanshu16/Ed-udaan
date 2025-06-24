const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const InfluencerProfile = require('../models/InfluencerProfile');
const { verifyToken } = require('../middleware/authMiddleware');
const {
  getProfile,
  updateInfluencerProfile,
} = require('../controllers/influencerController');

// ✅ Get influencer profile
router.get('/me', verifyToken, getProfile);

// ✅ Update influencer profile
router.put('/update-profile', verifyToken, updateInfluencerProfile);

// ✅ Influencer Signup (create User + InfluencerProfile)
router.post('/register', async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      channelName,
      niche,
      telegramLink,
      youtubeLink,
      instagramLink,
      upi,
      totalSubscribers,
      averageViews
    } = req.body;

    // Check if user already exists
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'User already exists' });

    const hashed = await bcrypt.hash(password, 10);

    // Create new user with hashed password
    const newUser = new User({
      name,
      email,
      password: hashed,
      role: 'influencer',
    });

    const savedUser = await newUser.save();

    const profile = new InfluencerProfile({
      user: savedUser._id,
      name,
      email, 
      channelName,
      niche,
      telegramLink,
      youtubeLink,
      instagramLink,
      upi,
      totalSubscribers,
      averageViews,
      approved: false,
      leads: 0,
      followers: {
        telegram: 0,
        youtube: 0,
        instagram: 0
      }
    });

    await profile.save();

    res.status(201).json({ message: 'Signup successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error during signup', error: err.message });
  }
});

module.exports = router;