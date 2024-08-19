const express = require('express');
const mongoose = require('mongoose');
const notificationRoutes = require('./routes/notificationRoutes');

const app = express();
app.use(express.json());
const uri = "mongodb+srv://amarpradeep0805:admin@cluster0.8ygyy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// MongoDB connection
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Use routes
app.use('/api', notificationRoutes);

// Start server
const PORT = process.env.PORT || 3004;
app.listen(PORT, () => {
  console.log(`Notification Service running on port ${PORT}`);
});
