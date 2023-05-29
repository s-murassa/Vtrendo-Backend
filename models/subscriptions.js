const mongoose = require('mongoose');

// Defining the Schema
const subscriptionSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true,
      unique: true,
    },
  });
  
  // Compile the Model
  const Subscription = mongoose.model('Subscription', subscriptionSchema);
  
  // Export the Model
  module.exports = Subscription;