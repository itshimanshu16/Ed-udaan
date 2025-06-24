import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock } from 'lucide-react'; // use lucide-react for icons

function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you! Your request has been submitted.');
    // EmailJS or backend integration can go here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] flex items-center justify-center px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-6xl bg-white/10 backdrop-blur-xl border border-white/10 shadow-xl rounded-3xl overflow-hidden flex flex-col md:flex-row"
      >
        {/* Left - Form */}
        <div className="w-full md:w-1/2 p-10 bg-black/30 space-y-6">
          <h2 className="text-4xl font-extrabold text-white mb-4">Partner With Us</h2>
          <p className="text-gray-300 mb-6">
            Let’s collaborate to create something incredible. Fill out the form and we’ll get in touch!
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="name"
              type="text"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
            <input
              name="email"
              type="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
            <input
              name="company"
              type="text"
              placeholder="Company / Channel Name"
              value={formData.company}
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
            <textarea
              name="message"
              rows="4"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
            <button
              type="submit"
              className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-3 rounded-xl font-semibold transition duration-300"
            >
              Submit
            </button>
          </form>
        </div>

        {/* Right - Contact Info */}
        <div className="w-full md:w-1/2 bg-gradient-to-br from-[#1e1e2f] to-[#1b1b2d] text-white p-10 flex flex-col justify-center space-y-6">
          <h3 className="text-3xl font-bold mb-4">Contact Details</h3>
          <div className="flex items-center space-x-4">
            <MapPin className="text-indigo-400" />
            <div>
              <p className="text-sm text-gray-400">Address</p>
              <p>EduScale Pvt. Ltd., Delhi, India</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Phone className="text-indigo-400" />
            <div>
              <p className="text-sm text-gray-400">Phone</p>
              <p>+91 99909 88811</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Mail className="text-indigo-400" />
            <div>
              <p className="text-sm text-gray-400">Email</p>
              <p>support@eduscale.com</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
             
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default ContactPage;
