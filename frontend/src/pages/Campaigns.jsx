// src/pages/Campaigns.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/campaigns/all`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCampaigns(res.data);
      } catch (err) {
        console.error('❌ Error fetching campaigns:', err);
      }
    };

    fetchCampaigns();
  }, []);

  const handleApply = async (campaignId) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/campaigns/apply/${campaignId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('✅ Applied successfully');
    } catch (err) {
      alert(err.response?.data?.message || 'Error applying');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Available Campaigns</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {campaigns.map((c) => (
          <div key={c._id} className="border p-4 rounded shadow">
            <h3 className="text-xl font-semibold">{c.title || c.name}</h3>
            <p className="text-gray-600">{c.description}</p>
            <p><strong>Platform:</strong> {c.platform}</p>
            <p><strong>Budget:</strong> ₹{c.budget}</p>
            <button
              onClick={() => handleApply(c._id)}
              className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Apply
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Campaigns;
