const nodemailer = require('nodemailer');

// Create mail transporter from env
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

// Send confirmation email with token link
exports.sendConfirmationEmail = async (email, token) => {
  const confirmUrl = `${process.env.BASE_URL || 'http://localhost:3000'}/api/subscribe/confirm/${token}`;

  const message = {
    from: process.env.SMTP_USER,
    to: email,
    subject: 'Confirm your weather subscription',
    text: `Please confirm your subscription by clicking this link: ${confirmUrl}`,
    html: `<p>Please confirm your subscription by clicking this link: <a href="${confirmUrl}">${confirmUrl}</a></p>`
  };

  await transporter.sendMail(message);
};

// Send weather update email
exports.sendWeatherEmail = async (email, city, weather) => {
  const message = {
    from: process.env.SMTP_USER,
    to: email,
    subject: `Weather update for ${city}`,
    text: `Current weather in ${city}:
- Temperature: ${weather.temperature}°C
- Humidity: ${weather.humidity}%
- Condition: ${weather.description}`,
    html: `<h3>Weather update for ${city}</h3>
<p><strong>Temperature:</strong> ${weather.temperature}°C</p>
<p><strong>Humidity:</strong> ${weather.humidity}%</p>
<p><strong>Condition:</strong> ${weather.description}</p>`
  };

  await transporter.sendMail(message);
};
