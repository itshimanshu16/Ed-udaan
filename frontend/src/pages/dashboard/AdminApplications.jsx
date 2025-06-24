import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

function AdminApplications() {
  const [applications, setApplications] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchAllApplications();
  }, []);

  const fetchAllApplications = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/campaigns/applications`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // Only keep pending apps, sorted by created date
      const pendingApps = res.data
        .filter(app => app.status === 'pending')
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      setApplications(pendingApps);
    } catch (err) {
      console.error('Failed to fetch applications', err);
    }
  };

  const updateStatus = async (appId, status) => {
    await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/campaigns/application/${appId}/status`, { status }, {
      headers: { Authorization: `Bearer ${token}` }
    });

    setApplications(prev => prev.filter(app => app._id !== appId)); // Remove on reject/accept
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">📬 Pending Campaign Applications</h2>

      {applications.length === 0 ? (
        <p className="text-gray-400">🎉 No pending applications right now.</p>
      ) : (
        <div className="space-y-4">
          <AnimatePresence>
            {applications.map(app => (
              <motion.div
                key={app._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                layout
                className="border border-gray-300 p-4 rounded bg-white shadow"
              >
                <p><strong>Influencer:</strong> {app.influencer?.channelName || app.influencer?.email}</p>
                <p><strong>Campaign:</strong> {app.campaign?.title || 'Untitled'}</p>
                <p><strong>Applied:</strong> {new Date(app.createdAt).toLocaleString()}</p>
                <div className="mt-3 space-x-3">
                  <button
                    onClick={() => updateStatus(app._id, 'accepted')}
                    className="px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => updateStatus(app._id, 'rejected')}
                    className="px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Reject
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

export default AdminApplications;
