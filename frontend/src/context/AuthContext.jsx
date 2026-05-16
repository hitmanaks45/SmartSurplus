// File: client/src/context/AuthContext.jsx

import React, { createContext, useReducer, useContext } from 'react';
import authService from '../api/authService';

// Get user from localStorage if it exists
const user = JSON.parse(localStorage.getItem('user'));

// Create the context, but we won't export it directly anymore.
const AuthContext = createContext();

// This reducer is now only used within this file, so it doesn't need to be exported.
const authReducer = (state, action) => {
  switch (action.type) {
    case 'REQUEST_START':
      return { ...state, isLoading: true, isError: false, message: '' };
    case 'LOGIN_SUCCESS':
    case 'REGISTER_SUCCESS':
      return { ...state, isLoading: false, user: action.payload };
    case 'REQUEST_FAIL':
      return { ...state, isLoading: false, isError: true, message: action.payload };
    case 'LOGOUT':
      return { ...state, user: null };
    default:
      return state;
  }
};

// Initial state for our context
const initialState = {
  user: user ? user : null,
  isLoading: false,
  isError: false,
  message: '',
};

// Provider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Register user function
  const register = async (userData) => {
    dispatch({ type: 'REQUEST_START' });
    try {
      const data = await authService.register(userData);
      dispatch({ type: 'REGISTER_SUCCESS', payload: data });
      return data;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.message ||
        error.toString();
      dispatch({ type: 'REQUEST_FAIL', payload: message });
      throw new Error(message);
    }
  };
  
  // Login user function
  const login = async (userData) => {
    dispatch({ type: 'REQUEST_START' });
    try {
        const data = await authService.login(userData);
        dispatch({ type: 'LOGIN_SUCCESS', payload: data });
        return data;
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.msg) ||
            error.message ||
            error.toString();
        dispatch({ type: 'REQUEST_FAIL', payload: message });
        throw new Error(message);
    }
  };

  // Logout user function
  const logout = () => {
    authService.logout();
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider value={{ ...state, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Create and export a custom hook to easily use the context in other components.
export const useAuth = () => {
    return useContext(AuthContext);
}
