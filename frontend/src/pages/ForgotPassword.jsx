import { motion } from 'framer-motion';

function ForgotPassword() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-[#0f0c29] to-[#24243e] px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full p-8 rounded-xl backdrop-blur-lg bg-white/5 border border-white/10 shadow-2xl"
      >
        <h2 className="text-3xl font-bold text-white text-center mb-4">
          Forgot Your Password?
        </h2>
        <p className="text-gray-300 text-center mb-6">
          This feature is coming soon. Stay tuned!
        </p>
      </motion.div>
    </div>
  );
}

export default ForgotPassword;
