const express = require('express');
const router = express.Router();
const { orders, products } = require('../dataStore');

// Get all orders
router.get('/', (req, res) => {
  try {
    const populatedOrders = orders.map(order => {
      const populatedItems = order.items.map(item => {
        const productObj = products.find(p => p._id === item.product);
        return { ...item, product: productObj || { _id: item.product, name: 'Unknown Product' } };
      });
      return { ...order, items: populatedItems };
    });
    // Sort by createdAt descending
    populatedOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    res.json(populatedOrders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create order
router.post('/', (req, res) => {
  try {
    const newOrder = {
      _id: Date.now().toString(),
      customerName: req.body.customerName,
      customerEmail: req.body.customerEmail,
      customerAddress: req.body.customerAddress,
      items: req.body.items,
      totalAmount: req.body.totalAmount,
      status: 'Pending',
      createdAt: new Date().toISOString()
    };

    orders.push(newOrder);
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update order status
router.put('/:id', (req, res) => {
  try {
    const orderIndex = orders.findIndex(o => o._id === req.params.id);
    if (orderIndex === -1) return res.status(404).json({ message: 'Order not found' });
    
    orders[orderIndex].status = req.body.status || orders[orderIndex].status;
    res.json(orders[orderIndex]);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
