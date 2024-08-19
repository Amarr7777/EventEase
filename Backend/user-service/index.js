const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const uri = "mongodb+srv://amarpradeep0805:admin@cluster0.wffnw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

app.use(cors({
  origin: 'http://localhost:5173',
}));

app.use(express.json());

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

mongoose.connect(uri, {
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Failed to connect to MongoDB', err);
});

app.use('/auth', authRoutes);
app.use('/users', userRoutes);

app.listen(3002, () => {
  console.log('User Service running on port 3002');
});
