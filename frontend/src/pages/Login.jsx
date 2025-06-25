import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const [role, setRole] = useState('influencer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleLogin = async (e) => {
  
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    try {
      const isAdmin = email === 'admin@eduscale.com' && password === 'admin123';

      const url = isAdmin
        ? `${import.meta.env.VITE_BACKEND_URL}/api/auth/admin-login`
        : `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`;

      const res = await axios.post(url, {
        email,
        password,
        role: isAdmin ? 'admin' : role,
      });

      const { token, user } = res.data;

      localStorage.setItem('token', token);
      localStorage.setItem('role', isAdmin ? 'admin' : role);
      localStorage.setItem('user', JSON.stringify(user));

      toast.success('✅ Login successful!', {
        position: 'top-right',
        autoClose: 2500,
      });

      setTimeout(() => {
        if (isAdmin || user.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/dashboard');
        }
      }, 2000);
    } catch (err) {
      console.error('❌ Login error:', err.response?.data || err.message);
      toast.error(err.response?.data?.message || 'Login failed', {
        position: 'top-right',
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-black via-[#0f0c29] to-[#24243e] flex items-center justify-center px-4">
       <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md p-8 rounded-xl backdrop-blur-lg bg-white/5 border border-white/10 shadow-2xl"
      >
        <h2 className="text-3xl font-bold text-white text-center mb-6">Login to EduScale</h2>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="p-3 rounded bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="p-3 rounded bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            disabled={loading}
            className={`mt-4 ${
              loading ? 'bg-gray-600 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
            } text-white font-semibold py-3 rounded transition duration-300`}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
          <p className="text-sm text-gray-300 mt-4 text-center">
            Forgot your password?{' '}
            <span
              onClick={() => navigate('/forgot-password')}
              className="text-indigo-400 hover:underline cursor-pointer"
            >
              Reset here
            </span>
          </p>
        </form>
      </motion.div>
    </div>
  );
}

export default Login;
