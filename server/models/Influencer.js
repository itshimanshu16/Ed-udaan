const mongoose = require('mongoose');

const influencerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  channelName: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  // New Fields
  niche: { type: String }, // optional
  telegramLink: { type: String },
  youtubeLink: { type: String },
  instagramLink: { type: String },
  totalSubscribers: { type: Number, required: true },
  averageViews: { type: Number, required: true },
  upi: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Influencer', influencerSchema);