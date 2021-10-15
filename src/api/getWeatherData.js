import axios from 'axios';

export default async function getWeatherData(latitude, longitude) {
  try {
    const { data } = await axios.get(
      'https://community-open-weather-map.p.rapidapi.com/weather',
      {
        params: {
          lat: latitude,
          lon: longitude,
          units: 'metric',
        },
        headers: {
          'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
          'x-rapidapi-key':
            '3131871591msh8eb8b037029c019p156ab6jsnb6de7c483ca2',
        },
      }
    );
    
    const { name, main, weather } = data;
    return { name, main, weather: weather[0] };
  } catch (err) {
    console.log('Unable to fetch weather data', err);
    return null;
  }
}
