const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  price: { type: Number, required: true },
  seatNumber: { type: String, required: true },
  booked: { type: Boolean, default: false },
});

module.exports = mongoose.model('Ticket', TicketSchema);
