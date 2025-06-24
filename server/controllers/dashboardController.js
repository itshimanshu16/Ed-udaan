const Campaign = require('../models/Campaign');
const CampaignApplication = require('../models/CampaignApplication');
const Notification = require('../models/Notification');

 

exports.getInfluencerDashboard = async (req, res) => {
  try {
    const totalApplications = await CampaignApplication.countDocuments({ influencer: req.user._id });
    const accepted = await CampaignApplication.countDocuments({
      influencer: req.user._id,
      status: 'accepted',
    });
    res.json({ totalApplications, accepted });
  } catch (err) {
    res.status(500).json({ message: 'Error loading dashboard', error: err.message });
  }
};
