import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import donationService from '../api/donationService';
import { toast } from 'react-toastify';
import { User, HandHeart, Utensils, Package, Calendar, MapPin, CheckCircle, Clock } from 'lucide-react';

// A component to display a single donation/claim item in a list
const HistoryItem = ({ item, role }) => {
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString(undefined, {
            year: 'numeric', month: 'short', day: 'numeric'
        });
    };

    const getStatusChip = (status) => {
        switch (status) {
            case 'available':
                return <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">Available</span>;
            case 'claimed':
                return <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">Claimed</span>;
            case 'delivered':
                 return <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">Delivered</span>;
            default:
                return null;
        }
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex justify-between items-start">
                <div>
                    <p className="font-bold text-lg text-gray-800">{item.foodType}</p>
                    <p className="text-sm text-gray-500">{item.category}</p>
                </div>
                {getStatusChip(item.status)}
            </div>
            <div className="mt-3 border-t pt-3 text-sm text-gray-600 space-y-2">
                <p className="flex items-center gap-2"><Package size={14} /> Quantity: {item.quantity}</p>
                <p className="flex items-center gap-2"><MapPin size={14} /> {item.location.address}</p>
                <p className="flex items-center gap-2">
                    {role === 'donor' ? <CheckCircle size={14} /> : <Clock size={14} />}
                    {role === 'donor' ? `Posted on: ${formatDate(item.createdAt)}` : `Claimed on: ${formatDate(item.updatedAt)}`}
                </p>
            </div>
        </div>
    );
};


const ProfilePage = () => {
  const { user } = useAuth();
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let data;
        if (user.role === 'donor') {
          data = await donationService.getMyDonations(user.token);
        } else if (user.role === 'receiver') {
          data = await donationService.getMyClaims(user.token);
        }
        setHistory(data);
      } catch (error) {
        toast.error('Could not fetch your activity history.');
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user]);

  if (isLoading || !user) { // Add a check for user object
    return <div className="text-center p-10">Loading your profile...</div>;
  }

  const ImpactCard = () => (
    <div className="bg-white p-6 rounded-xl shadow-md flex items-center gap-6">
        {user.role === 'donor' ? 
            <HandHeart className="w-12 h-12 text-green-500" /> : 
            <Utensils className="w-12 h-12 text-purple-500" />
        }
        <div>
            <p className="text-gray-600">
                {user.role === 'donor' ? 'Total Donations Made' : 'Total Donations Received'}
            </p>
            <p className="text-3xl font-bold text-gray-900">{history.length}</p>
        </div>
    </div>
  );

  return (
    <div className="container mx-auto max-w-4xl p-4 sm:p-6 lg:p-8">
        <div className="flex items-center gap-4 mb-8">
            <div className="bg-gray-200 p-4 rounded-full">
                <User className="w-10 h-10 text-gray-600" />
            </div>
            <div>
                {/* --- MODIFICATION: Display the user's name --- */}
                <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
                <p className="text-gray-500 capitalize">{user.role} Account</p>
            </div>
        </div>
        
        <ImpactCard />

        <div className="mt-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
                {user.role === 'donor' ? 'My Donation History' : 'My Claim History'}
            </h2>
            {history.length === 0 ? (
                <p className="text-center text-gray-500 py-8">You have no activity yet.</p>
            ) : (
                <div className="space-y-4">
                    {history.map(item => (
                        <HistoryItem key={item._id} item={item} role={user.role} />
                    ))}
                </div>
            )}
        </div>
    </div>
  );
};

export default ProfilePage;
