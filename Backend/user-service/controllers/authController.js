const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Helper function to sign JWT token
const signToken = (id) => {
  return jwt.sign({ id }, 'your_jwt_secret', { expiresIn: '1h' });
};

// User registration handler
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Create a new user
    const newUser = await User.create({ name, email, password, role });

    // Generate JWT token
    const token = signToken(newUser._id);

    res.status(201).json({
      status: 'success',
      token,
      data: { user: newUser },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};

// User login handler
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: 'fail',
        message: 'Please provide email and password!',
      });
    }

    // Find the user and include the password field
    const user = await User.findOne({ email }).select('+password');

    // Check if the user exists and the password is correct
    if (!user || !(await user.correctPassword(password, user.password))) {
      return res.status(401).json({
        status: 'fail',
        message: 'Incorrect email or password',
      });
    }

    // Generate JWT token
    const token = signToken(user._id);

    res.status(200).json({
      status: 'success',
      token,
      data: { user },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};
