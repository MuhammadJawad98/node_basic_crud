const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/product_model');

const app = express();
app.use(express.json());

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error', message: err.message });
});

// Route handlers
app.get('/', (req, res) => {
  res.send('Hello World');
});

app.post('/products', async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
});

app.get('/products', async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
});

app.get('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: `Product with id ${id} not found` });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
});

app.put('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, { new: true });
    if (!product) {
      return res.status(404).json({ message: `Product with id ${id} not found` });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
});

app.delete('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: `Product with id ${id} not found` });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
});

// Database connection
mongoose.connect('mongodb+srv://admin:admin@cluster0.ncwxo0d.mongodb.net/Node-Api')
  .then(() => {
    console.log('Connected to MongoDB');
    // Start the server
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  })
  .catch((error) => {
    console.error(error);
  });
