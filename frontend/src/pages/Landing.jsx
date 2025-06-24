import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUsers, FaChartLine, FaRupeeSign, FaCheckCircle, FaBullhorn, FaClipboardCheck, FaCogs, FaUserCheck, FaSignal, FaChartPie } from 'react-icons/fa';
import { useState } from 'react';
import emailjs from '@emailjs/browser';

const Landing = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleContactSubmit = (e) => {
    e.preventDefault();
    const templateParams = {
      user_name: formData.name,
      user_email: formData.email,
      message: formData.message,
    };

    emailjs
      .send('service_odp7kg8', 'template_3v74l8g', templateParams, 'mh75IGUBvbg3Dhe2z')
      .then(() => {
        alert('✅ Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      })
      .catch((error) => {
        console.error('❌ EmailJS Error:', error);
        alert('Failed to send message. Please try again later.');
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#0f0c29] to-[#24243e] text-white px-6 md:px-16 pt-36 font-sans">

      {/* Hero Section */}
      <motion.div
        className="text-center max-w-4xl mx-auto"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6 text-white">
          Verified Student Leads via <span className="text-indigo-400">Influencer Marketing</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-10">
          Scale your Ed-Tech startup with performance-based student outreach using Telegram & YouTube influencers.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => navigate('/signup')}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-full shadow-md transition duration-300"
          >
            Join as Influencer
          </button>
          <button
            onClick={() => navigate('/partner')}
            className="bg-white text-indigo-700 hover:text-indigo-900 px-6 py-3 rounded-full transition duration-300"
          >
            Partner with Us
          </button>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <div>
          <FaUsers className="text-4xl text-indigo-400 mx-auto mb-3" />
          <h2 className="text-2xl font-semibold">500+</h2>
          <p className="text-gray-400">Influencers Onboarded</p>
        </div>
        <div>
          <FaChartLine className="text-4xl text-indigo-400 mx-auto mb-3" />
          <h2 className="text-2xl font-semibold">10,000+</h2>
          <p className="text-gray-400">Leads Delivered</p>
        </div>
        <div>
          <FaRupeeSign className="text-4xl text-indigo-400 mx-auto mb-3" />
          <h2 className="text-2xl font-semibold">₹5L+</h2>
          <p className="text-gray-400">Earnings Paid Out</p>
        </div>
      </motion.div>

      {/* How It Works Section */}
      <section className="mt-28 text-center">
        <h2 className="text-4xl font-bold mb-10">How EduScale Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { icon: <FaClipboardCheck />, title: "Ed-Tech Companies Submit Campaign", desc: "Companies define their target audience and campaign requirements." },
            { icon: <FaUserCheck />, title: "Influencers Join Campaigns", desc: "Verified influencers choose campaigns matching their niche and audience." },
            { icon: <FaBullhorn />, title: "Content Creation & Promotion", desc: "Influencers create engaging content on Telegram/YouTube." },
            { icon: <FaCogs />, title: "Verified Lead Generation", desc: "We track and verify lead submissions for each campaign." },
          ].map((step, index) => (
            <div key={index} className="bg-white/10 p-6 rounded-xl shadow-md border border-white/10 backdrop-blur-md">
              <div className="text-indigo-400 text-3xl mb-3">{step.icon}</div>
              <h3 className="font-semibold text-xl mb-2">{step.title}</h3>
              <p className="text-sm text-gray-300">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose EduScale */}
      <section className="mt-28 text-center">
        <h2 className="text-4xl font-bold mb-10">Why Choose EduScale?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: <FaCheckCircle />,
              title: "Verified Influencers",
              desc: "All influencers are manually verified with authentic follower base and engagement."
            },
            {
              icon: <FaSignal />,
              title: "Quality Leads",
              desc: "Advanced tracking ensures genuine student leads with verified contact info."
            },
            {
              icon: <FaChartPie />,
              title: "Real-time Analytics",
              desc: "Campaign tracking, lead flow, and ROI dashboard available for ed-tech partners."
            },
          ].map((feature, index) => (
            <div key={index} className="bg-white/10 p-6 rounded-xl shadow-md border border-white/10 backdrop-blur-md">
              <div className="text-indigo-400 text-3xl mb-3">{feature.icon}</div>
              <h3 className="font-semibold text-xl mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-300">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Form */}
      <motion.div
        className="mt-28 max-w-3xl mx-auto bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-8 shadow-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h3 className="text-3xl font-bold mb-6 text-center text-white">📩 Contact Us</h3>
        <form onSubmit={handleContactSubmit} className="grid gap-4">
          <input
            type="text"
            placeholder="Your Name"
            required
            className="p-3 rounded bg-white/10 text-white placeholder-gray-300 focus:ring-2 focus:ring-indigo-500"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            name="user_name"
          />
          <input
            type="email"
            placeholder="Your Email"
            required
            className="p-3 rounded bg-white/10 text-white placeholder-gray-300 focus:ring-2 focus:ring-indigo-500"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            name="user_email"
          />
          <textarea
            placeholder="Your Message"
            required
            rows="5"
            className="p-3 rounded bg-white/10 text-white placeholder-gray-300 focus:ring-2 focus:ring-indigo-500"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            name="message"
          ></textarea>
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-full font-semibold transition"
          >
            Send Message
          </button>
        </form>
      </motion.div>

      {/* Footer */}
      <footer className="mt-24 border-t border-white/10 pt-8 pb-6 text-center text-sm text-gray-400 bg-black/5">
  <div className="mb-2">
    <span className="text-indigo-400 font-semibold text-base">EduScale</span> &copy; {new Date().getFullYear()} — All rights reserved.
  </div>

  <div className="flex justify-center gap-6 text-xs mt-2">
    <a href="#privacy" className="hover:text-white transition duration-200">Privacy Policy</a>
    <a href="#terms" className="hover:text-white transition duration-200">Terms of Use</a>
    <a href="mailto:support@eduscale.com" className="hover:text-white transition duration-200">Contact</a>
  </div>

  <div className="mt-4 text-xs text-gray-500">
    Made By <a href="https://instagram.com/himanshu__1610" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-white transition duration-200">@himanshu__1610</a>
  </div>
</footer>

    </div>
  );
};

export default Landing;
