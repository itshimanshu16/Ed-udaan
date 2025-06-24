import { useState, useEffect } from 'react';
import axios from 'axios';

const InfluencerProfileForm = ({ onCancel, onSaved }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/influencer/me`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProfile(res.data);
      } catch (err) {
        alert('Error fetching profile');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/influencer/update-profile`, profile, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("✅ Profile updated successfully!");
      if (onSaved) onSaved(); // callback to close and refresh
    } catch (err) {
      alert("❌ Update failed");
      console.error(err);
    }
  };

  if (loading) return <p className="text-gray-300">Loading...</p>;
  if (!profile) return <p className="text-red-400">Profile not found.</p>;

  return (
    <div className="space-y-4 bg-white/10 p-6 rounded-xl border border-white/10 max-w-xl mx-auto">
      <h3 className="text-xl font-semibold text-indigo-300 text-center mb-4">✏️ Edit Your Profile</h3>

      <input
        className="w-full p-3 rounded bg-white/20 text-white"
        name="name"
        value={profile.name || ''}
        onChange={handleChange}
        placeholder="Full Name"
      />

      <input
        className="w-full p-3 rounded bg-white/20 text-white cursor-not-allowed"
        value={profile.email || ''}
        disabled
        readOnly
        placeholder="Email (not editable)"
      />

      <input
        className="w-full p-3 rounded bg-white/20 text-white"
        name="channelName"
        value={profile.channelName || ''}
        onChange={handleChange}
        placeholder="Channel Name"
      />

      <input
        className="w-full p-3 rounded bg-white/20 text-white"
        name="niche"
        value={profile.niche || ''}
        onChange={handleChange}
        placeholder="Content Niche"
      />

      <input
        className="w-full p-3 rounded bg-white/20 text-white"
        name="telegramLink"
        value={profile.telegramLink || ''}
        onChange={handleChange}
        placeholder="Telegram Channel Link"
      />

      <input
        className="w-full p-3 rounded bg-white/20 text-white"
        name="instagramLink"
        value={profile.instagramLink || ''}
        onChange={handleChange}
        placeholder="Instagram Link"
      />

      <input
        className="w-full p-3 rounded bg-white/20 text-white"
        name="youtubeLink"
        value={profile.youtubeLink || ''}
        onChange={handleChange}
        placeholder="YouTube Link"
      />

      <input
        className="w-full p-3 rounded bg-white/20 text-white"
        name="totalSubscribers"
        type="number"
        value={profile.totalSubscribers || ''}
        onChange={handleChange}
        placeholder="Total Subscribers"
      />

      <input
        className="w-full p-3 rounded bg-white/20 text-white"
        name="averageViews"
        type="number"
        value={profile.averageViews || ''}
        onChange={handleChange}
        placeholder="Average Views"
      />

      <input
        className="w-full p-3 rounded bg-white/20 text-white"
        name="upi"
        value={profile.upi || ''}
        onChange={handleChange}
        placeholder="UPI ID"
      />

      <div className="flex items-center justify-between gap-4 mt-6">
        <button
          onClick={handleSubmit}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-5 py-2 rounded-full transition"
        >
          💾 Save Changes
        </button>

        {onCancel && (
          <button
            onClick={onCancel}
            className="text-red-400 hover:text-red-300 underline text-sm font-medium transition"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
};

export default InfluencerProfileForm;
