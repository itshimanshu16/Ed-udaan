import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaPen, FaTrash, FaCheck, FaTimes } from 'react-icons/fa';

function AdminDashboard() {
  const [campaigns, setCampaigns] = useState([]);
  const [applications, setApplications] = useState([]);
  const [influencers, setInfluencers] = useState([]);
  const [formData, setFormData] = useState({ title: '', description: '', budget: '', platform: '' });
  const [editing, setEditing] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [activeTab, setActiveTab] = useState('create');
  const [selectedInfluencer, setSelectedInfluencer] = useState(null);
  const [pendingApplications, setPendingApplications] = useState([]);
  const [leadUpdatingId, setLeadUpdatingId] = useState(null);

  const fetchPendingApplications = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/pending-applications`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPendingApplications(res.data);
    } catch (err) {
      console.error('Error fetching pending applications:', err);
    }
  };
  const token = localStorage.getItem('token');

  const fetchCampaigns = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/campaigns/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCampaigns(res.data);
    } catch (err) {
      console.error('Error fetching campaigns:', err);
    }
  };

  const fetchInfluencers = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/influencers`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setInfluencers(res.data);
    } catch (err) {
      console.error('Error fetching influencers:', err);
    }
  };

  const fetchApplications = async (campaignId) => {
    try {
      setSelectedCampaign(campaignId);
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/campaigns/applications/${campaignId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setApplications(res.data);
    } catch (err) {
      console.error('Error fetching applications:', err);
    }
  };

  const handleSubmit = async () => {
    try {
      const res = editing
        ? await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/campaigns/${formData._id}`, formData, { headers: { Authorization: `Bearer ${token}` } })
        : await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/campaigns/create`, formData, { headers: { Authorization: `Bearer ${token}` } });

      alert(editing ? 'Campaign updated!' : 'Campaign created!');
      setFormData({ title: '', description: '', budget: '', platform: '' });
      setEditing(false);
      fetchCampaigns();
      setActiveTab('campaigns');
    } catch (err) {
      alert('Error submitting campaign.');
      console.error(err);
    }
  };

  const handleEdit = (campaign) => {
    setFormData(campaign);
    setEditing(true);
    setActiveTab('create');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (_id) => {
    if (!confirm('Delete this campaign?')) return;
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/admin/campaign/${_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCampaigns();
    } catch (err) {
      console.error('Error deleting campaign:', err);
    }
  };

  const updateStatus = async (appId, status) => {
    try {
      await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/campaigns/application/${appId}/status`, { status }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchApplications(selectedCampaign);
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const updateLeads = async (_id, leads) => {
    try {
      await axios.put(`${BACKEND}/api/admin/application/${app._id}/update-leads`, {
        leadsGenerated: app.leadsGenerated,
        totalLeadsTarget: app.totalLeadsTarget,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      fetchInfluencers();
      alert("Leads updated!");
    } catch (err) {
      alert("Failed to update leads.");
      console.error(err);
    }
  };
 
  const fetchAcceptedApplications = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/accepted-applications`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setApplications(res.data); // ✅ sets the applications to render
    } catch (err) {
      console.error("❌ Failed to load accepted applications:", err);
    }
  };
  

  const updateLeadsForApplication = async (applicationId, leads) => {
    try {
      await axios.put(`${BACKEND}/api/admin/application/${app._id}/update-leads`, {
        leadsGenerated: app.leadsGenerated,
        totalLeadsTarget: app.totalLeadsTarget,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      
      alert("Leads updated for this campaign!");
      fetchAcceptedApplications(); // Refresh data
    } catch (err) {
      alert("Failed to update leads for application.");
      console.error(err);
    }
  };

  
  useEffect(() => {
    fetchCampaigns();
    fetchInfluencers();
    fetchPendingApplications();
    if (activeTab === 'manageLeads') {
      fetchAcceptedApplications();
    }
  }, [activeTab]);

  const filteredActiveInfluencers = influencers.filter((i) => i.activeCampaigns > 0);

  const TabButton = ({ label, id }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`w-full py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-300 ease-in-out transform hover:scale-105 ${
        activeTab === id
          ? 'bg-gradient-to-br from-indigo-600 to-purple-600 text-white ring-2 ring-indigo-300 shadow-md'
          : 'bg-white/10 text-gray-200 hover:bg-white/20'
      }`}
    >
      {label}
    </button>
  );

  const glowBox = "bg-white/5 border border-white/10 backdrop-blur-md shadow-md";

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#0f0c29] to-[#24243e] text-white p-6">
     <div className='text-center mb-5'>

     <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-pink-300 to-indigo-400">
    🛠️ Admin Dashboard
  </h2>
  
     </div>

      {/* Tabs */}
      <div className="w-full max-w-5xl mx-auto my-1 bg-white/5 backdrop-blur-lg border border-white/10 p-5 rounded-2xl shadow-lg">
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
    
    <TabButton label="Create Campaign" id="create" />
    <TabButton label="All Campaigns" id="campaigns" />
    <TabButton label="All Influencers" id="allInfluencers" />
    <TabButton label="Manage Leads" id="manageLeads" />
    <TabButton label="Pending Applications" id="pendingApplications" />
  </div>
</div>

      {/* Tab Content */}
      {activeTab === 'create' && (
        <div className={`${glowBox} rounded-xl p-6 mb-12`}>
          <h3 className="text-2xl font-bold mb-6">{editing ? '✏️ Edit Campaign' : '➕ Create Campaign'}</h3>
          <div className="grid gap-4">
            <input className="p-3 rounded bg-white/10 text-white" placeholder="Title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
            <textarea className="p-3 rounded bg-white/10 text-white" placeholder="Description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
            <input className="p-3 rounded bg-white/10 text-white" placeholder="Platform" value={formData.platform} onChange={(e) => setFormData({ ...formData, platform: e.target.value })} />
            <input type="number" className="p-3 rounded bg-white/10 text-white" placeholder="Budget ₹" value={formData.budget} onChange={(e) => setFormData({ ...formData, budget: e.target.value })} />
          </div>
          <div className="mt-4 flex justify-between items-center">
            <button onClick={handleSubmit} className={`px-6 py-2 font-bold rounded-full ${editing ? 'bg-yellow-500' : 'bg-indigo-600'}`}>
              {editing ? 'Update' : 'Create'}
            </button>
            {editing && (
              <button onClick={() => { setEditing(false); setFormData({ title: '', description: '', budget: '', platform: '' }); }} className="text-sm text-red-400 underline">
                Cancel Edit
              </button>
            )}
          </div>
        </div>
      )}

     

{activeTab === 'campaigns' && (
  <>
    <div>
      <h3 className="text-2xl font-semibold mb-6">📢 All Campaigns</h3>
      <div className="grid md:grid-cols-2 gap-6">
        {campaigns.map((c) => (
          <div key={c._id} className={`${glowBox} p-5 rounded-xl`}>
            <h4 className="text-xl font-bold text-indigo-300">{c.title}</h4>
            <p className="text-gray-300 mb-2">{c.description}</p>
            <p className="text-sm text-gray-400">Platform: {c.platform}</p>
            <p className="text-sm text-gray-400">Budget: ₹{c.budget}</p>
            <div className="flex justify-between items-center mt-4">
              <button onClick={() => fetchApplications(c._id)} className="text-sm text-blue-400 underline">
                View Applications
              </button>
              <div className="flex gap-3 text-lg">
                <button onClick={() => handleEdit(c)} className="text-yellow-400"><FaPen /></button>
                <button onClick={() => handleDelete(c._id)} className="text-red-500"><FaTrash /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Only show applications below IF selectedCampaign is active and there are applications */}
    {activeTab === 'campaigns' && selectedCampaign && applications.length > 0 && (
  <div className="mt-12">
    <h3 className="text-2xl font-bold mb-6 text-center sm:text-left">📥 Applications</h3>
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {applications.map((a) => (
        <div key={a._id} className="bg-white/5 border border-white/10 p-5 rounded-xl shadow backdrop-blur-sm space-y-3">
          <div>
            <h4 className="text-lg font-semibold text-indigo-300 truncate">{a.influencer?.user?.name || a.influencer?.name || 'Unnamed Influencer'}</h4>
            <p className="text-sm text-gray-300 truncate">📧 {a.influencer?.user?.email || a.influencer?.email || 'N/A'}</p>
            <p className="text-sm text-gray-400">🟡 Status: <span className="text-yellow-300">{a.status}</span></p>
          </div>

          {/* Progress Input */}
          <div>
            <label className="block text-sm text-white mb-1">Progress</label>
            <input
              type="number"
              min={0}
              max={100}
              value={a.progress || 0}
              onChange={(e) => {
                const updated = +e.target.value;
                axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/campaigns/application/${a._id}/progress`, {
                  progress: updated
                }, {
                  headers: { Authorization: `Bearer ${token}` }
                }).then(() => fetchApplications(selectedCampaign));
              }}
              className="w-full p-2 rounded bg-white/10 text-white border border-white/20"
            />
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-2 pt-2">
          {a.status === 'pending' && (
  <div className="mt-3 flex gap-3">
    <button
      onClick={() => updateStatus(a._id, 'accepted')}
      className="flex items-center gap-2 px-4 py-1 bg-green-600 text-white rounded-full text-sm"
    >
      <FaCheck /> Accept
    </button>
    <button
      onClick={() => updateStatus(a._id, 'rejected')}
      className="flex items-center gap-2 px-4 py-1 bg-red-600 text-white rounded-full text-sm"
    >
      <FaTimes /> Reject
    </button>
  </div>
)}

          </div>
        </div>
      ))}
    </div>
  </div>
)}

  </>
)}


      {activeTab === 'activeInfluencers' && (
        <div>
          <h3 className="text-2xl font-bold mb-6">✅ Active Influencers</h3>
          <div className="grid gap-6">
            {filteredActiveInfluencers.map((i) => (
              <div key={i._id} className={`${glowBox} p-5 rounded-xl`}>
                <h4 className="text-lg font-bold text-indigo-300">{i.channelName}</h4>
                <p className="text-sm text-gray-300">Email: {i.email}</p>
                <p className="text-sm text-gray-400">Campaigns Active: {i.activeCampaigns}</p>
              </div>
            ))}
          </div>
        </div>
      )}



{activeTab === 'pendingApplications' && (
  <div>
    <h3 className="text-2xl font-bold mb-6">🕓 Pending Applications</h3>
    {pendingApplications.length === 0 ? (
      <p className="text-gray-400">No pending applications.</p>
    ) : (
      <div className="grid gap-4">
        {pendingApplications.map((a) => (
          <div key={a._id} className={`${glowBox} p-4 rounded-xl`}>
            <h4 className="text-lg font-semibold text-indigo-300">
              {a.influencer?.user?.name || a.influencer?.name || 'Unnamed Influencer'}
            </h4>
            <p className="text-sm text-gray-300">Email: {a.influencer?.user?.email || a.influencer?.email || 'N/A'
}</p>
            <p className="text-sm text-gray-300">Channel: {a.influencer?.channelName}</p>
            <p className="text-sm text-gray-400">Campaign: {a.campaign?.title}</p>
            <p className="text-sm text-gray-400">Platform: {a.campaign?.platform}</p>
            <p className="text-sm text-yellow-300">Status: {a.status}</p>

            <div className="mt-3 flex gap-3">
              <button
                onClick={async () => {
                  await updateStatus(a._id, 'accepted');
                  fetchPendingApplications(); // 🆕 auto-refresh after status change
                }}
                className="flex items-center gap-2 px-4 py-1 bg-green-600 text-white rounded-full text-sm"
              >
                <FaCheck /> Accept
              </button>

              <button
                onClick={async () => {
                  await updateStatus(a._id, 'rejected');
                  fetchPendingApplications(); // 🆕 auto-refresh after status change
                }}
                className="flex items-center gap-2 px-4 py-1 bg-red-600 text-white rounded-full text-sm"
              >
                <FaTimes /> Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
)}




{activeTab === 'allInfluencers' && (
  <div>
    <h3 className="text-2xl font-bold mb-6">👥 All Influencers</h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
  {influencers.map((i) => (
    <div
      key={i._id}
      className="bg-white/5 border border-white/10 rounded-lg p-4 shadow backdrop-blur-md transition hover:scale-[1.02] cursor-pointer"
      onClick={() => setSelectedInfluencer(i)}
    >
      <h4 className="text-base font-semibold text-indigo-300 truncate">{i.user?.name || 'Unnamed Influencer'}</h4>
      <p className="text-sm text-gray-300 truncate">📧 {i.user?.email || 'N/A'}</p>
      <p className="text-sm text-gray-400">📊 Campaigns: {i.totalCampaigns || 0}</p>
    </div>
  ))}
</div>

  </div>
)}
{selectedInfluencer && (
  <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="bg-[#1e1e2f] p-6 rounded-xl w-[90%] max-w-lg text-white relative">
      <button
        className="absolute top-3 right-3 text-white hover:text-red-400"
        onClick={() => setSelectedInfluencer(null)}
      >
        ✖
      </button>
      <h2 className="text-2xl font-bold mb-4">
  {selectedInfluencer.user?.name || 'Unnamed Influencer'}
</h2>
      <p><strong>Email:</strong> {selectedInfluencer.user?.email || 'N/A'}</p>
<p><strong>Channel Name:</strong> {selectedInfluencer.channelName || 'N/A'}</p>
<p><strong>Content Niche:</strong> {selectedInfluencer.niche || 'N/A'}</p>

<p><strong>Telegram:</strong> {selectedInfluencer.telegramLink || 'N/A'}</p>
<p><strong>YouTube:</strong> {selectedInfluencer.youtubeLink || 'N/A'}</p>
<p><strong>Instagram:</strong> {selectedInfluencer.instagramLink || 'N/A'}</p>

<p><strong>Total Subscribers:</strong> {selectedInfluencer.totalSubscribers || 0}</p>
<p><strong>Average Views:</strong> {selectedInfluencer.averageViews || 0}</p>
<p><strong>UPI ID:</strong> {selectedInfluencer.upi || 'N/A'}</p>

<p><strong>Leads:</strong> {selectedInfluencer.leads || 0}</p>
<p><strong>Approved:</strong> {selectedInfluencer.approved ? 'Yes' : 'No'}</p>

    </div>
  </div>
)}


{activeTab === 'manageLeads' && (
  <div>
    <h3 className="text-2xl font-bold mb-6">📈 Manage Influencer Leads</h3>
    <div className="space-y-4">
      {applications.map((app) => (
        <div key={app._id} className="p-4 bg-white/10 rounded-xl">
          <p className="text-lg font-semibold text-indigo-300">
            {app.influencer?.user?.name || app.influencer?.name || 'Unnamed Influencer'}
          </p>
          <p className="text-sm text-gray-300">
            Email: {app.influencer?.user?.email || app.influencer?.email || 'N/A'}
          </p>
          <p className="text-sm text-gray-400 mb-2">
            Leads Progress: {app.leadsGenerated || 0} / {app.totalLeadsTarget || 100}
          </p>

          <div className="flex gap-2 items-center mt-2">
            <input
              type="number"
              placeholder="Generated Leads"
              value={app.leadsGenerated ?? ''}
              onChange={(e) => {
                const val = +e.target.value;
                setApplications((prev) =>
                  prev.map((a) =>
                    a._id === app._id ? { ...a, leadsGenerated: val } : a
                  )
                );
              }}
              className="bg-white/20 p-2 rounded text-white w-28"
            />

            <input
              type="number"
              placeholder="Total Target"
              value={app.totalLeadsTarget ?? ''}
              onChange={(e) => {
                const val = +e.target.value;
                setApplications((prev) =>
                  prev.map((a) =>
                    a._id === app._id ? { ...a, totalLeadsTarget: val } : a
                  )
                );
              }}
              className="bg-white/20 p-2 rounded text-white w-28"
            />

            <button
              className={`relative px-4 py-1 text-white text-sm rounded ${
                leadUpdatingId === app._id
                  ? 'bg-green-800'
                  : 'bg-green-600 hover:bg-green-700'
              }`}
              onClick={async () => {
                setLeadUpdatingId(app._id);
                try {
                  await axios.put(
                    `${import.meta.env.VITE_BACKEND_URL}/api/admin/application/${app._id}/update-leads`,
                    {
                      leadsGenerated: Number(app.leadsGenerated),
                      totalLeadsTarget: Number(app.totalLeadsTarget),
                    },
                    {
                      headers: { Authorization: `Bearer ${token}` },
                    }
                  );
                  alert('✅ Leads updated!');
                } catch (err) {
                  alert('❌ Failed to update leads.');
                } finally {
                  setLeadUpdatingId(null);
                }
              }}
            >
              {leadUpdatingId === app._id ? (
                <span className="animate-pulse">Updating...</span>
              ) : (
                'Update'
              )}
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
)}



    </div>
  );
}

export default AdminDashboard;
