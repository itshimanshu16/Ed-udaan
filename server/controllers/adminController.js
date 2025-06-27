const User = require('../models/User');
const InfluencerProfile = require('../models/InfluencerProfile');
 const Influencer = require('../models/InfluencerProfile');
const Campaign = require('../models/Campaign');
const CampaignApplication = require('../models/CampaignApplication');
const bcrypt = require('bcryptjs');



exports.updateApplicationLeads = async (req, res) => {
  try {
    const { leadsGenerated, totalLeadsTarget } = req.body;

    const app = await CampaignApplication.findById(req.params.appId);
    if (!app) return res.status(404).json({ message: "Application not found" });

    if (leadsGenerated !== undefined) app.leadsGenerated = leadsGenerated;
    if (totalLeadsTarget !== undefined) app.totalLeadsTarget = totalLeadsTarget;

    await app.save();

    res.json({ message: "Leads updated", application: app });
  } catch (err) {
    res.status(500).json({ message: "Failed to update leads", error: err.message });
  }
};


exports.getInfluencerDetailsWithCampaigns = async (req, res) => {
  try {
    const influencers = await InfluencerProfile.find()
      .populate('user', 'name email  ') // Populate user details

    const result = await Promise.all(
      influencers.map(async (inf) => {
        const applications = await CampaignApplication.find({ influencer: inf._id })
        .populate('campaign', 'title platform budget formLink moneyPerLead')

        return {
          _id: inf._id,
          name: inf.user?.name || '',  // Safely access populated user
          email: inf.user?.email || '',
          channelName: inf.channelName,
          applications
        };
      })
    );

    res.json(result);
  } catch (err) {
    console.error('❌ Error fetching influencer details:', err);
    res.status(500).json({ message: 'Error fetching influencer campaign details', error: err.message });
  }
};


exports.updateInfluencerLeads = async (req, res) => {
  try {
    const { leads } = req.body;
    const { _id } = req.params;

    const influencer = await InfluencerProfile.findById(_id);
    if (!influencer) {
      return res.status(404).json({ message: 'Influencer not found' });
    }

    influencer.leads = leads;
    await influencer.save();

    res.json({ message: 'Leads updated successfully', updatedLeads: influencer.leads });
  } catch (err) {
    res.status(500).json({ message: 'Error updating leads', error: err.message });
  }
};

exports.getAllInfluencers = async (req, res) => {
  try {
    const influencers = await InfluencerProfile.find().populate('user', 'name email  ');
    res.json(influencers);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch influencers", error: err.message });
  }
};

 

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params._id;
    await User.findByIdAndDelete(userId);
    await InfluencerProfile.deleteOne({ user: userId });
    res.json({ message: 'User and associated profile deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting user', error: err.message });
  }
};

exports.approveInfluencer = async (req, res) => {
  try {
    const { influencerId } = req.params;
    const profile = await InfluencerProfile.findByIdAndUpdate(influencerId, { approved: true }, { new: true });
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: 'Error approving influencer', error: err.message });
  }
};

exports.getAdminStats = async (req, res) => {
    try {
      
      const influencers = await Influencer.countDocuments();
      const campaigns = await Campaign.countDocuments();
      const applications = await CampaignApplication.countDocuments();
      res.json({ companies, influencers, campaigns, applications });
    } catch (err) {
      res.status(500).json({ message: 'Failed to load stats', error: err.message });
    }
  };
  
  exports.getAllUsers = async (req, res) => {
    try {
      const users = await User.find().select('-password');
      res.json(users);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching users', error: err.message });
    }
  };
   
   
  
  exports.deleteCampaign = async (req, res) => {
    try {
      await Campaign.findByIdAndDelete(req.params._id);
      res.json({ message: 'Campaign deleted' });
    } catch (err) {
      res.status(500).json({ message: 'Error deleting campaign', error: err.message });
    }
  };
  exports.updateInfluencerLeads = async (req, res) => {
    try {
      const influencer = await InfluencerProfile.findById(req.params._id);
      if (!influencer) return res.status(404).json({ message: "Not found" });
  
      influencer.leads = req.body.leads;
      await influencer.save();
  
      res.json({ message: "Leads updated" });
    } catch (err) {
      res.status(500).json({ message: "Error updating leads" });
    }
  };
  exports.createInfluencerWithProfile = async (req, res) => {
    try {
      const { name, email, password, channelName, platform, category, followers  } = req.body;
  
      const existing = await User.findOne({ email });
      if (existing) return res.status(400).json({ message: 'User already exists' });
  
      const hashed = await bcrypt.hash(password, 10);
  
      const user = new User({
        name,
        email,
        password: hashed,
        role: 'influencer'
      });
  
      const savedUser = await user.save();
  
      const profile = new InfluencerProfile({
        user: savedUser._id,
        email: savedUser.email,
        name: savedUser.name,
        channelName: channelName || '',
        platform: platform || '',
        category: category || '',
        leads: 0,
        followers: followers || { telegram: 0, youtube: 0 },
        pricing: { telegram: 0, youtube: 0 }
      });
  
      await profile.save();
  
      res.status(201).json({ message: 'Influencer + Profile created successfully ✅' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error creating influencer', error: err.message });
    }
  };

  exports.getAllPendingApplications = async (req, res) => {
    try {
      const applications = await CampaignApplication.find({ status: 'pending' })
      .populate('campaign', 'title platform budget formLink moneyPerLead')
      .populate({
          path: 'influencer',
          populate: { path: 'user', select: 'name email' }
        });
  
      res.json(applications);
    } catch (err) {
      console.error('Error fetching pending applications:', err);
      res.status(500).json({ message: 'Failed to fetch pending applications', error: err.message });
    }
  };
  
  // ✅ This must be OUTSIDE
  exports.getAcceptedApplications = async (req, res) => {
    try {
      const applications = await CampaignApplication.find({ status: 'accepted' })
        .populate({
          path: 'influencer',
          populate: { path: 'user', select: 'name email' }
        })
        .populate('campaign', 'title platform budget formLink moneyPerLead')
  
      res.json(applications);
    } catch (err) {
      console.error('❌ Error fetching accepted applications:', err);
      res.status(500).json({ message: 'Failed to fetch accepted applications', error: err.message });
    }
  };
