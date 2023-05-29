const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const Subscription = require('./models/subscriptions');
 
// Connect to MongoDB
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Vtrendo');
   console.log('Connected to MongoDB');
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

// Create an Express app
const app = express(); 
app.use(cors());
// Middleware
app.use(express.json());
// Set
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.get('/', (req, res) => {
  res.send("Hello World");
});

// Define a route to handle the POST request
app.post('/api/subscription', async (req, res) => {
  try {
    // Extract the data from the request body
    const { email } = req.body;
    console.log(email);
    //   Create an instance of the subscription model
    const subscription = new Subscription({ email :email });
    // Save the data to the database
    const savedEmail = await subscription.save();
    console.log(email);
    res.status(201).json(savedEmail);
  } catch (error) {
        console.error('Failed to save email', error);
        res.status(500).json({ error: 'Server Error' });
      }
});


// Start the server
const PORT = 8000;
app.listen(PORT, () => { 
    console.log(`Serving at ${PORT}`);
});