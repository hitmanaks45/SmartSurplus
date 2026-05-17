import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import donationService from '../api/donationService';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext.jsx'; // <-- Import useAuth
import { Utensils, Package, MapPin, Clock } from 'lucide-react';

// --- Fix for default marker icon issue with Leaflet ---
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;
// --- End of fix ---


const MapPopupCard = ({ donation, onClaim }) => {
    const { user } = useAuth(); // Get user info to check their role

    const formatBestBefore = (dateString) => {
        const options = { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };
    const getPriorityStatus = () => {
    const now = new Date();
    const expiry = new Date(donation.bestBefore);

    const diffHours = (expiry - now) / (1000 * 60 * 60);

    if (diffHours <= 6) {
        return {
            label: '🔥 Expiring Soon',
            color: 'bg-red-100 text-red-700'
        };
    }

    if (diffHours <= 24) {
        return {
            label: '⏰ Urgent',
            color: 'bg-yellow-100 text-yellow-700'
        };
    }

    return {
        label: '🟢 Fresh',
        color: 'bg-green-100 text-green-700'
    };
};

    const handleClaim = () => {
        onClaim(donation._id);
    };

    return (
        <div className="w-64 p-3 rounded-xl bg-white shadow-lg">
            <h3 className="text-lg font-bold text-gray-800 mb-1">{donation.foodType}</h3>
          <div className="flex gap-2 flex-wrap">
    <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-0.5 rounded-full">
        {donation.category}
    </span>

    <span className={`${getPriorityStatus().color} text-xs font-semibold px-2 py-0.5 rounded-full`}>
        {getPriorityStatus().label}
    </span>
</div>
            <div className="mt-3 space-y-2 text-gray-600 text-sm">
                <div className="flex items-center gap-2"><Package size={14} /><span>Quantity: {donation.quantity}</span></div>
                <div className="flex items-center gap-2"><MapPin size={14} /><span>{donation.location.address}</span></div>
                <div className="flex items-center gap-2"><Clock size={14} /><span>Best Before: {formatBestBefore(donation.bestBefore)}</span></div>
            </div>
            {/* --- This button is now functional --- */}
            <button 
                onClick={handleClaim}
                disabled={!user || user.role !== 'receiver'}
                className="mt-4 w-full bg-green-500 hover:bg-green-600 transition transform hover:scale-105 text-white font-bold py-2 px-3 rounded-lg hover:bg-green-700 transition-colors text-sm disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
                {user && user.role === 'receiver' ? 'Claim Donation' : 'Login as Receiver to Claim'}
            </button>
        </div>
    );
};

const HomePage = () => {
  const [donations, setDonations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const { user } = useAuth(); // Get user for their token

  const newDonationCoords = location.state?.newDonationCoords;
  const initialPosition = newDonationCoords ? [newDonationCoords[1], newDonationCoords[0]] : [22.8046, 86.2029];
  const initialZoom = newDonationCoords ? 15 : 13;

  // Function to fetch donations, can be called to refresh the map
  const fetchDonations = async () => {
    try {
      setIsLoading(true);
      const data = await donationService.getAvailableDonations();
      setDonations(data);
    } catch (error) {
      toast.error('Could not fetch donations.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  // --- New function to handle the claim action ---
  const handleClaimDonation = async (donationId) => {
    try {
        await donationService.claimDonation(donationId, user.token);
        toast.success('Donation delivered successfully!');
        // After claiming, refresh the donations on the map to remove the pin
        fetchDonations();
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.msg) ||
            'Failed to claim donation.';
        toast.error(message);
    }
  };

  if (isLoading) {
    return <div className="text-center p-10 font-semibold text-lg">Loading Map & Donations...</div>;
  }

  return (
    <div className="w-full h-[calc(100vh-68px)]" id="map">
      <MapContainer center={initialPosition} zoom={initialZoom} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {donations.map(donation => (
          <Marker 
            key={donation._id} 
            position={[donation.location.coordinates[1], donation.location.coordinates[0]]}
          >
            <Popup>
              <MapPopupCard donation={donation} onClaim={handleClaimDonation} />
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default HomePage;