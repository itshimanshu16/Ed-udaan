import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    channelName: '',
    niche: '',
    telegramLink: '',
    youtubeLink: '',
    instagramLink: '',
    totalSubscribers: '',
    averageViews: '',
    upi: '',
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    if (formData.password !== formData.confirmPassword) {
      return toast.error("Passwords do not match", {
        position: 'top-right',
        autoClose: 3000,
      });
    }

    setLoading(true);

    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/influencer/register`, {
        ...formData,
        role: 'influencer'
      });

      toast.success('🎉 Signup successful! Redirecting...', {
        position: 'top-right',
        autoClose: 2500,
      });

      setTimeout(() => {
        navigate('/login');
      }, 2500);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Signup failed', {
        position: 'top-right',
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-[#0f0c29] to-[#24243e] px-4">
       <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-xl p-8 rounded-xl backdrop-blur-lg bg-white/5 border border-white/10 shadow-2xl"
      >
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Join as Influencer 🚀
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="name" type="text" placeholder="Full Name *" value={formData.name} onChange={handleChange} required className="formInput" />
          <input name="email" type="email" placeholder="Email *" value={formData.email} onChange={handleChange} required className="formInput" />
          <input name="channelName" type="text" placeholder="Channel Name " value={formData.channelName} onChange={handleChange} className="formInput" />
          <input name="niche" type="text" placeholder="Content Niche (e.g., JEE, NEET, UPSC)" value={formData.niche} onChange={handleChange} className="formInput" />

          <input name="telegramLink" type="url" placeholder="Telegram Channel Link" value={formData.telegramLink} onChange={handleChange} className="formInput" />
          <input name="youtubeLink" type="url" placeholder="YouTube Channel Link" value={formData.youtubeLink} onChange={handleChange} className="formInput" />
          <input name="instagramLink" type="url" placeholder="Instagram Channel Link" value={formData.instagramLink} onChange={handleChange} className="formInput" />

          <div className="flex gap-4">
            <input name="totalSubscribers" type="number" placeholder="Total Subscribers *" value={formData.totalSubscribers} onChange={handleChange} required className="formInput flex-1" />
            <input name="averageViews" type="number" placeholder="Avg. Views/Post *" value={formData.averageViews} onChange={handleChange} required className="formInput flex-1" />
          </div>

          <input name="upi" type="text" placeholder="UPI ID *" value={formData.upi} onChange={handleChange} required className="formInput" />
          <input name="password" type="password" placeholder="Password *" value={formData.password} onChange={handleChange} required className="formInput" />
          <input name="confirmPassword" type="password" placeholder="Confirm Password *" value={formData.confirmPassword} onChange={handleChange} required className="formInput" />

          <button
            type="submit"
            disabled={loading}
            className={`w-full ${
              loading ? 'bg-gray-600 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
            } text-white py-3 rounded font-semibold transition duration-300`}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-300 mt-4">
          Already have an account?{' '}
          <span className="text-indigo-400 hover:underline cursor-pointer" onClick={() => navigate('/login')}>
            Sign in here
          </span>
        </p>
      </motion.div>
    </div>
  );
}

export default Signup;
