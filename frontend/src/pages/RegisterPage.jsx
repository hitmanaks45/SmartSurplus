
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext.jsx';
import { UserPlus, User, AtSign, KeyRound, HandHeart, Utensils } from 'lucide-react';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { user, register, isLoading, isError, message } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
    role: 'donor',
  });

  const { name, email, password, password2, role } = formData;

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
    if (password !== password2) {
      toast.error('Passwords do not match');
      return;
    }
    const userData = { name, email, password, role };
    try {
      await register(userData);
      toast.success('Registration successful! Welcome.');
    } catch (error) {
      console.error('Registration failed', error);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-73px)] items-center justify-center bg-slate-50 px-4 py-12">
      <div className="mx-auto w-full max-w-6xl">
        <div className="grid overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl md:grid-cols-[0.9fr_1.1fr]">
          {/* Left Motivational Part */}
          <div className="bg-slate-950 p-8 text-white md:p-12">
            <HandHeart className="mb-6 h-12 w-12 rounded-xl bg-emerald-400/15 p-2.5 text-emerald-300" />
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Join the Movement</h1>
            <p className="mt-4 leading-7 text-slate-300">
              Create an account to share surplus food, receive donations, and support people nearby.
            </p>
          </div>

          {/* Right Form Part */}
          <div className="p-8 md:p-12">
            <div className="mb-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <UserPlus className="h-7 w-7" />
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-950">Create an Account</h2>
              <p className="mt-2 text-slate-500">Start making a measurable community impact.</p>
            </div>

            <form onSubmit={onSubmit} className="space-y-4">
              <div className="relative">
                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                 </div>
                 <input type="text" name="name" value={name} onChange={onChange} placeholder="Full Name"
                    className="w-full rounded-lg border border-slate-300 bg-white py-3 pl-10 pr-4 text-slate-900 shadow-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100" required />
              </div>

              <div className="relative">
                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <AtSign className="h-5 w-5 text-gray-400" />
                 </div>
                 <input type="email" name="email" value={email} onChange={onChange} placeholder="Email Address"
                    className="w-full rounded-lg border border-slate-300 bg-white py-3 pl-10 pr-4 text-slate-900 shadow-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100" required />
              </div>

              <div className="relative">
                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <KeyRound className="h-5 w-5 text-gray-400" />
                 </div>
                 <input type="password" name="password" value={password} onChange={onChange} placeholder="Password"
                    className="w-full rounded-lg border border-slate-300 bg-white py-3 pl-10 pr-4 text-slate-900 shadow-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100" required />
              </div>
              
              <div className="relative">
                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <KeyRound className="h-5 w-5 text-gray-400" />
                 </div>
                 <input type="password" name="password2" value={password2} onChange={onChange} placeholder="Confirm Password"
                    className="w-full rounded-lg border border-slate-300 bg-white py-3 pl-10 pr-4 text-slate-900 shadow-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100" required />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">I am a...</label>
                <div className="flex gap-4">
                  <button type="button" onClick={() => setFormData({...formData, role: 'donor'})}
                    className={`flex w-full items-center justify-center gap-2 rounded-lg border p-3 transition ${role === 'donor' ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-slate-300 text-slate-600 hover:border-slate-400'}`}>
                    <HandHeart className={`h-5 w-5 ${role === 'donor' ? 'text-emerald-600' : 'text-slate-500'}`} />
                    <span className="font-semibold">Donor</span>
                  </button>
                  <button type="button" onClick={() => setFormData({...formData, role: 'receiver'})}
                    className={`flex w-full items-center justify-center gap-2 rounded-lg border p-3 transition ${role === 'receiver' ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-slate-300 text-slate-600 hover:border-slate-400'}`}>
                    <Utensils className={`h-5 w-5 ${role === 'receiver' ? 'text-emerald-600' : 'text-slate-500'}`} />
                    <span className="font-semibold">Receiver</span>
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <button type="submit"
                  disabled={isLoading}
                  className="flex w-full justify-center rounded-lg border border-transparent bg-emerald-500 px-4 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-emerald-300"
                >
                  {isLoading ? 'Signing Up...' : 'Sign Up'}
                </button>
              </div>
            </form>

            <p className="mt-6 text-center text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="font-semibold text-emerald-600 hover:text-emerald-700">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
