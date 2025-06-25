import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import InfluencerDashboard from './pages/dashboard/InfluencerDashboard';
 import AdminDashboard from './pages/dashboard/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Campaigns from './pages/Campaigns';
import AvailableCampaigns from './pages/dashboard/AvailableCampaigns';
import MyApplications from './pages/dashboard/MyApplications';
import AdminStats from './pages/dashboard/AdminStats';
import AdminApplications from './pages/dashboard/AdminApplications';
import ForgotPassword from './pages/ForgotPassword'; // adjust path if needed
import ContactPage from './pages/ContactPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <Router>
      <Navbar/>
       <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/campaigns" element={<Campaigns />} />
        <Route path="/dashboard" element={<InfluencerDashboard />} />
        <Route path="/available-campaigns" element={<AvailableCampaigns />} />
        <Route path="/my-applications" element={<MyApplications />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/partner" element={<ContactPage />} />

        <Route
          path="/influencer"
          element={
            <ProtectedRoute allowedRoles={['influencer']}>
              <InfluencerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
          
          <Route
          path="/admin-applications"
          element={
          <ProtectedRoute allowedRoles={['admin']}>
          <AdminApplications />
          </ProtectedRoute>}
            />

        <Route path="/admin/stats" element={
         <ProtectedRoute allowedRoles={['admin']}>
         <AdminStats />
       </ProtectedRoute>
} />
        
      </Routes>
      <ToastContainer position="top-right" autoClose={2500} />
    </Router>
  );
}

export default App;


