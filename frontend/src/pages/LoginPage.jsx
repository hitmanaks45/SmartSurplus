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
    <div className="flex min-h-[calc(100vh-73px)] items-center justify-center bg-slate-50 px-4 py-12">
      <div className="mx-auto w-full max-w-6xl">
        <div className="grid overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl md:grid-cols-[0.9fr_1.1fr]">
          {/* Left Motivational Part */}
          <div className="bg-slate-950 p-8 text-white md:p-12">
            <Users className="mb-6 h-12 w-12 rounded-xl bg-emerald-400/15 p-2.5 text-emerald-300" />
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Welcome Back</h1>
            <p className="mt-4 leading-7 text-slate-300">
              Continue coordinating donations, finding nearby food resources, and supporting your community.
            </p>
          </div>

          {/* Right Form Part */}
          <div className="p-8 md:p-12">
            <div className="mb-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <LogIn className="h-7 w-7" />
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-950">Sign In</h2>
              <p className="mt-2 text-slate-500">Enter your details to continue to SmartSurplus.</p>
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
                    className="w-full rounded-lg border border-slate-300 bg-white py-3 pl-10 pr-4 text-slate-900 shadow-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
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
                    className="w-full rounded-lg border border-slate-300 bg-white py-3 pl-10 pr-4 text-slate-900 shadow-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                    required
                 />
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex w-full justify-center rounded-lg border border-transparent bg-emerald-500 px-4 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-emerald-300"
                >
                  {isLoading ? 'Logging In...' : 'Log In'}
                </button>
              </div>
            </form>

            <p className="mt-8 text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="font-semibold text-emerald-600 hover:text-emerald-700">
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
