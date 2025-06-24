const express = require('express');
const router = express.Router();
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');
const { getInfluencerDetailsWithCampaigns, getAllPendingApplications , getAcceptedApplications, updateApplicationLeads } = require('../controllers/adminController');
const { updateInfluencerLeads } = require('../controllers/adminController');
const { createInfluencerWithProfile } = require('../controllers/adminController');
 
const {
    getAdminStats,
  getAllUsers,
  deleteCampaign,
  getAllInfluencers,
  deleteUser,
  approveInfluencer

} = require('../controllers/adminController');
router.get('/influencer-details', verifyToken, isAdmin, getInfluencerDetailsWithCampaigns);
router.get('/influencers', verifyToken, isAdmin, getAllInfluencers);
 router.delete('/user/:_id', verifyToken, isAdmin, deleteUser);
router.put('/approve/:influencerId', verifyToken, isAdmin, approveInfluencer);
router.get('/stats', getAdminStats);
router.get('/users', getAllUsers);
router.delete('/campaign/:_id', deleteCampaign);
router.put('/update-leads/:_id', verifyToken, isAdmin, updateInfluencerLeads);
router.post('/create-influencer', verifyToken, isAdmin, createInfluencerWithProfile);
router.get('/pending-applications', verifyToken, isAdmin, getAllPendingApplications);
router.get('/accepted-applications', verifyToken, isAdmin, getAcceptedApplications);
router.put(
  '/application/:appId/update-leads',
  verifyToken,
  isAdmin,
  updateApplicationLeads
);

module.exports = router;
