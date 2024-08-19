const express = require('express');
const mongoose = require('mongoose');

const app = express();
const ticketRoutes = require('./routes/ticketRoutes');
const uri = "mongodb+srv://amarpradeep0805:admin@cluster0.rmlbx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Middleware
app.use(express.json());

// MongoDB Connection
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB...', err));

app.use('/ticket', ticketRoutes);

// Start server
const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Ticket Service running on port ${PORT}`);
});
