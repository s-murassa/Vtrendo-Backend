const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('./models/products');
const Subscription = require('./models/subscriptions');
const { categories } = require('./masterData');

// GET Routes
router.get('/', (req, res) => { //get index page
    res.render('index');
  });
  
  router.get('/products', async (req, res) => { //get all products
    const products = await Product.find({});
    console.log(products);
    res.render('products/allProducts', { products });
  });
  
router.get('/products/new', (req, res) => { //get form for creating a product
  res.render('products/createProduct', {categories});
  });
  
  router.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product  = await Product.findById(id);
    // console.log(product);
    res.render('products/productDetails', { product });
  });
  
  router.get('/products/:id/edit', async (req, res) => { //get form for editing a product
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render('products/editProduct', { product, categories });
  });
  
  router.get('/subscribers', async (req, res) => { //get all products
    const subscribers = await Subscription.find({});
    // console.log(subscribers);
    res.render('customers/subscribers', { subscribers });
  });
  
  // POST routes
  
  router.post('/products', async (req, res) => { //post a newly created product
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.redirect(`/products/${newProduct.id}`);
  });
  
  router.post('/api/subscription', async (req, res) => {  // Subscribed emails intake
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
  
  router.put('/products/:id', async (req, res) => { // Edit Product
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, {runValidators: true, new: true });
    res.redirect(`/products/${product.id}`);
  })

  // Delete Routes

router.delete('/products/:id', async (req, res) => { // Delete Product
  const { id } = req.params;
  const deletedProduct = await Product.findByIdAndDelete(id);
  res.redirect('/products');
});

router.delete('/subscribers/:id', async (req, res) => { // Delete Product
  const { id } = req.params;
  const deletedSubscription = await Subscription.findByIdAndDelete(id);
  res.redirect('/subscribers');
});
  
module.exports = router;