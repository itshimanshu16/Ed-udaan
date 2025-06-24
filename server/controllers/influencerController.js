const InfluencerProfile = require('../models/InfluencerProfile');

// ✅ Get influencer profile
exports.getProfile = async (req, res) => {
  try {
    let profile = await InfluencerProfile.findOne({ user: req.user._id });

    if (!profile) {
      // Auto-create blank profile
      profile = new InfluencerProfile({
        user: req.user._id,
        category: '',
        platform: '',
        leads: 0,
        approved: false,
        followers: { telegram: 0, youtube: 0 },
        pricing: { telegram: 0, youtube: 0 },
      });
      await profile.save();
    }

    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching/creating profile', error: err.message });
  }
};


// ✅ Update influencer profile
exports.updateInfluencerProfile = async (req, res) => {
  try {
    const updated = await InfluencerProfile.findOneAndUpdate(
      { user: req.user._id },
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ message: 'Profile not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Error updating profile', error: err.message });
  }
};

// ✅ Create or update profile based on existence
exports.createOrUpdateInfluencer = async (req, res) => {
  try {
    const data = { ...req.body, user: req.user._id };

    const existing = await InfluencerProfile.findOne({ user: req.user._id });

    if (existing) {
      const updated = await InfluencerProfile.findOneAndUpdate(
        { user: req.user._id },
        { $set: req.body },
        { new: true, runValidators: true }
      );
      return res.json(updated);
    }

    const newProfile = new InfluencerProfile(data);
    await newProfile.save();
    res.status(201).json(newProfile);
  } catch (err) {
    res.status(500).json({ message: 'Error saving influencer profile', error: err.message });
  }
};

// ✅ Optional duplicate getter (if used separately)
exports.getMyInfluencerProfile = async (req, res) => {
  try {
    const profile = await InfluencerProfile.findOne({ user: req.user._id });
    if (!profile) return res.status(404).json({ message: 'Profile not found' });
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching profile', error: err.message });
  }
};