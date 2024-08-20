const Event = require('../models/Event');
const requestUser = require('../services/rabbitmqProducer'); // Adjust the path if needed

// Create event
exports.createEvent = async (req, res) => {
  const event = new Event(req.body);
  await event.save();
  res.status(201).send(event);
};

// Get All Events
exports.getAllEvents = async (req, res) => {
  const events = await Event.find();
  res.send(events);
};

// Get by id
exports.getEventById = async (req, res) => {
  const eventId = req.params.id;
  console.log('====================================');
  console.log("backend EventID: ",eventId);
  console.log('====================================');
  try {
    const event = await Event.findById(eventId); // Fetch the event
    if (!event) return res.status(404).send('Event not found');
    
    const user = await requestUser(event.userId); // Request user details via RabbitMQ
    res.json({ event, user });
  } catch (error) {
    console.error('Error fetching event or user details:', error.message);
    res.status(500).send('Error fetching event or user details');
  }
};

// Update Event
exports.updateEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!event) return res.status(404).send('Event not found');
    res.send(event);
  } catch (error) {
    console.error('Error updating event:', error.message);
    res.status(500).send('Internal Server Error');
  }
};

// Delete Event
exports.deleteEvent = async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting event:', error.message);
    res.status(500).send('Internal Server Error');
  }
};
