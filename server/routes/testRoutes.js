// server/routes/testRoutes.js
const express = require('express');
const router = express.Router();
const Campaign = require('../models/Campaign');

router.get('/demo-campaigns', async (req, res) => {
  try {
    const all = await Campaign.find();
    res.json(all);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching demo campaigns', error: err.message });
  }
});

module.exports = router;
