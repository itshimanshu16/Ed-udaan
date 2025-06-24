import { useEffect, useState } from 'react';
import axios from 'axios';

function MyApplications() {
  const [applications, setApplications] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users/my-applications`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setApplications(res.data);
      } catch (err) {
        console.error('Failed to load applications:', err);
      }
    };

    fetchApplications();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">📋 My Campaign Applications</h2>
      {applications.length === 0 ? (
        <p>No applications yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {applications.map((app) => (
            <div key={app._id} className="border p-4 rounded shadow">
              <h3 className="text-lg font-bold">{app.campaign?.title}</h3>
              <p>{app.campaign?.description}</p>
              <p className="text-sm text-gray-600">Platform: {app.campaign?.platform}</p>
              <p className="text-sm text-blue-600">Status: {app.status}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyApplications;
