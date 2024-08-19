const nodemailer = require('nodemailer');

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail', // Replace with your email service
  auth: {
    user: 'your-email@gmail.com', // Replace with your email
    pass: 'your-email-password', // Replace with your email password or an app password
  },
});

exports.sendEmail = async (req, res) => {
  const { to, subject, text } = req.body;

  try {
    const mailOptions = {
      from: 'your-email@gmail.com', // Sender address
      to, // List of recipients
      subject, // Subject line
      text, // Plain text body
    };

    await transporter.sendMail(mailOptions);
    res.status(200).send({ message: 'Email sent successfully!' });
  } catch (err) {
    res.status(500).send(err);
  }
};
