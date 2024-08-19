const Event = require('../models/Event');

exports.createEvent = async (req, res) => {
  const event = new Event(req.body);
  await event.save();
  res.status(201).send(event);
};

exports.getAllEvents = async (req, res) => {
  const events = await Event.find();
  res.send(events);
};

exports.getEventById = async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) return res.status(404).send('Event not found');
  res.send(event);
};

exports.updateEvent = async (req, res) => {
  const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!event) return res.status(404).send('Event not found');
  res.send(event);
};

exports.deleteEvent = async (req, res) => {
  await Event.findByIdAndDelete(req.params.id);
  res.status(204).send();
};
