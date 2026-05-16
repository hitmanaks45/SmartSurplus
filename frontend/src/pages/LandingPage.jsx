// File: client/src/pages/LandingPage.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, HandHeart, Users, UtensilsCrossed, ArrowRight, ShieldCheck } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="bg-white text-gray-800">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white overflow-hidden">
        {/* SVG Background Pattern */}
        <div className="absolute inset-0 z-0 opacity-10">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <pattern id="pattern-circles" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse" patternContentUnits="userSpaceOnUse">
                        <circle id="pattern-circle" cx="20" cy="20" r="2" fill="#15803d"></circle>
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#pattern-circles)"></rect>
            </svg>
        </div>

        <div className="container mx-auto px-6 py-20 md:py-32 flex flex-col md:flex-row items-center relative z-10">
          <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0">
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-4">
              Smart Food Redistribution <span className="text-green-400">Made Intelligent.</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              SmartSurplus uses intelligent prioritization and real-time mapping to connect food donors with receivers efficiently.
            </p>
            <div className="flex justify-center md:justify-start space-x-4">
              <Link to="/register" className="bg-green-500 hover:bg-green-600 transition transform hover:scale-105 text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-green-700 transition-transform transform hover:scale-105 shadow-xl">
                Join Now <ArrowRight className="inline ml-2" />
              </Link>
              <Link to="/donations" className="bg-white text-green-500 border-2 border-green-600 px-8 py-3 rounded-full font-bold text-lg hover:bg-green-50 transition-transform transform hover:scale-105">
                View Donations
              </Link>
            </div>
            <p className="mt-6 text-sm text-gray-300">
  Trusted by local communities • Real-time tracking • Smart prioritization
</p>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img 
              src="/hero_section.jpg" 
              alt="Illustration of food donation" 
              className="rounded-lg shadow-2xl"
              onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x400/E0E0E0/000000?text=Image+Not+Found'; }}
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">How It Works</h2>
            <p className="text-gray-600 mt-2">A simple, transparent process to connect hearts.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg text-center transform hover:-translate-y-2 transition-transform">
              <div className="flex justify-center mb-4"><UtensilsCrossed size={48} className="text-green-500" /></div>
              <h3 className="text-xl font-semibold mb-2">1. Post a Donation</h3>
              <p className="text-gray-600">Donors with surplus food list it on our platform with details and location.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg text-center transform hover:-translate-y-2 transition-transform">
              <div className="flex justify-center mb-4"><MapPin size={48} className="text-green-500" /></div>
              <h3 className="text-xl font-semibold mb-2">2. Find Food Nearby</h3>
              <p className="text-gray-600">Receivers browse available donations on an interactive map in their area.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg text-center transform hover:-translate-y-2 transition-transform">
              <div className="flex justify-center mb-4"><HandHeart size={48} className="text-green-500" /></div>
              <h3 className="text-xl font-semibold mb-2">3. Connect & Collect</h3>
              <p className="text-gray-600">Receivers can claim a donation and connect directly with the donor to arrange pickup.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg text-center transform hover:-translate-y-2 transition-transform">
              <div className="flex justify-center mb-4"><Users size={48} className="text-green-500" /></div>
              <h3 className="text-xl font-semibold mb-2">4. Build Community</h3>
              <p className="text-gray-600">Help reduce waste, fight hunger, and make a real impact in your local area.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Key Features</h2>
            <p className="text-gray-600 mt-2">Everything you need to make a difference.</p>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-12">
              {/* This container now centers the image */}
              <div className="md:w-1/2 flex justify-center">
                  <img 
                    src="/keyFeatures.jpg" 
                    alt="App screenshot on a map" 
                    className="rounded-lg shadow-xl"
                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/500x350/E0E0E0/000000?text=Image+Not+Found'; }}
                  />
              </div>
              <div className="md:w-1/2 space-y-8">
                  <div className="flex items-start space-x-4">
                      <div className="bg-green-100 p-3 rounded-full"><MapPin className="text-green-500" /></div>
                      <div>
                          <h3 className="text-xl font-semibold">Interactive Map</h3>
                          <p className="text-gray-600 mt-1">Easily find and post donations with our real-time map view.</p>
                      </div>
                  </div>
                  <div className="flex items-start space-x-4">
                      <div className="bg-green-100 p-3 rounded-full"><ShieldCheck className="text-green-500" /></div>
                      <div>
                          <h3 className="text-xl font-semibold">Secure & Direct</h3>
                          <p className="text-gray-600 mt-1">Connect directly and safely with verified users in your community.</p>
                      </div>
                  </div>
                  <div className="flex items-start space-x-4">
                      <div className="bg-green-100 p-3 rounded-full"><HandHeart className="text-green-500" /></div>
                      <div>
                          <h3 className="text-xl font-semibold">Track Your Impact</h3>
                          <p className="text-gray-600 mt-1">See how many meals you've donated or received and the impact you've made.</p>
                      </div>
                  </div>
              </div>
          </div>
        </div>
      </section>

      {/* Call to Action (CTA) Section */}
      <section className="bg-green-500 hover:bg-green-600 transition transform hover:scale-105">
          <div className="container mx-auto px-6 py-16 text-center">
              <h2 className="text-3xl font-bold text-white">Ready to Make a Difference?</h2>
              <p className="text-green-100 mt-2 mb-8">Join thousands of others in the fight against food waste. Your journey starts here.</p>
              <Link to="/register" className="bg-white text-green-500 px-8 py-3 rounded-full font-bold text-lg hover:bg-green-50 transition-transform transform hover:scale-105 shadow-xl">
                  Sign Up Now <ArrowRight className="inline ml-2" />
              </Link>
          </div>
      </section>

      {/* Footer */}
       <footer className="bg-gray-800 text-white">
        <div className="container mx-auto px-6 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left mb-4 md:mb-0">
                <h3 className="text-xl font-bold">SmartSurplus</h3>
                <p className="text-gray-400">Intelligent food redistribution for a better world.</p>
            </div>
            <div className="flex space-x-6">
                <a href="#" className="hover:text-green-400">Facebook</a>
                <a href="#" className="hover:text-green-400">Twitter</a>
                <a href="#" className="hover:text-green-400">Instagram</a>
            </div>
            </div>
            <div className="mt-8 border-t border-gray-700 pt-4 text-center text-gray-500 text-sm">
            <p>&copy; {new Date().getFullYear()} SmartSurplus. All Rights Reserved.</p>
            </div>
        </div>
        </footer>
    </div>
  );
};

export default LandingPage;
