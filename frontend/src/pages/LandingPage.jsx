import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BadgeCheck,
  Clock,
  HandHeart,
  MapPin,
  ShieldCheck,
  TrendingUp,
  Users,
  UtensilsCrossed,
} from 'lucide-react';

const steps = [
  {
    icon: UtensilsCrossed,
    title: 'Post surplus food',
    description: 'Donors list available food with quantity, pickup details, and expiry information.',
  },
  {
    icon: MapPin,
    title: 'Find nearby donations',
    description: 'Receivers discover available food through a location-aware map experience.',
  },
  {
    icon: HandHeart,
    title: 'Claim and coordinate',
    description: 'Receivers claim suitable donations and coordinate pickup directly with donors.',
  },
  {
    icon: Users,
    title: 'Build local impact',
    description: 'Communities reduce waste while helping food reach people who need it most.',
  },
];

const features = [
  {
    icon: MapPin,
    title: 'Live donation map',
    description: 'View active donations by location so receivers can act quickly.',
  },
  {
    icon: ShieldCheck,
    title: 'Secure access',
    description: 'Role-based authentication keeps donor and receiver workflows focused.',
  },
  {
    icon: TrendingUp,
    title: 'Impact focused',
    description: 'A practical flow built around faster redistribution and less avoidable waste.',
  },
];

const LandingPage = () => {
  return (
    <div className="bg-white text-slate-900">
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.22),transparent_34%),linear-gradient(120deg,rgba(15,23,42,0.95),rgba(2,6,23,0.98))]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:48px_48px]" />

        <div className="relative mx-auto grid min-h-[calc(100vh-73px)] max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_0.92fr] lg:px-8">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-sm font-medium text-emerald-200">
              <BadgeCheck size={16} />
              Intelligent food redistribution
            </div>

            <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Move surplus food to the people who need it, faster.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              SmartSurplus connects donors and receivers with real-time listings, map-based discovery, and a focused pickup flow designed for local communities.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/register"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-500 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-emerald-950/40 transition-colors hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:ring-offset-2 focus:ring-offset-slate-950"
              >
                Join Now
                <ArrowRight size={20} />
              </Link>
              <Link
                to="/donations"
                className="inline-flex items-center justify-center rounded-lg border border-slate-600 bg-white/5 px-6 py-3 text-base font-semibold text-white transition-colors hover:border-emerald-300 hover:bg-white/10"
              >
                View Donations
              </Link>
            </div>

            <div className="mt-8 grid max-w-2xl gap-4 text-sm text-slate-300 sm:grid-cols-3">
              <div className="flex items-center gap-2">
                <Users size={18} className="text-emerald-300" />
                Local communities
              </div>
              <div className="flex items-center gap-2">
                <Clock size={18} className="text-emerald-300" />
                Time-sensitive pickup
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={18} className="text-emerald-300" />
                Location-aware search
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/10 shadow-2xl shadow-black/30">
              <img
                src="/hero_section.jpg"
                alt="Food donation box being prepared for community distribution"
                className="h-[320px] w-full object-cover sm:h-[440px]"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://placehold.co/640x440/e2e8f0/0f172a?text=Food+Donation';
                }}
              />
            </div>
            <div className="absolute -bottom-6 left-6 right-6 rounded-xl border border-slate-200 bg-white p-4 text-slate-900 shadow-xl">
              <p className="text-sm font-semibold text-slate-500">Platform focus</p>
              <p className="mt-1 text-2xl font-bold">Reduce waste. Improve access.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-600">How it works</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              A practical flow for urgent food sharing
            </h2>
            <p className="mt-4 text-slate-600">
              The product keeps the process simple so donors can post quickly and receivers can find suitable donations without friction.
            </p>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <article key={step.title} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                    <Icon size={24} />
                  </div>
                  <p className="mt-6 text-sm font-semibold text-emerald-600">Step {index + 1}</p>
                  <h3 className="mt-2 text-lg font-semibold text-slate-950">{step.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{step.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="features" className="bg-white py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
            <img
              src="/keyFeatures.jpg"
              alt="Food support volunteer reviewing donation details"
              className="h-[340px] w-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://placehold.co/560x360/e2e8f0/0f172a?text=SmartSurplus+Features';
              }}
            />
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-600">Key features</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Built for coordination, not clutter
            </h2>
            <p className="mt-4 text-slate-600">
              SmartSurplus focuses on the details that matter when food needs to be redistributed quickly and responsibly.
            </p>

            <div className="mt-8 space-y-5">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div key={feature.title} className="flex gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                      <Icon size={22} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-950">{feature.title}</h3>
                      <p className="mt-1 text-sm leading-6 text-slate-600">{feature.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-950 py-16 text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-4 sm:px-6 lg:flex-row lg:items-center lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-300">Ready to help?</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight">Start moving surplus food today.</h2>
            <p className="mt-3 max-w-2xl text-slate-300">
              Create an account to post donations, discover nearby food, and support your local community.
            </p>
          </div>
          <Link
            to="/register"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-500 px-6 py-3 font-semibold text-white shadow-lg shadow-emerald-950/40 transition-colors hover:bg-emerald-400"
          >
            Sign Up Now
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <div>
            <h3 className="text-lg font-bold text-slate-950">SmartSurplus</h3>
            <p className="mt-1 text-sm text-slate-500">Intelligent food redistribution for stronger communities.</p>
          </div>
          <div className="flex gap-4 text-sm font-medium text-slate-600">
            <a href="#" className="hover:text-emerald-600">Facebook</a>
            <a href="#" className="hover:text-emerald-600">Twitter</a>
            <a href="#" className="hover:text-emerald-600">Instagram</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
