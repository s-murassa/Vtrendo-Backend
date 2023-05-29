const mongoose = require('mongoose');


// Defining the Schema
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        lowercase: true,
        enum: ['Tunics', 'Tops', 'Dresses']
    }
});

// Compile the Model
const Product = mongoose.model('Product', productSchema);

// Export the Model
module.exports = Product;