const axios = require('axios');

const getCoordinates = async (address) => {
  const apiKey = process.env.GOOGLE_GEOCODING_API_KEY; // replace with your actual key or use .env
  const encodedAddress = encodeURIComponent(address);
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`;

  try {
    const response = await axios.get(url);

    if (response.data.status !== 'OK') {
      throw new Error(`Geocoding failed: ${response.data.status}`);
    }

    const location = response.data.results[0] && response.data.results[0].geometry.location;
    return location; // { lat: ..., lng: ... }
  } catch (error) {
    console.error('Geocoding error:', error.message);
    throw error;
  }
};

module.exports = { getCoordinates };
