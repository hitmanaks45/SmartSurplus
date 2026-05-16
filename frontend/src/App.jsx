// File: client/src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from './context/AuthContext.jsx';

// Import Components
import Header from './components/Header';

// Import Pages
import HomePage from './pages/HomePage';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CreateDonationPage from './pages/CreateDonationPage';
import ProfilePage from './pages/ProfilePage.jsx';

// A component to protect routes that require a user to be logged in
const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <div className="font-sans bg-gray-100 min-h-screen">
        <Header />
        <main>
          <Routes>
            {/* The Landing Page is now always at the root URL */}
            <Route path="/" element={<LandingPage />} />
            
            {/* The Donations Map is now on a separate, protected route */}
            <Route 
              path="/donations" 
              element={
                <PrivateRoute>
                  <HomePage />
                </PrivateRoute>
              } 
            />
            
            <Route path="/login" element={<LoginPage />} /> 
            <Route path="/register" element={<RegisterPage />} />
            
            {/* Protect the "Create Donation" page */}
            <Route 
              path="/create-donation" 
              element={
                <PrivateRoute>
                  <CreateDonationPage />
                </PrivateRoute>
              } 
            />

            <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} /> 
          </Routes>
        </main>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Router>
  );
}

export default App;
