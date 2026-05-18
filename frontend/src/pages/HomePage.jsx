import React, { useMemo, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import donationService from '../api/donationService';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext.jsx';
import { Package, MapPin, Clock, HandHeart, Flame, Timer, Leaf, Sparkles } from 'lucide-react';

const getDonationPriority = (bestBefore) => {
    const now = new Date();
    const expiry = new Date(bestBefore);
    const diffHours = (expiry - now) / (1000 * 60 * 60);

    if (diffHours <= 6) {
        return {
            key: 'critical',
            label: 'Expiring Soon',
            color: 'bg-red-100 text-red-700 ring-red-200',
            markerClass: 'smart-donation-marker--critical',
            icon: <Flame size={12} />,
        };
    }

    if (diffHours <= 24) {
        return {
            key: 'urgent',
            label: 'Urgent',
            color: 'bg-amber-100 text-amber-700 ring-amber-200',
            markerClass: 'smart-donation-marker--urgent',
            icon: <Timer size={12} />,
        };
    }

    return {
        key: 'fresh',
        label: 'Fresh',
        color: 'bg-emerald-100 text-emerald-700 ring-emerald-200',
        markerClass: 'smart-donation-marker--fresh',
        icon: <Leaf size={12} />,
    };
};

const createDonationMarkerIcon = (priority, isActive) => L.divIcon({
    className: 'smart-donation-marker',
    html: `
        <div class="smart-donation-marker__wrap ${priority.markerClass} ${isActive ? 'smart-donation-marker--active' : ''}">
            <div class="smart-donation-marker__pulse"></div>
            <div class="smart-donation-marker__pin">
                <span>${priority.key === 'critical' ? '!' : ''}</span>
            </div>
        </div>
    `,
    iconSize: [46, 52],
    iconAnchor: [23, 48],
    popupAnchor: [0, -44],
});

const MapPopupCard = ({ donation, onClaim }) => {
    const { user } = useAuth();

    const formatBestBefore = (dateString) => {
        const options = { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const handleClaim = () => {
        onClaim(donation._id);
    };

    const priorityStatus = getDonationPriority(donation.bestBefore);

    return (
            <div className="w-[19rem] overflow-hidden rounded-2xl bg-white text-slate-800 shadow-2xl ring-1 ring-slate-200">
              {donation.image && (
               <img
                    src={donation.image}
                    alt={donation.foodType}
                    className="h-44 w-full object-cover"
                  />
                )}
            <div className="relative overflow-hidden bg-slate-950 px-4 py-4 text-white">

                <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-400" />
                <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                        <p className="text-[11px] font-semibold uppercase tracking-wide text-emerald-200">Available Donation</p>
                        <h3 className="mt-1 break-words text-xl font-bold leading-tight">{donation.foodType}</h3>
                    </div>
                    <div className="shrink-0 rounded-full bg-white/10 p-2 ring-1 ring-white/15">
                        <HandHeart size={20} />
                    </div>
                </div>
            </div>

            <div className="p-4">
                <div className="flex flex-wrap gap-2">
                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700 ring-1 ring-slate-200">
                        {donation.category}
                    </span>

                    <span className={`${priorityStatus.color} inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ring-1`}>
                        {priorityStatus.icon}
                        {priorityStatus.label}
                    </span>
                </div>

                <div className="mt-4 space-y-3 text-sm text-slate-600">
                    <div className="flex items-start gap-3 rounded-xl bg-slate-50 p-3 ring-1 ring-slate-100">
                        <Package className="mt-0.5 shrink-0 text-emerald-600" size={16} />
                        <span><strong className="font-semibold text-slate-900">Quantity:</strong> {donation.quantity}</span>
                    </div>
                    <div className="flex items-start gap-3 rounded-xl bg-slate-50 p-3 ring-1 ring-slate-100">
                        <MapPin className="mt-0.5 shrink-0 text-emerald-600" size={16} />
                        <span className="leading-snug">{donation.location.address}</span>
                    </div>
                    <div className="flex items-start gap-3 rounded-xl bg-slate-50 p-3 ring-1 ring-slate-100">
                        <Clock className="mt-0.5 shrink-0 text-emerald-600" size={16} />
                        <span><strong className="font-semibold text-slate-900">Best before:</strong> {formatBestBefore(donation.bestBefore)}</span>
                    </div>
                </div>

                <button
                    onClick={handleClaim}
                    disabled={!user || user.role !== 'receiver'}
                    className="mt-5 w-full rounded-xl bg-emerald-500 px-3 py-2.5 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-emerald-600 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 disabled:translate-y-0 disabled:cursor-not-allowed disabled:bg-slate-400 disabled:shadow-none"
                >
                    {user && user.role === 'receiver' ? 'Claim Donation' : 'Login as Receiver to Claim'}
                </button>
            </div>
        </div>
    );
};

const HomePage = () => {
  const [donations, setDonations] = useState([]);
  const [selectedCategory,setSelectedCategory]=useState('All');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDonationId, setSelectedDonationId] = useState(null);
  const location = useLocation();
  const { user } = useAuth();

  const newDonationCoords = location.state?.newDonationCoords;
  const initialPosition = newDonationCoords ? [newDonationCoords[1], newDonationCoords[0]] : [22.8046, 86.2029];
  const initialZoom = newDonationCoords ? 15 : 13;
  const categories = ['All', 'Cooked Meal', 'Fresh Produce', 'Bakery', 'Dairy', 'Packaged Goods'];

  const mapDonations = useMemo(() => (
    donations.filter((donation) => {
      const coordinates = donation.location?.coordinates;
      return Array.isArray(coordinates)
        && coordinates.length === 2
        && coordinates.every((coordinate) => Number.isFinite(coordinate));
    })
  ), [donations]);

  const mapSummary = useMemo(() => {
    const summary = { critical: 0, urgent: 0, fresh: 0 };

    mapDonations.forEach((donation) => {
      summary[getDonationPriority(donation.bestBefore).key] += 1;
    });

    return summary;
  }, [mapDonations]);

  const fetchDonations = async () => {
    try {
      setIsLoading(true);
      const data = await donationService.getAvailableDonations();
      setDonations(data);
    } catch {
      toast.error('Could not fetch donations.');
    } finally {
      setIsLoading(false);
    }
  };
  const filteredDonations =
  selectedCategory === 'All'
    ? mapDonations
    : mapDonations.filter((donation) => donation.category === selectedCategory);

  useEffect(() => {
    fetchDonations();
  }, []);

  const handleClaimDonation = async (donationId) => {
    try {
        await donationService.claimDonation(donationId, user.token);
        toast.success('Donation received successfully!');
        fetchDonations();
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.msg) ||
            'Failed to claim donation.';
        toast.error(message);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[calc(100vh-68px)] items-center justify-center bg-slate-50 p-10">
        <div className="rounded-2xl bg-white px-6 py-5 text-center shadow-lg ring-1 ring-slate-200">
          <div className="mx-auto mb-3 h-10 w-10 animate-pulse rounded-full bg-emerald-100" />
          <p className="font-semibold text-slate-900">Loading map and donations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-[calc(100vh-68px)] w-full overflow-hidden bg-slate-100" id="map">
      <div className="pointer-events-none absolute left-4 right-4 top-4 z-[450] flex flex-col gap-3 sm:left-6 sm:right-auto sm:max-w-md">
        <div className="pointer-events-auto rounded-2xl bg-white/95 p-4 shadow-xl ring-1 ring-slate-200 backdrop-blur">
          <div className="flex items-start gap-3">
            <div className="rounded-xl bg-emerald-100 p-2 text-emerald-700">
              <Sparkles size={20} />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Live Donation Map</p>
              <h1 className="mt-1 text-lg font-bold text-slate-950">{mapDonations.length} donations available nearby</h1>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs font-semibold">
            <div className="rounded-xl bg-red-50 px-2 py-2 text-red-700 ring-1 ring-red-100">
              <span className="block text-base font-bold">{mapSummary.critical}</span>
              Soon
            </div>
            <div className="rounded-xl bg-amber-50 px-2 py-2 text-amber-700 ring-1 ring-amber-100">
              <span className="block text-base font-bold">{mapSummary.urgent}</span>
              Urgent
            </div>
            <div className="rounded-xl bg-emerald-50 px-2 py-2 text-emerald-700 ring-1 ring-emerald-100">
              <span className="block text-base font-bold">{mapSummary.fresh}</span>
              Fresh
            </div>
          </div>
        </div>
      </div>
      
      <div
        className={`pointer-events-auto absolute bottom-5 left-1/2 z-[420] flex max-w-[calc(100%-2rem)] -translate-x-1/2 gap-2 overflow-x-auto rounded-2xl border border-slate-200 bg-white/95 px-3 py-3 shadow-lg backdrop-blur-md transition duration-200 sm:flex-wrap sm:justify-center lg:bottom-6 lg:max-w-3xl ${
          selectedDonationId ? 'translate-y-[calc(100%+1.5rem)] opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'
        }`}
        aria-label="Filter donations by category"
      >
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition ${
              selectedCategory === category
                ? 'bg-green-500 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-green-100 hover:text-green-700'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <MapContainer center={initialPosition} zoom={initialZoom} scrollWheelZoom={true} className="smart-donation-map">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {filteredDonations.map((donation) => {
          const priority = getDonationPriority(donation.bestBefore);
          const isActive = selectedDonationId === donation._id;

          return (
            <Marker
              key={donation._id}
              position={[donation.location.coordinates[1], donation.location.coordinates[0]]}
              icon={createDonationMarkerIcon(priority, isActive)}
              keyboard={true}
              eventHandlers={{
                  mouseover: (event) => event.target.openPopup(),
                  click: () => setSelectedDonationId(donation._id),
                  popupopen: () => setSelectedDonationId(donation._id),
                  popupclose: () => setSelectedDonationId((currentId) => (
                    currentId === donation._id ? null : currentId
                  )),
              }}
            >
              <Popup className="smart-donation-popup" closeButton={true} offset={[0, -8]} maxWidth={340}>
                <MapPopupCard donation={donation} onClaim={handleClaimDonation} />
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default HomePage;
