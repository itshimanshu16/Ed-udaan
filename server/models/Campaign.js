const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false, }, // or Company
  title: String,
  description: String,
  budget: Number,
  platform: String, // e.g., YouTube, Telegram
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Campaign', campaignSchema);