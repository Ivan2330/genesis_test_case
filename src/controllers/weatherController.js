const { getWeatherByCity } = require('../services/weatherService');

exports.getWeather = async (req, res) => {
  const city = req.query.city;

  if (!city) {
    return res.status(400).json({ error: 'City is required' });
  }

  try {
    const weather = await getWeatherByCity(city);
    res.json(weather);
  } catch (err) {
    console.error(err);
    if (err.response && err.response.status === 400) {
      return res.status(404).json({ error: 'City not found' });
    }
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
};
