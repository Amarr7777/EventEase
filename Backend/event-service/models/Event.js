const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  name: String,
  date: Date,
  venue: String,
  description: String, 
  userId: String,
});

module.exports = mongoose.model('Event', EventSchema);
