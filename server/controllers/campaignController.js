const Campaign = require('../models/Campaign');
const CampaignApplication = require('../models/CampaignApplication');
const Notification = require('../models/Notification');
const InfluencerProfile = require('../models/InfluencerProfile');
 


exports.updateApplicationLeads = async (req, res) => {
  try {
    const { id } = req.params;
    const { leads } = req.body;

    const app = await CampaignApplication.findByIdAndUpdate(
      id,
      { leads },
      { new: true }
    );

    if (!app) return res.status(404).json({ message: 'Application not found' });

    res.json({ message: 'Leads updated', application: app });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update leads', error: err.message });
  }
};


exports.createCampaign = async (req, res) => {
  try {
    if (!['admin'].includes(req.user.role)) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const {
      title,
      description,
      formLink,
      moneyPerLead,
      // ... add other fields you expect from frontend
    } = req.body;
    
    const campaign = new Campaign({
      title,
      description,
      formLink,
      moneyPerLead,
      admin: req.user._id,
      // ... add other fields if required
    });
        await campaign.save();
res.status(201).json({ message: 'Campaign created successfully', campaign });

  } catch (err) {
    res.status(500).json({ message: 'Error creating campaign', error: err.message });
  }
};

exports.getAllCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find();
    res.json(campaigns);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching campaigns', error: err.message });
  }
};

exports.applyToCampaign = async (req, res) => {
  try {
    const existing = await CampaignApplication.findOne({
      campaign: req.params.campaignId,
      influencer: req.user._id,
    });

    if (existing) return res.status(400).json({ message: 'Already applied to this campaign' });


    const influencerProfile = await InfluencerProfile.findOne({ user: req.user._id });

if (!influencerProfile) {
  return res.status(404).json({ message: 'Influencer profile not found' });
}

const application = new CampaignApplication({
  campaign: req.params.campaignId,
  influencer: influencerProfile._id,  // ✅ correct: this is an InfluencerProfile._id
});

await application.save();

    res.json({ message: 'Application submitted', application });
  } catch (err) {
    res.status(500).json({ message: 'Error applying', error: err.message });
  }
};

// controllers/campaignController.js
exports.getCampaignApplications = async (req, res) => {
  try {
    const apps = await CampaignApplication.find({ campaign: req.params.campaignId })
      .populate({
        path: 'influencer',
        populate: {
          path: 'user',
          model: 'User',
          select: 'name email'
        }
      });

    res.json(apps);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching applications', error: err.message });
  }
};


exports.updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const app = await CampaignApplication.findByIdAndUpdate(
      req.params.appId,
      { status },
      { new: true }
    );

    const appData = await CampaignApplication.findById(req.params.appId).populate('campaign influencer');

    await new Notification({
      user: appData.influencer._id,
      userType: 'InfluencerProfile',
      message: `Your application for "${appData.campaign.title}" was ${appData.status}`,
    }).save();

    res.json(app);
  } catch (err) {
    res.status(500).json({ message: 'Error updating application status', error: err.message });
  }
};
exports.updateCampaign = async (req, res) => {
  try {
    const { _id } = req.params;
    const { formLink, moneyPerLead, title, description } = req.body;

    const campaign = await Campaign.findById(_id);

    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }

    campaign.title = title || campaign.title;
    campaign.description = description || campaign.description;
    campaign.formLink = formLink || campaign.formLink;
    campaign.moneyPerLead = moneyPerLead !== undefined ? moneyPerLead : campaign.moneyPerLead;

    await campaign.save();

    return res.status(200).json({ message: 'Campaign updated successfully', campaign });
    
  } catch (err) {
    return res.status(500).json({ message: 'Error updating campaign', error: err.message });
  }
};

exports.deleteCampaign = async (req, res) => {
  try {
    const { _id } = req.params;
    const deleted = await Campaign.findByIdAndDelete(_id);

    if (!deleted) {
      return res.status(404).json({ message: 'Campaign not found' });
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({ success: true, message: 'Campaign deleted successfully' });
      } catch (err) {
    res.status(500).json({ message: 'Error deleting campaign', error: err.message });
  }
};
// Update progress of a specific campaign application
// Update progress of a specific campaign application
exports.updateApplicationProgress = async (req, res) => {
  try {
    const { progress } = req.body;
    const app = await CampaignApplication.findByIdAndUpdate(
      req.params.appId,
      { progress },
      { new: true }
    );
    res.json(app);
  } catch (err) {
    res.status(500).json({ message: 'Error updating progress', error: err.message });
  }
};           

 
