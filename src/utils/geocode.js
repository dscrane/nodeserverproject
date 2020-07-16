const request = require('postman-request');
const dotenv = require('dotenv');
dotenv.config();

const geocode = (address, callback) => {
  const mapboxUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=${process.env.MAPBOXKEY}&limit=1`;

  request({ url: mapboxUrl, json: true }, (err, { body }) => {
    if (err) {
      callback('Unable to connect to location services');
    } else if (body.features.length === 0) {
      callback('Unable to find location. Please try a different search term');
    } else {
      const lat = body.features[0].center[1];
      const long = body.features[0].center[0];
      const location = body.features[0].place_name;

      callback(undefined, { lat, long, location });
    }
  });
};

module.exports = geocode;
