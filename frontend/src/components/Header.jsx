import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { HandHeart, LogOut, Menu, X, PlusCircle, User } from 'lucide-react';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const onLogout = () => {
    logout();
    navigate('/login');
  };

  const guestLinks = (
    <>
      <Link to="/login" className="hover:text-green-400 transition-colors" onClick={() => setIsMenuOpen(false)}>Log In</Link>
      <Link to="/register" className="bg-green-500 hover:bg-green-600 transition transform hover:scale-105 text-white px-4 py-2 rounded-full font-semibold hover:bg-green-700 transition-colors shadow-md">
        Sign Up
      </Link>
    </>
  );

  // --- MODIFICATION ---
  // We add a check to ensure 'user' exists before creating the authenticated links.
  const authLinks = user && (
    <>
      <span className={`capitalize text-sm font-bold px-3 py-1 rounded-full ${
         user.role === 'donor' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
      }`}>
         {user.role}
      </span>

      {user.role === 'donor' && (
        <Link to="/create-donation" className="bg-green-500 text-white hover:bg-green-500 hover:bg-green-600 transition transform hover:scale-105 transition transform hover:scale-105 px-4 py-2 rounded-full font-semibold hover:bg-green-700 transition-colors shadow-md flex items-center gap-2">
            <PlusCircle size={18} />
            Post Donation
        </Link>
      )}
      
      <Link to="/donations" className="font-semibold hover:text-green-400 transition transition-colors">
        View Map
      </Link>

      <Link to="/profile" className="font-semibold hover:text-green-400 transition transition-colors flex items-center gap-1">
        <User size={18} />
        Profile
      </Link>
      
      <button onClick={onLogout} className="flex items-center gap-2 bg-red-500 text-white hover:bg-red-600 transition px-4 py-2 rounded-full font-semibold hover:bg-gray-300 transition-colors">
        <LogOut size={18} />
        Logout
      </button>
    </>
  );

  return (
    <header className="bg-gray-900 text-white sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-green-400 flex items-center gap-2">
          <HandHeart />
          SmartSurplus
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6">
          {user ? authLinks : guestLinks}
        </nav>

        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-800 focus:outline-none">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white py-4">
          <nav className="flex flex-col items-center space-y-4">
            {user ? authLinks : guestLinks}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
