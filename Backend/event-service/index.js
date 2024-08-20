const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const uri = "mongodb+srv://amarpradeep0805:admin@cluster0.eerwh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow these methods
  credentials: true // Allow cookies to be sent with the requests
}));
  
mongoose.connect(uri, {
}).then(() => console.log('Connected to MongoDB'));

app.use(express.json());

const eventRoutes = require('./routes/eventRoutes');

app.use('/event', eventRoutes);

const port = 3001;
app.listen(port, () => console.log(`Event Service running on port ${port}`));
