const express = require('express');
const path = require('path');
const cors = require('cors');
const methodOverride = require('method-override');
// const { v4: getId } = require('uuid');
const mongoose = require('mongoose');
const Product = require('./models/products');
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
// getId();
// Middleware
app.use(cors());
app.use(express.json()); // For parsing JSON responses
app.use(express.urlencoded({ extended: true })); // For parsing Form urlencoded responses
app.use(methodOverride('_method'));

// Set
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// GET Routes
app.get('/', (req, res) => { //get index page
  res.render('index');
});

app.get('/products', async (req, res) => { //get all products
  const products = await Product.find({});
  console.log(products);
  res.render('products/allProducts', { products });
});

app.get('/products/new', (req, res) => { //get form for creating a product
  res.render('products/createProduct');
});

app.get('/products/:id', async (req, res) => {
  const { id } = req.params;
  const product  = await Product.findById(id);
  console.log(product);
  res.render('products/productDetails', { product });
});

app.get('/products/:id/edit', async (req, res) => { //get form for editing a product
  const { id } = req.params;
  const product = await Product.findById(id);
  res.render('products/editProduct', { product });
});

app.get('/subscribers', async (req, res) => { //get all products
  const subscribers = await Subscription.find({});
  console.log(subscribers);
  res.render('customers/subscribers', { subscribers });
});

// POST routes

app.post('/products', async (req, res) => { //post a newly created product
  const newProduct = new Product(req.body);
  await newProduct.save();
  res.redirect(`/products/${newProduct.id}`);
});

app.post('/api/subscription', async (req, res) => {  // Subscribed emails intake
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

// Put Routes

app.put('/products/:id', async (req, res) => { // Edit Product
  const { id } = req.params;
  const product = await Product.findByIdAndUpdate(id, req.body, {runValidators: true, new: true });
  res.redirect(`/products/${product.id}`);
})


// Start the server
const PORT = 8000;
app.listen(PORT, () => { 
    console.log(`Serving at ${PORT}`);
});