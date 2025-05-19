const express = require('express');
const router = express.Router();

const subscriptionRoutes = require('./subscription');
const weatherRoutes = require('./weather');

router.use('/subscribe', subscriptionRoutes);
router.use('/weather', weatherRoutes);

module.exports = router;
