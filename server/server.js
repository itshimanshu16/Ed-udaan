const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Default route
app.get('/', (req, res) => {
  res.send('🚀 Welcome to EduScale API!');
});

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
   
})
.then(() => {
  console.log('✅ MongoDB Connected');

  // Start server only after DB connection
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`)
  ); 
  
})
.catch(err => {
  console.error('❌ MongoDB connection error:', err.message);
  process.exit(1);
});

// Route Imports
const authRoutes = require('./routes/authRoutes');
const influencerRoutes = require('./routes/influencerRoutes');
 const adminRoutes = require('./routes/adminRoutes');
const campaignRoutes = require('./routes/campaignRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const userRoutes = require('./routes/userRoutes');
const testRoutes = require('./routes/testRoutes');
 



// API Routes
 app.use('/api/auth', authRoutes);
app.use('/api/influencer', influencerRoutes);
console.log("✅ /api/influencer routes loaded");

 app.use('/api/admin', adminRoutes);
app.use('/api/campaigns', campaignRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/users', userRoutes);
app.use('/api/test', testRoutes);


///// FOR ADMIN CREATION
// Email: admin@eduscale.com

// Password: admin123
// // TEMP: Run only once to create admin
// const Admin = require('./models/Admin');
// const bcrypt = require('bcryptjs');

// const createAdmin = async () => {
//   const existing = await Admin.findOne({ email: 'admin@eduscale.com' });
//   if (existing) {
//     console.log('⚠️ Admin already exists');
//     return;
//   }

//   const hashed = await bcrypt.hash('admin123', 10);
//   const admin = new Admin({ email: 'admin@eduscale.com', password: hashed });
//   await admin.save();
//   console.log('✅ Admin created');
// };

// createAdmin();
