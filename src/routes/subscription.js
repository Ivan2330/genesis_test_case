const express = require('express');
const router = express.Router();
const subscriptionController = require('../controllers/subscriptionController');

// Handle subscription request
router.post('/', subscriptionController.subscribe);

// Handle confirmation link
router.get('/confirm/:token', subscriptionController.confirm);

// Handle unsubscribe link
router.get('/unsubscribe/:token', subscriptionController.unsubscribe);

module.exports = router;
