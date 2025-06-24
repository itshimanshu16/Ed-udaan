import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <nav className=" top-0 left-0 w-full z-50 bg-black backdrop-blur-md text-white px-6 py-4 shadow-lg flex justify-between items-center">
     <div className="flex items-center">
          <img className="w-10 h-10" src="https://i.ibb.co/Ngv4YRJD/1111111111111.png" alt="logo" />
          <Link
            to="/"
            className="ml-2 text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent"
          >
            ED-UDAAN
          </Link>
        </div>

      <div className="space-x-4 flex items-center text-sm sm:text-base">
        {!token && (
          <>
            <Link to="/login" className="hover:text-indigo-300 transition duration-300">Login</Link>
            <Link
              to="/signup"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-full transition duration-300"
            >
              Signup
            </Link>
          </>
        )}
        {token && role === 'influencer' && (
          <Link to="/influencer" className="hover:text-indigo-300 transition duration-300">
            Influencer Dashboard
          </Link>
        )}
        {token && role === 'company' && (
          <Link to="/company" className="hover:text-indigo-300 transition duration-300">
            Company Dashboard
          </Link>
        )}
        {token && role === 'admin' && (
          <Link to="/admin" className="hover:text-indigo-300 transition duration-300">
            Admin Panel
          </Link>
        )}
        {token && (
          <button
            onClick={handleLogout}
            className="ml-2 px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full hover:opacity-90 transition duration-300"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
