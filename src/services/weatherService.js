const axios = require('axios');

exports.getWeatherByCity = async (city) => {
  const apiKey = process.env.WEATHER_API_KEY;
  const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(city)}&aqi=no`;

  const response = await axios.get(url);

  const { temp_c, humidity, condition } = response.data.current;

  return {
    temperature: temp_c,
    humidity,
    description: condition.text
  };
};
