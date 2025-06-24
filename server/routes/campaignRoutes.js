const express = require('express');
const router = express.Router();
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');
const {
  createCampaign,
  getAllCampaigns,
  applyToCampaign,
  getCampaignApplications,
  updateApplicationStatus,
  updateCampaign,
  deleteCampaign,
  updateApplicationProgress,
  updateApplicationLeads, // ✅ correct import
} = require('../controllers/campaignController');

// Campaign CRUD
router.post('/create', verifyToken, createCampaign);                 // Create campaign
router.get('/all', verifyToken, getAllCampaigns);                    // Get all campaigns
router.put('/:_id', verifyToken, updateCampaign);                    // Update campaign
router.delete('/admin/campaign/:_id', verifyToken, deleteCampaign);  // Delete campaign

// Applications
router.post('/apply/:campaignId', verifyToken, applyToCampaign);           // Apply to a campaign
router.get('/applications/:campaignId', verifyToken, getCampaignApplications); // Get apps for a campaign
router.put('/application/:appId/status', verifyToken, updateApplicationStatus); // Update app status
router.put('/application/:appId/progress', verifyToken, isAdmin, updateApplicationProgress); // Update progress
router.put('/application/:id/update-leads', verifyToken, isAdmin, updateApplicationLeads);   // Update leads per application

module.exports = router;