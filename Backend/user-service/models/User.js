const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define User Schema
const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true, select: false }, // Ensure password is not selected by default
  role: { type: String, enum: ['admin', 'organizer', 'attendee'], default: 'attendee' },
});

// Hash password before saving
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next(); // Only hash if the password has been modified
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Compare the provided password with the stored hashed password
UserSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

module.exports = mongoose.model('User', UserSchema);
