const mongoose = require('mongoose');

const influencerProfileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: String,
  email: String,
  niche: String,
  channelName: String,
  telegramLink: String,
  youtubeLink: String,
  instagramLink: String,
  totalSubscribers: Number,
  averageViews: Number,
  upi: String,
  approved: { type: Boolean, default: false },
  // Example addition to InfluencerProfile.js
  
  leads: {
    type: Number,
    default: 0
  },
  leadLogs: [
    {
      date: { type: Date, default: Date.now },
      leads: Number
    }
  ],
}, { timestamps: true });

module.exports = mongoose.model('InfluencerProfile', influencerProfileSchema);