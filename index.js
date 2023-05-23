const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const Subscription = require('./models');
 
// Connect to MongoDB
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/subscription');
   console.log('Connected to MongoDB');
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

// Create an Express app
const app = express(); 
app.use(cors());
// Middleware
app.use(express.json());

app.get('/', (req, res) => {
  res.send("Hello World");
});

// Define a route to handle newsletter subscription
app.post('/subscription', (req, res) => {
    const { email } = req.body;
  
    // Perform validation if needed
  console.log(email);
    // Save the email to MongoDB
    const subscription = new Subscription({ email });
    subscription.save()
      .then(() => res.sendStatus(201))
      .catch((err) => {
        console.error('Failed to save email', err);
        res.sendStatus(500);
      });
  });


// Start the server
const PORT = 8000;
app.listen(PORT, () => { 
    console.log(`Serving at ${PORT}`);
});