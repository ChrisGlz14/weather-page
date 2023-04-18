// Capturar los elementos del DOM para poder modificarlos luego.
const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', async () => {
  const APIKey = '2afc53a874658237e910cb988708efc2'; 
  let city = document.querySelector('.search-box input').value; 

  if (city === '')
    return;

  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`);
    const json = await response.json();

    if (json.cod === '404') {
      container.style.height = '500px';
      weatherBox.style.display = 'none';
      weatherDetails.style.display = 'none';
      error404.style.display = 'block';
      error404.classList.add('fadeIn');
      return;
    }

    error404.style.display = 'none';
    error404.classList.remove('fadeIn');

    const image = document.querySelector('.weather-box img');
    const temperature = document.querySelector('.weather-box .temperature');
    const description = document.querySelector('.weather-box .description');
    const humidity = document.querySelector('.weather-details .humidity span');
    const wind = document.querySelector('.weather-details .wind span');

    switch (json.weather[0].main) {
      case 'Clear':
        image.src = 'img/sun.png';
        break;

      case 'Rain':
        image.src = 'img/rain.png';
        break;

      case 'Snow':
        image.src = 'img/temperature.png';
        break;

      case 'drizzle':
        image.src = 'img/drizzle.png';
        break;

      case 'Thunderstorm':
        image.src = 'img/storm.png';
        break;

      case 'Clouds':
        image.src = 'img/cloudy.png';
        break;

      case 'Haze':
        image.src = 'img/haze.png';
        break;

      default:
        image.src = '';
    }

    temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
    description.innerHTML = `${json.weather[0].description}`;
    humidity.innerHTML = `${json.main.humidity}%`;
    wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

    weatherBox.style.display = '';
    weatherDetails.style.display = '';
    weatherBox.classList.add('fadeIn');
    weatherDetails.classList.add('fadeIn');
    container.style.height = '590px';
  } catch (error) {
    console.error(error);
  }
});
