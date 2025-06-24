import { useEffect, useState } from 'react';
import axios from 'axios';

function AvailableCampaigns() {
  const [campaigns, setCampaigns] = useState([]);
  const [applied, setApplied] = useState({});
  const token = localStorage.getItem('token');

  const fetchCampaigns = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/campaigns/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCampaigns(res.data);
    } catch (err) {
      console.error('Error loading campaigns:', err);
    }
  };

  const applyToCampaign = async (_id) => {
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/campaigns/apply/${_id}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Applied Successfully!');
      setApplied((prev) => ({ ...prev, [_id]: true }));
    } catch (err) {
      alert(err.response?.data?.message || 'Error applying');
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">📢 Available Campaigns</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {campaigns.map((c) => (
          <div key={c._id} className="border p-4 rounded shadow bg-white">
            <h3 className="text-xl font-semibold">{c.title}</h3>
            <p>{c.description}</p>
            <p className="text-sm text-gray-500">Platform: {c.platform}</p>
            <p className="text-sm text-gray-500">Budget: ₹{c.budget}</p>
            <button
              className={`mt-2 px-4 py-1 rounded ${
                applied[c._id] ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 text-white'
              }`}
              onClick={() => applyToCampaign(c._id)}
              disabled={applied[c._id]}
            >
              {applied[c._id] ? 'Applied' : 'Apply'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AvailableCampaigns;
