const { Subscription } = require('../models');
const { sendConfirmationEmail } = require('../services/emailService');
const { generateToken } = require('../services/tokenService');

// Handle new subscription
exports.subscribe = async (req, res) => {
  const { email, city, frequency } = req.body;

  if (!email || !city || !frequency) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Check if already subscribed
    const existing = await Subscription.findOne({ where: { email, city } });
    if (existing) {
      return res.status(409).json({ error: 'Email already subscribed' });
    }

    const token = generateToken();
    const subscription = await Subscription.create({
      email,
      city,
      frequency,
      token,
      confirmed: false
    });

    await sendConfirmationEmail(email, token);

    res.status(200).json({ message: 'Subscription successful. Confirmation email sent.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

// Handle confirmation of subscription
exports.confirm = async (req, res) => {
  const { token } = req.params;

  try {
    const subscription = await Subscription.findOne({ where: { token } });

    if (!subscription) {
      return res.status(404).json({ error: 'Token not found' });
    }

    subscription.confirmed = true;
    await subscription.save();

    res.status(200).json({ message: 'Subscription confirmed successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

// Handle unsubscribe
exports.unsubscribe = async (req, res) => {
  const { token } = req.params;

  try {
    const subscription = await Subscription.findOne({ where: { token } });

    if (!subscription) {
      return res.status(404).json({ error: 'Token not found' });
    }

    await subscription.destroy();

    res.status(200).json({ message: 'Unsubscribed successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
};
