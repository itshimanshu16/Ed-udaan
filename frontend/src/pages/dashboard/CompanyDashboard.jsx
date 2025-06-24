import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CompanyDashboard = ({ user }) => {
  const [campaigns, setCampaigns] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState('');
  const [platform, setPlatform] = useState('');
  const token = localStorage.getItem('token');

  const fetchCampaigns = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/campaigns/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Only show company's own campaigns
      const myCampaigns = res.data.filter(c => c.company?._id === user._id);
      setCampaigns(myCampaigns);
    } catch (err) {
      console.error('Failed to load campaigns', err);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const handleCreate = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/campaigns/create`,
        { title, description, budget, platform },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Campaign created!');
      setTitle('');
      setDescription('');
      setBudget('');
      setPlatform('');
      fetchCampaigns(); // Refresh
    } catch (err) {
      alert(err.response?.data?.message || 'Error creating campaign');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Welcome, {user.companyName || 'Company'}</h2>

      <div className="bg-gray-100 p-4 rounded-xl mb-6">
        <h3 className="text-lg font-semibold mb-2">Create New Campaign</h3>
        <input className="p-2 border w-full mb-2" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <textarea className="p-2 border w-full mb-2" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <input className="p-2 border w-full mb-2" placeholder="Platform" value={platform} onChange={(e) => setPlatform(e.target.value)} />
        <input className="p-2 border w-full mb-2" type="number" placeholder="Budget ₹" value={budget} onChange={(e) => setBudget(e.target.value)} />
        <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handleCreate}>Create Campaign</button>
      </div>

      <h3 className="text-xl font-semibold mb-2">Your Campaigns</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {campaigns.map(c => (
          <div key={c._id} className="border rounded-lg p-4 shadow">
            <h4 className="text-lg font-bold">{c.title}</h4>
            <p>{c.description}</p>
            <p className="text-sm text-gray-500">Platform: {c.platform}</p>
            <p className="text-sm text-gray-500">Budget: ₹{c.budget}</p>
            <p className="text-sm text-gray-400">Influencer Applications: [Add Later]</p>
            {/* Optional: Edit/Delete buttons */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanyDashboard;
