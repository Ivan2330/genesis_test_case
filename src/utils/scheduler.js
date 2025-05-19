const cron = require('node-cron');
const Subscription = require('../models/subscription');
const { getWeatherByCity } = require('../services/weatherService');
const { sendWeatherEmail } = require('../services/emailService');

// Every hour
cron.schedule('0 * * * *', async () => {
  console.log('Hourly job started');

  const subscriptions = await Subscription.findAll({
    where: {
      confirmed: true,
      frequency: 'hourly',
    },
  });

  await processSubscriptions(subscriptions);
});

// Every day at 08:00
cron.schedule('0 8 * * *', async () => {
  console.log('Daily job started');

  const subscriptions = await Subscription.findAll({
    where: {
      confirmed: true,
      frequency: 'daily',
    },
  });

  await processSubscriptions(subscriptions);
});

async function processSubscriptions(subscriptions) {
  for (const sub of subscriptions) {
    try {
      const weather = await getWeatherByCity(sub.city);
      await sendWeatherEmail(sub.email, sub.city, weather);
      console.log(`Sent to ${sub.email} (${sub.city})`);
    } catch (err) {
      console.error(`Failed for ${sub.email}:`, err.message);
    }
  }
}
