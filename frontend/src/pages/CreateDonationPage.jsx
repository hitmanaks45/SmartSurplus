import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext.jsx';
import donationService from '../api/donationService';
import geocodingService from '../api/geocodingService';
import { PlusCircle, Utensils, Package, Calendar, MapPin, Heart, Search } from 'lucide-react';

const CreateDonationPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isGeocoding, setIsGeocoding] = useState(false);

  const [formData, setFormData] = useState({
    category: 'Cooked Meal',
    foodType: '',
    quantity: '',
    bestBefore: '',
    address: '',
    coordinates: null,
  });

  const { category, foodType, quantity, bestBefore, address } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleGeocode = async () => {
    if (!address) {
      toast.error('Please enter an address first.');
      return;
    }
    setIsGeocoding(true);
    try {
      const coords = await geocodingService.geocodeAddress(address);
      setFormData((prevState) => ({
        ...prevState,
        coordinates: coords,
      }));
      toast.success('Address located successfully!');
    } catch (error) {
      toast.error('Could not find location. Please check the address.');
    } finally {
      setIsGeocoding(false);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.coordinates) {
        toast.error('Please locate the address on the map before posting.');
        return;
    }

    setIsLoading(true);
    const donationData = {
      category,
      foodType,
      quantity,
      bestBefore,
      location: {
        type: 'Point',
        coordinates: formData.coordinates,
        address: formData.address,
      },
    };

    try {
      await donationService.createDonation(donationData, user.token);
      toast.success('Donation posted successfully!');
      // --- MODIFICATION ---
      // Navigate to the map page and pass the new coordinates in the state
      navigate('/donations', { 
        state: { newDonationCoords: donationData.location.coordinates } 
      });
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.message ||
        error.toString();
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-68px)] bg-gray-100 flex items-center justify-center p-4">
      <div className="container mx-auto max-w-6xl">
        <div className="bg-white rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden">
          {/* Left Motivational Part */}
          <div className="md:w-5/12 bg-green-500 hover:bg-green-600 transition transform hover:scale-105 text-white p-8 md:p-12 flex flex-col justify-center items-center text-center">
            <Heart className="w-16 h-16 mb-4 opacity-80" />
            <h1 className="text-4xl font-bold leading-tight mb-3">Your Kindness Feeds Hope</h1>
            <p className="text-lg text-green-100 opacity-90">
              A single meal can make a world of difference. Thank you for sharing your surplus and helping us build a community free from hunger.
            </p>
             <img 
                src="/don3.jpg" 
                alt="Motivational food sharing" 
                className="rounded-lg shadow-lg mt-8"
                onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/400x300/E0E0E0/000000?text=Image+Not+Found'; }}
            />
          </div>

          {/* Right Form Part */}
          <div className="md:w-7/12 p-8 md:p-12">
            <div className="flex items-center mb-6 gap-3">
              <div className="bg-green-100 p-3 rounded-full">
                <PlusCircle className="w-8 h-8 text-green-500" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Post a Donation</h2>
                <p className="text-gray-500 mt-1">Fill out the details to help someone in need.</p>
              </div>
            </div>

            <form onSubmit={onSubmit} className="space-y-5">
              {/* Category */}
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select id="category" name="category" value={category} onChange={onChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                  <option>Cooked Meal</option>
                  <option>Fresh Produce</option>
                  <option>Bakery</option>
                  <option>Dairy</option>
                  <option>Packaged Goods</option>
                </select>
              </div>

              {/* Food Type */}
              <div>
                <label htmlFor="foodType" className="block text-sm font-medium text-gray-700 mb-1">Food Item(s)</label>
                <div className="relative">
                  <Utensils className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input type="text" id="foodType" name="foodType" value={foodType} onChange={onChange} placeholder='e.g., "Vegetable Biryani", "Apples"'
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" required />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="sm:w-1/2">
                  <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                  <div className="relative">
                    <Package className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input type="text" id="quantity" name="quantity" value={quantity} onChange={onChange} placeholder='e.g., "Serves 10"'
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" required />
                  </div>
                </div>
                <div className="sm:w-1/2">
                  <label htmlFor="bestBefore" className="block text-sm font-medium text-gray-700 mb-1">Best Before</label>
                  <div className="relative">
                    <Calendar className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input type="datetime-local" id="bestBefore" name="bestBefore" value={bestBefore} onChange={onChange}
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" required />
                  </div>
                </div>
              </div>
              
              {/* Address with Geocoding Button */}
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Pickup Address</label>
                <div className="flex gap-2">
                  <div className="relative flex-grow">
                    <MapPin className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input type="text" id="address" name="address" value={address} onChange={onChange} placeholder="Enter full address"
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" required />
                  </div>
                  <button type="button" onClick={handleGeocode} disabled={isGeocoding}
                    className="px-4 py-2 bg-red-500 text-white hover:bg-red-600 transition font-semibold rounded-lg hover:bg-gray-300 disabled:bg-gray-300 disabled:cursor-wait flex items-center gap-2">
                    <Search size={16} />
                    {isGeocoding ? 'Finding...' : 'Find'}
                  </button>
                </div>
                {formData.coordinates && <p className="text-xs text-green-500 mt-1">✓ Location found!</p>}
              </div>

              <div className="pt-2">
                <button type="submit" disabled={isLoading}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-green-500 hover:bg-green-600 transition transform hover:scale-105 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-transform transform hover:scale-105 disabled:bg-green-400 disabled:cursor-not-allowed">
                  {isLoading ? 'Posting Donation...' : 'Post Donation'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateDonationPage;
