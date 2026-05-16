import axios from 'axios';

// Nominatim API endpoint for forward geocoding (address -> coordinates)
const GEOCODING_API_URL = 'https://nominatim.openstreetmap.org/search';

const geocodeAddress = async (address) => {
  try {
    const response = await axios.get(GEOCODING_API_URL, {
      params: {
        q: address, // The address string to search for
        format: 'json', // We want the response in JSON format
        limit: 1, // We only need the top result
      },
    });

    // If we get a result, return the coordinates
    if (response.data && response.data.length > 0) {
      const { lat, lon } = response.data[0];
      // Note the order: Nominatim returns [lat, lon], but GeoJSON needs [lon, lat]
      return [parseFloat(lon), parseFloat(lat)];
    } else {
      throw new Error('Address not found');
    }
  } catch (error) {
    console.error('Geocoding error:', error);
    throw error;
  }
};

const geocodingService = {
  geocodeAddress,
};

export default geocodingService;
