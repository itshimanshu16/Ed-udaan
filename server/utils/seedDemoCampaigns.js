// server/utils/seedDemoCampaigns.js
require('dotenv').config();
const mongoose = require('mongoose');
const Campaign = require('../models/Campaign');

// Connect to DB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ DB error:', err));

const seed = async () => {
  try {
    await Campaign.deleteMany(); // optional: clear existing

    const demoCampaigns = [
      {
        title: 'EduScale YouTube Push',
        description: 'Promote our ed-tech platform on YouTube with custom video content.',
        platform: 'YouTube',
        budget: 10000,
        company: demoCompanyId,
      },
      {
        title: 'Telegram Lead Gen',
        description: 'Share our Telegram bot and collect quality student leads.',
        platform: 'Telegram',
        budget: 5000,
        company: demoCompanyId2,
      },
      {
        title: 'Instagram Shoutouts',
        description: 'Post educational memes and swipe-up stories to redirect to our platform.',
        platform: 'Instagram',
        budget: 7000,
        company: demoCompanyId3,
      },
    ];

    await Campaign.insertMany(demoCampaigns);
    console.log('✅ Demo campaigns seeded');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
  }
};

seed();
