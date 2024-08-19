const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');

// Route to send email
router.post('/send-email', notificationController.sendEmail);

module.exports = router;
