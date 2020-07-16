const weatherForm = document.querySelector('form');
const searchAddress = document.querySelector('input');

const message = document.querySelector('#message');
const description = document.querySelector('#description');
const temp = document.querySelector('#temp');
const feelsLike = document.querySelector('#feels-like');
const windSpeed = document.querySelector('#wind-speed');
const humidity = document.querySelector('#humidity');
const uvIndex = document.querySelector('#uv-index');

weatherForm.addEventListener('submit', e => {
  e.preventDefault();
  const address = searchAddress.value;

  message.textContent = 'Loading...';
  fetch(`http://localhost:3000/weather?address=${address}`, { mode: 'cors' })
    .then(response => {
      return response.json();
    })
    .then(data => {
      if (data.error) {
        message.textContent = data.error;
      } else {
        message.textContent = `Forecast for: ${data.location}`;
        description.textContent = `Currently: ${data.description}`;
        temp.textContent = `Temperature: ${data.temp}`;
        feelsLike.textContent = `Feels Like: ${data.feelsLike}`;
        windSpeed.textContent = `Wind Speed: ${data.windSpeed}`;
        humidity.textContent = `Humidity: ${data.humidity}`;
        uvIndex.textContent = `UV Index: ${data.uvIndex}`;
      }
    });
});
