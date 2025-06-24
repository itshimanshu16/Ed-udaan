import { useEffect, useState } from 'react';
import axios from 'axios';

const AdminStats = () => {
  const [stats, setStats] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/stats`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStats(res.data);
      } catch (err) {
        console.error('Failed to load stats:', err);
      }
    };

    fetchStats();
  }, []);

  if (!stats) return <p className="text-center mt-6">Loading stats...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">📊 Admin Dashboard Stats</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-blue-100 p-4 rounded-xl shadow">
          <h3 className="text-xl font-semibold">Companies</h3>
          <p className="text-3xl">{stats.companies}</p>
        </div>
        <div className="bg-green-100 p-4 rounded-xl shadow">
          <h3 className="text-xl font-semibold">Influencers</h3>
          <p className="text-3xl">{stats.influencers}</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded-xl shadow">
          <h3 className="text-xl font-semibold">Campaigns</h3>
          <p className="text-3xl">{stats.campaigns}</p>
        </div>
        <div className="bg-pink-100 p-4 rounded-xl shadow">
          <h3 className="text-xl font-semibold">Applications</h3>
          <p className="text-3xl">{stats.applications}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminStats;
