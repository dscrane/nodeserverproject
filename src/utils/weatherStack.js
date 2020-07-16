const request = require('postman-request');
const dotenv = require('dotenv');
dotenv.config();

const weatherStack = (lat, long, callback) => {
  const weatherUrl = `http://api.weatherstack.com/current?access_key=${process.env.WEATHERKEY}&query=${lat},${long}&units=f`;
  request({ url: weatherUrl, json: true }, (err, { body }) => {
    if (err) {
      callback('Unable to connect to the weather service');
    } else if (body.error) {
      callback('Unable to find this location.');
    } else {
      const temp = body.current.temperature;
      const feelsLike = body.current.feelslike;
      const description = body.current.weather_descriptions[0];
      const uvIndex = body.current.uv_index;
      const humidity = body.current.humidity;
      const windSpeed = body.current.wind_speed;

      callback(undefined, {
        temp,
        feelsLike,
        description,
        uvIndex,
        humidity,
        windSpeed,
      });
    }
  });
};

module.exports = weatherStack;
