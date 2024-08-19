const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');

router.post('/tickets', ticketController.createTicket);
router.post('/book', ticketController.bookTicket);
router.get('/bookings', ticketController.getAllBookings);

module.exports = router;
