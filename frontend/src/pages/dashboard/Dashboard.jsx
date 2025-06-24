import React, { useEffect, useState } from 'react';
import InfluencerDashboard from './dashboard/InfluencerDashboard';
import CompanyDashboard from './dashboard/CompanyDashboard';
import AdminDashboard from './dashboard/AdminDashboard';
import axios from 'axios';

const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/profile`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(res.data);
      } catch (err) {
        console.error('Error fetching user:', err);
      }
    };

    fetchProfile();
  }, []);

  if (!user) return <div className="text-center mt-10">Loading dashboard...</div>;

  switch (user.role) {
    case 'influencer':
      return <InfluencerDashboard user={user} />;
    case 'admin':
      return <AdminDashboard user={user} />;
    case 'company':
      return <CompanyDashboard user={user} />;
    default:
      return <div className="text-center mt-10">Invalid role</div>;
  }
};

export default Dashboard;
