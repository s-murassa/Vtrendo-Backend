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
        min: [0, 'Price must be positive']
    },
    category: {
        type: String,
        lowercase: true,
        enum: ['tunics', 'tops', 'dresses', 'abayas']
    },
    onSale: {
        type: Boolean,
        default: false
    },
    qty: {
        online: {
            type: Number,
            default: 0
        },
        inStore: {
            type: Number,
            default: 0
        }
    },
    size: {
        small: { type: Boolean, default: false },
        medium: { type: Boolean, default: false },
        large: { type: Boolean, default: false },
        extraLarge: { type: Boolean, default: false }
    }
});

// Compile the Model
const Product = mongoose.model('Product', productSchema);

// Export the Model
module.exports = Product;