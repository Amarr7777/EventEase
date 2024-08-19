const Ticket = require('../models/Ticket');
const Booking = require('../models/Booking');
const stripe = require('stripe')('sk_test_51OZ4LlSFJsovVYEtp2K5Pyk3etuQMFoynoV72KI64gFD1GVO1qzvk5RnzKa3KbADzjqC4HGn171Xxh0BVsrpCQea00s7KF0WnN');

exports.createTicket = async (req, res) => {
  try {
    const ticket = new Ticket(req.body);
    await ticket.save();
    res.status(201).send(ticket);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.bookTicket = async (req, res) => {
  try {
    const { ticketId, userId, paymentMethodId } = req.body;

    const ticket = await Ticket.findById(ticketId);
    if (!ticket || ticket.booked) {
      return res.status(404).send({ error: 'Ticket not available' });
    }

    // Create a new booking
    const booking = new Booking({
      ticket: ticketId,
      user: userId,
      paymentStatus: 'Pending',
    });

    // Create a payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: ticket.price * 100, // Stripe expects the amount in cents
      currency: 'INR',
      payment_method: paymentMethodId,
      confirm: true,
    });

    // Update ticket status and payment status
    ticket.booked = true;
    booking.paymentStatus = 'Completed';

    await ticket.save();
    await booking.save();

    res.status(201).send({ booking, paymentIntent });
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('ticket').populate('user');
    res.status(200).send(bookings);
  } catch (err) {
    res.status(500).send(err);
  }
};
