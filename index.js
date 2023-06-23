const express = require('express');
const path = require('path');
const cors = require('cors');
const methodOverride = require('method-override');
const sassMiddleware = require('sass-middleware');
// const { v4: getId } = require('uuid');
const mongoose = require('mongoose');

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
app.use(require('./router.js')); // For requiring routes
app.use(express.static(path.join(__dirname, 'public'))); // Serve static assets
app.use(
  sassMiddleware({
    src: path.join(__dirname, 'public'),
    dest: path.join(__dirname, 'public'),
    debug: true,
    outputStyle: 'compressed', // Choose the preferred output style (compressed, expanded, nested)
  })
); //Configure sass
// Set
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Start the server
const PORT = 8000;
app.listen(PORT, () => { 
    console.log(`Serving at ${PORT}`);
});