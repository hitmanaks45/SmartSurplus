import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext.jsx';
import { LogIn, AtSign, KeyRound, Users } from 'lucide-react';

const LoginPage = () => {
  const navigate = useNavigate();
  const { user, login, isLoading, isError, message } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (user) {
      navigate('/donations');
    }
  }, [user, isError, message, navigate]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }
    const userData = { email, password };
    try {
      await login(userData);
      toast.success('Login successful! Welcome back.');
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <div className="min-h-[calc(100vh-68px)] bg-gray-100 flex items-center justify-center p-4">
      <div className="container mx-auto max-w-6xl">
        <div className="bg-white rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden">
          {/* Left Motivational Part */}
          <div className="md:w-5/12 bg-green-500 hover:bg-green-600 transition transform hover:scale-105 text-white p-8 md:p-12 flex flex-col justify-center items-center text-center">
            <Users className="w-16 h-16 mb-4 opacity-80" />
            <h1 className="text-4xl font-bold leading-tight mb-3">Welcome Back</h1>
            <p className="text-lg text-green-100 opacity-90">
              Your continued support helps us build a stronger community. Thank you for being a part of the change.
            </p>
          </div>

          {/* Right Form Part */}
          <div className="md:w-7/12 p-8 md:p-12">
            <div className="flex flex-col items-center mb-6">
              <div className="bg-green-100 p-3 rounded-full mb-3">
                <LogIn className="w-8 h-8 text-green-500" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Sign In</h2>
              <p className="text-gray-500 mt-1">to continue to SmartSurplus</p>
            </div>

            <form onSubmit={onSubmit} className="space-y-6">
              <div className="relative">
                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <AtSign className="h-5 w-5 text-gray-400" />
                 </div>
                 <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={onChange}
                    placeholder="Email Address"
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                 />
              </div>

              <div className="relative">
                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <KeyRound className="h-5 w-5 text-gray-400" />
                 </div>
                 <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={onChange}
                    placeholder="Password"
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                 />
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-green-500 hover:bg-green-600 transition transform hover:scale-105 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-transform transform hover:scale-105 disabled:bg-green-400"
                >
                  {isLoading ? 'Logging In...' : 'Log In'}
                </button>
              </div>
            </form>

            <p className="mt-8 text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="font-medium text-green-500 hover:text-green-500">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
