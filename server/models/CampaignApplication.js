// server/models/CampaignApplication.js
const mongoose = require('mongoose');


const campaignApplicationSchema = new mongoose.Schema({
  campaign: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Campaign',
  },
  influencer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'InfluencerProfile',  
  },
  
  
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending'
  },
  progress: { type: Number, default: 0 },
  leadsGenerated: { type: Number, default: 0 },
  totalLeadsTarget: { type: Number, default: 100 },

  appliedAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true }); 

module.exports = mongoose.model('CampaignApplication', campaignApplicationSchema);    