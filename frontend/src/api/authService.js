// File: client/src/api/authService.js

import axios from 'axios';

// This ensures the correct URL is constructed: http://localhost:5000/api/users/
const API_URL = `${import.meta.env.VITE_API_URL}/api/users/`;

// Register user
const register = async (userData) => {
  // The final URL will be POST /api/users/register
  const response = await axios.post(API_URL + 'register', userData);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

// Login user
const login = async (userData) => {
    // The final URL will be POST /api/users/login
    const response = await axios.post(API_URL + 'login', userData);

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }

    return response.data;
};


// Logout user
const logout = () => {
    localStorage.removeItem('user');
};


const authService = {
  register,
  login,
  logout,
};

export default authService;
