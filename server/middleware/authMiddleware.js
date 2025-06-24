const jwt = require('jsonwebtoken');
const User = require("../models/User");

// ✅ Main Token Verification Middleware (for both influencer/admin)
const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Special case: Hardcoded admin (if using static admin login)
    if (decoded._id === 'admin') {
      req.user = {
        _id: 'admin',
        name: 'Admin User',
        email: 'admin@eduscale.com',
        role: 'admin'
      };
      return next();
    }

    const user = await User.findById(decoded._id).select("-password");
    if (!user) {
      return res.status(401).json({ message: "User not found." });
    }

    req.user = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    };

    // ✅ Optional log for debugging:
    // console.log("Authenticated user:", req.user);

    next();
  } catch (err) {
    console.error("❌ JWT verification failed:", err.message);
    return res.status(401).json({ message: "Invalid token." });
  }
};

// ✅ Admin-only route protection
const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Admins only.' });
  }
  next();
};

// ✅ Optional legacy (not used now, but safe to export)
const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'Access Denied. No token provided.' });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};

module.exports = {
  verifyToken,
  isAdmin,
  requireAdmin: isAdmin,
  authMiddleware // legacy fallback
};