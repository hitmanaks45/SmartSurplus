import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/api/donations`;

// Create a new donation
const createDonation = async (donationData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, donationData, config);
  return response.data;
};

// Get all available donations
const getAvailableDonations = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

// Claim a donation
const claimDonation = async (donationId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.put(`${API_URL}/${donationId}/claim`, {}, config);
    return response.data;
};

// --- NEW FUNCTION ---
// Get donations for the logged-in donor
const getMyDonations = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.get(`${API_URL}/mydonations`, config);
    return response.data;
};

// --- NEW FUNCTION ---
// Get claims for the logged-in receiver
const getMyClaims = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.get(`${API_URL}/myclaims`, config);
    return response.data;
};


const donationService = {
  createDonation,
  getAvailableDonations,
  claimDonation,
  getMyDonations,
  getMyClaims,
};

export default donationService;
