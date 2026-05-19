import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { HandHeart, LogOut, Menu, X, PlusCircle, User } from 'lucide-react';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  const onLogout = () => {
    logout();
    closeMenu();
    navigate('/login');
  };

  const linkClass = 'text-sm font-medium text-slate-200 transition-colors hover:text-emerald-300';
  const mobileLinkClass = 'w-full rounded-lg px-4 py-3 text-sm font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-700';
  const primaryButtonClass = 'inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-slate-950';

  const guestLinks = (
    <>
      <Link to="/login" className={linkClass} onClick={closeMenu}>
        Log In
      </Link>
      <Link to="/register" className={primaryButtonClass} onClick={closeMenu}>
        Sign Up
      </Link>
    </>
  );

  const mobileGuestLinks = (
    <>
      <Link to="/login" className={mobileLinkClass} onClick={closeMenu}>
        Log In
      </Link>
      <Link to="/register" className={primaryButtonClass} onClick={closeMenu}>
        Sign Up
      </Link>
    </>
  );

  const authLinks = user && (
    <>
      <span
        className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
          user.role === 'donor'
            ? 'bg-sky-100 text-sky-700'
            : 'bg-violet-100 text-violet-700'
        }`}
      >
        {user.role}
      </span>

      {user.role === 'donor' && (
        <Link to="/create-donation" className={primaryButtonClass} onClick={closeMenu}>
          <PlusCircle size={18} />
          Post Donation
        </Link>
      )}

      <Link to="/donations" className={linkClass} onClick={closeMenu}>
        View Map
      </Link>

      <Link to="/profile" className={`${linkClass} inline-flex items-center gap-2`} onClick={closeMenu}>
        <User size={18} />
        Profile
      </Link>

      <button
        onClick={onLogout}
        className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-700 px-4 py-2.5 text-sm font-semibold text-slate-100 transition-colors hover:border-red-300 hover:bg-red-500 hover:text-white"
      >
        <LogOut size={18} />
        Logout
      </button>
    </>
  );

  const mobileAuthLinks = user && (
    <>
      <span
        className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
          user.role === 'donor'
            ? 'bg-sky-100 text-sky-700'
            : 'bg-violet-100 text-violet-700'
        }`}
      >
        {user.role}
      </span>

      {user.role === 'donor' && (
        <Link to="/create-donation" className={primaryButtonClass} onClick={closeMenu}>
          <PlusCircle size={18} />
          Post Donation
        </Link>
      )}

      <Link to="/donations" className={mobileLinkClass} onClick={closeMenu}>
        View Map
      </Link>

      <Link to="/profile" className={`${mobileLinkClass} inline-flex items-center justify-center gap-2`} onClick={closeMenu}>
        <User size={18} />
        Profile
      </Link>

      <button
        onClick={onLogout}
        className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-red-200 px-4 py-3 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50"
      >
        <LogOut size={18} />
        Logout
      </button>
    </>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/95 text-white shadow-sm backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold text-emerald-400" onClick={closeMenu}>
          <HandHeart className="h-7 w-7" />
          SmartSurplus
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {user ? authLinks : guestLinks}
        </nav>

        <button
          onClick={() => setIsMenuOpen((open) => !open)}
          className="inline-flex rounded-lg border border-slate-700 p-2 text-slate-100 transition-colors hover:bg-slate-900 md:hidden"
          aria-label="Toggle navigation menu"
        >
          {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {isMenuOpen && (
  <div className="md:hidden bg-slate-950 border-t border-slate-800 px-4 py-4">
    <nav className="flex flex-col gap-3">
      {user ? authLinks : guestLinks}
    </nav>
  </div>
)}
    </header>
  );
};

export default Header;
