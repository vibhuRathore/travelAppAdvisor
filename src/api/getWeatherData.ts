import axios from 'axios';
import type WeatherApiResp from '../interfaces/weatherResponse';

export default async function getWeatherData(
  latitude: number,
  longitude: number
) {
  try {
    const { data }: { data: WeatherApiResp } = await axios.get(
      'https://weatherapi-com.p.rapidapi.com/current.json',
      {
        params: {
          q: `${latitude},${longitude}`,
        },
        headers: {
          'X-RapidAPI-Key':
            '5de72bf02cmsh5377d576abc443cp11a327jsnf36e9d9f6fc5',
          'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
        },
      }
    );

    if (data.error) {
      throw new Error(data.error.message);
    }

    return data;
  } catch (err) {
    console.log('Unable to fetch weather data', err);
    return null;
  }
}
