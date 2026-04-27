const express = require('express');
const router = express.Router();
const { products, artisans } = require('../dataStore');

// Get all products
router.get('/', (req, res) => {
  try {
    const populatedProducts = products.map(product => {
      const artisanObj = artisans.find(a => a._id === product.artisan);
      return { ...product, artisan: artisanObj };
    });
    res.json(populatedProducts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single product
router.get('/:id', (req, res) => {
  try {
    const product = products.find(p => p._id === req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    
    const artisanObj = artisans.find(a => a._id === product.artisan);
    res.json({ ...product, artisan: artisanObj });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create product
router.post('/', (req, res) => {
  try {
    const newProduct = {
      _id: Date.now().toString(),
      name: req.body.name,
      category: req.body.category,
      description: req.body.description,
      imageUrl: req.body.imageUrl,
      artisan: req.body.artisan,
      basePrice: Number(req.body.basePrice),
      sellingPrice: Number(req.body.sellingPrice),
      stockQuantity: Number(req.body.stockQuantity),
      createdAt: new Date().toISOString()
    };

    products.push(newProduct);
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
