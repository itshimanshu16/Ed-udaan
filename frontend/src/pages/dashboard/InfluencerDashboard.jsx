import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // import styles for toast

import { FaCoins, FaUsers, FaClipboardList } from 'react-icons/fa';
import InfluencerProfileForm from '../../components/InfluencerProfileForm';
import ProgressBar from '../../components/ProgressBar';

const InfluencerDashboard = () => {
  const [loadingCampaignIds, setLoadingCampaignIds] = useState([]);
  const [applications, setApplications] = useState([]);
  const [availableCampaigns, setAvailableCampaigns] = useState([]);
  const [activeCampaigns, setActiveCampaigns] = useState([]);
  const [stats, setStats] = useState({
    totalLeads: 0,
    totalEarnings: 0,
    totalApplications: 0,
  });
  const [profile, setProfile] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [activeTab, setActiveTab] = useState('my-campaigns');
  const [editProfileMode, setEditProfileMode] = useState(false);
  const Info = ({ label, value }) => (
    <p>
      <span className="font-semibold text-indigo-100">{label}:</span>{' '}
      <span className="text-gray-200">{value || 'N/A'}</span>
    </p>
  );
  
  const token = localStorage.getItem('token');
  const appliedSectionRef = useRef(null);

  const fetchDashboardData = async () => {
    try {
      const [applicationsRes, statsRes, campaignsRes] = await Promise.all([
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users/my-applications`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users/stats`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/campaigns/all`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      const apps = applicationsRes.data;
      setApplications(apps);
      setStats(statsRes.data);

      const notApplied = campaignsRes.data.filter(c => {
        const app = apps.find(a => a.campaign?._id === c._id);
        return !app || app.status === 'rejected';
      });

      const active = apps.filter(app => app.status === 'accepted');

      setAvailableCampaigns(notApplied);
      setActiveCampaigns(active);
    } catch (err) {
      console.error('❌ Failed to fetch dashboard data:', err);
    }
  };

  const applyToCampaign = async (_id) => {
    if (loadingCampaignIds.includes(_id)) return;
  
    setLoadingCampaignIds((prev) => [...prev, _id]);
    
    toast.success('✅ Application submitted!', {
      position: 'top-right',
      autoClose: 2500,
    });
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/campaigns/apply/${_id}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
  
      await fetchDashboardData();
  
      setTimeout(() => {
        appliedSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 200);
    } catch (err) {
      toast.error(err.response?.data?.message || '❌ Error applying to campaign', {
        position: 'top-right',
        autoClose: 3000,
      });
    } finally {
      setLoadingCampaignIds((prev) => prev.filter((id) => id !== _id));
    }
  };
  

  const renderBadge = (status) => {
    const base = 'px-3 py-1 rounded-full text-xs font-semibold';
    switch (status) {
      case 'accepted':
        return <span className={`${base} bg-green-600/20 text-green-300`}>Accepted</span>;
      case 'rejected':
        return <span className={`${base} bg-red-600/20 text-red-400`}>Rejected</span>;
      default:
        return <span className={`${base} bg-yellow-600/20 text-yellow-300`}>Pending</span>;
    }
  };

  const fetchProfile = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/influencer/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfile(res.data);
    } catch (err) {
      console.error("❌ Error loading profile:", err);
    } finally {
      setLoadingProfile(false);
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchDashboardData();
  }, []);

  const tabs = [
    { id: 'my-campaigns', label: 'My Campaigns' },
    { id: 'applied-campaigns', label: 'Applied Campaigns' },
    { id: 'available-campaigns', label: 'Available Campaigns' },
    { id: 'profile', label: 'Profile' },
    // { id: 'edit-profile', label: 'Edit Profile' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#0f0c29] to-[#24243e] text-white px-6 py-10">
     {/* 🚀 Influencer Dashboard Title */}
<motion.div
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  className="text-center mb-6"
>
  <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
    👑 Influencer Dashboard
  </h1>
   
</motion.div>

{/* 🌟 Navigation Panel */}
<div className="mb-12">
  <div className="w-full max-w-6xl mx-auto p-6 rounded-3xl bg-gradient-to-br from-white/5 via-white/10 to-white/5 backdrop-blur-lg border border-white/10 shadow-2xl">
    

    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`py-4 px-4 rounded-xl text-sm font-semibold transition duration-300 transform hover:scale-105 hover:shadow-xl flex flex-col items-center justify-center ${
            activeTab === tab.id
              ? 'bg-gradient-to-tr from-purple-600 to-indigo-600 text-white ring-2 ring-purple-400'
              : 'bg-white/10 text-gray-100 hover:bg-white/20'
          }`}
        >
          {/* Optional: Add matching emojis or icons here */}
          <span className="text-lg mb-1">
            {tab.id === 'my-campaigns' && '📈'}
            {tab.id === 'applied-campaigns' && '📝'}
            {tab.id === 'available-campaigns' && '📢'}
            {tab.id === 'profile' && '👤'}
          </span>
          {tab.label}
        </button>
      ))}
    </div>
  </div>
</div>




      {/* My Campaigns */}
      {activeTab === 'my-campaigns' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
           

          <div className="mb-12 mt-6">
            <h2 className="text-2xl font-semibold mb-4">🔥 My Campaigns</h2>
            {activeCampaigns.length === 0 ? (
              <div className="text-center text-gray-300 p-6 rounded-xl backdrop-blur-md shadow-md">
                <p className="text-lg font-medium mb-2">No campaigns yet</p>
                <p className="text-sm">Once you're accepted into a campaign, it will show up here. 🚀</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {activeCampaigns.map(app => (
                  <motion.div
                    key={app._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-green-900/10 border border-green-500/20 p-5 rounded-xl backdrop-blur-md shadow-md"
                  >
                    <h3 className="text-lg font-semibold text-white mb-2">{app.campaign?.title}</h3>
                    <p className="text-sm text-gray-300 mb-2">{app.campaign?.description?.slice(0, 100)}...</p>
                    {/* Influencer-side progress bar */}
                    <div className="mt-2 space-y-1">
  <p className="text-sm font-medium text-white mb-1">Progress</p>
  <ProgressBar
    value={app.leadsGenerated || 0}
    max={app.totalLeadsTarget || 100}
  />
</div>



                    <p className="text-xs text-gray-400">Platform: {app.campaign?.platform}</p>
                    <p className="text-xs text-gray-400 mb-2">Budget: ₹{app.campaign?.budget}</p>
                    {renderBadge(app.status)}
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* Applied Campaigns */}
      {activeTab === 'applied-campaigns' && (
        <motion.div ref={appliedSectionRef} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
          <h2 className="text-2xl font-semibold mb-4">📋 Applied Campaigns</h2>
          {applications.filter(app => app.status !== 'rejected').length === 0 ? (
            <p className="text-gray-400 mb-8">You haven’t applied to any campaigns yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {applications.filter(app => app.status !== 'rejected').map(app => (
                <motion.div
                  key={app._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white/10 border border-white/10 p-5 rounded-xl backdrop-blur-md shadow-md"
                >
                  <h3 className="text-lg font-semibold text-white mb-2">{app.campaign?.title}</h3>
                  <p className="text-sm text-gray-300 mb-3">{app.campaign?.description?.slice(0, 100)}...</p>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Applied on: {new Date(app.createdAt).toLocaleDateString()}</span>
                    {renderBadge(app.status)}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      )}

      {/* Available Campaigns */}
      {activeTab === 'available-campaigns' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
          <h2 className="text-2xl font-semibold mb-4">📢 Available Campaigns</h2>
          {availableCampaigns.length === 0 ? (
            <p className="text-gray-400">🎉 No new campaigns available. Stay tuned!</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {availableCampaigns.map(c => {
                const alreadyRejected = applications.some(app => app.campaign?._id === c._id && app.status === 'rejected');
                return (
                  <motion.div
                    key={c._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white/10 border border-white/10 p-5 rounded-xl backdrop-blur-md shadow-md"
                  >
                    <h3 className="text-lg font-semibold text-white">{c.title}</h3>
                    <p className="text-sm text-gray-300 mb-1">{c.description}</p>
                    <p className="text-xs text-gray-400">Platform: {c.platform}</p>
                    <p className="text-xs text-gray-400 mb-3">Budget: ₹{c.budget}</p>
                    <button
  onClick={() => applyToCampaign(c._id)}
  className={`${
    alreadyRejected
      ? 'bg-gray-400 cursor-not-allowed'
      : loadingCampaignIds.includes(c._id)
      ? 'bg-indigo-400 cursor-not-allowed'
      : 'bg-indigo-600 hover:bg-indigo-700'
  } text-white px-4 py-2 rounded-full text-sm font-medium transition`}
  disabled={alreadyRejected || loadingCampaignIds.includes(c._id)}
>
  {alreadyRejected
    ? 'Rejected'
    : loadingCampaignIds.includes(c._id)
    ? 'Applying...'
    : 'Apply'}
</button>

                  </motion.div>
                );
              })}
            </div>
          )}
        </motion.div>
      )}

      {/* Profile View */}
      {activeTab === 'profile' && (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
    
    <h2 className="text-2xl font-semibold mb-4">🙋‍♂️ Profile</h2>
    {loadingProfile ? (
      <p className="text-gray-300">Loading profile...</p>
    ) : editProfileMode ? (
      <InfluencerProfileForm
      onCancel={() => setEditProfileMode(false)}
      onSaved={() => {
        setEditProfileMode(false);
        toast.success("✅ Profile updated successfully!", {
          position: "top-right",
          autoClose: 2500,
        });
        fetchProfile(); // refresh profile data after update
      }}
    />
    
    ) : profile ? (
      <div className="    max-w-xl mx-auto bg-white/10 p-6 rounded-xl border border-white/10 shadow-xl backdrop-blur-lg space-y-4 text-white">
  <div className="text-center mb-2">
    <h3 className="text-2xl font-bold text-indigo-300">🎓 Influencer Profile</h3>
    <p className="text-sm text-gray-300">Here’s your complete profile overview</p>
  </div>

  <div className="space-y-2 text-sm">
    <Info label="Full Name" value={profile.name} />
    <Info label="Email" value={profile.email} />
    <Info label="Channel Name" value={profile.channelName} />
    <Info label="Content Niche" value={profile.niche} />
    <Info label="Telegram" value={profile.telegramLink} />
    <Info label="Instagram" value={profile.instagramLink} />
    <Info label="YouTube" value={profile.youtubeLink} />
    <Info label="Total Subscribers" value={profile.totalSubscribers} />
    <Info label="Average Views" value={profile.averageViews} />
    <Info label="UPI ID" value={profile.upi} />
  </div>

  <div className="text-center mt-6">
    <button
      className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-white text-sm rounded-full font-semibold shadow transition"
      onClick={() => setEditProfileMode(true)}
    >
      ✏️ Edit Profile
    </button>
  </div>
</div>

    ) : (
      <p className="text-gray-300">Profile not found.</p>
    )}
  </motion.div>
)}



      {/* Edit Profile */}
      {activeTab === 'edit-profile' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
          <h2 className="text-2xl font-semibold mb-4">✏️ Edit Profile</h2>
          <InfluencerProfileForm />
        </motion.div>
      )}

 

    </div>
  );
};

// Reusable stat card component
const StatCard = ({ icon, label, value }) => (
  <div className="bg-white/10 p-6 rounded-xl shadow-lg flex items-center gap-4 backdrop-blur-md border border-white/10">
    {icon}
    <div>
      <p className="text-sm text-gray-300">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
   
  </div>
);

export default InfluencerDashboard;
