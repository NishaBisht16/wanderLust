// routes/location.js

const { getCoordinates } = require('../utils/geocoding');


const getCordinates=async (req, res) => {
  const { address } = req.body;
  if (!address) {
    return res.status(400).json({ error: 'Address is required' });
  }

  try {
    const coordinates = await getCoordinates(address);
    res.json({ coordinates });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch coordinates' });
  }
};

module.exports = {getCordinates};
