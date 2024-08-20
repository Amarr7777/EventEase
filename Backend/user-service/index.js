const amqp = require('amqplib');
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const consumeUserRequests = require('./services/rabbitmqConsumer.js');
const authRoutes = require('./routes/authRoutes.js');
const userRoutes = require('./routes/userRoutes.js');

const app = express();

const uri = "mongodb+srv://amarpradeep0805:admin@cluster0.wffnw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow these methods
  credentials: true // Allow cookies to be sent with the requests
}));

app.use(express.json());

mongoose.connect(uri).then(() => {
  console.log('Connected to MongoDB');

  // Start the consumer after DB connection is established
  consumeUserRequests();

}).catch((err) => {
  console.error('Failed to connect to MongoDB', err);
});

app.use('/auth', authRoutes);
app.use('/users', userRoutes);

app.listen(3002, () => {
  console.log('User Service running on port 3002');
});


