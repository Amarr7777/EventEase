const User = require('../models/User');

exports.getUserProfile = async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    return res.status(404).json({
      status: 'fail',
      message: 'User not found',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
};

exports.updateUserProfile = async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.user.id,
    req.body,
    { new: true, runValidators: true }
  );

  if (!user) {
    return res.status(404).json({
      status: 'fail',
      message: 'User not found',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
};
