const CampaignApplication = require('../models/CampaignApplication'); 
const Campaign = require('../models/Campaign');
const InfluencerProfile = require('../models/InfluencerProfile');

const getInfluencerStats = async (req, res) => {
  try {
    const influencerId = req.user._id;

    const totalApplications = await CampaignApplication.countDocuments({ influencer: influencerId });

    // dummy earnings logic
    const totalEarningsAgg = await CampaignApplication.aggregate([
      { $match: { influencer: influencerId, status: 'accepted' } },
      { $group: { _id: null, total: { $sum: '$earnedAmount' } } }
    ]);

    const totalEarnings = totalEarningsAgg[0]?.total || 0;

    res.json({
      totalApplications,
      totalEarnings
    });
  } catch (error) {
    console.error('Error in getInfluencerStats:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getMyApplications = async (req, res) => {
  try {
    const userId = req.user._id;

    const influencer = await InfluencerProfile.findOne({ user: userId });
    if (!influencer) return res.status(404).json({ message: "Influencer not found" });

    const applications = await CampaignApplication.find({ influencer: influencer._id })
      .populate('campaign') // ✅ Ensure campaign is fully populated
      .sort({ createdAt: -1 });

    res.json(applications);
  } catch (err) {
    console.error("Error fetching applications:", err);
    res.status(500).json({ message: "Error fetching applications", error: err.message });
  }
};




module.exports = {
  getInfluencerStats,
  getMyApplications
};