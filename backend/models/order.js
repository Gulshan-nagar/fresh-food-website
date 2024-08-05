const express = require('express');
const router = express.Router();
const Order = require('../models/orderModel');
const { protect } = require('../middleware/authMiddleware'); // Ensure you have an auth middleware
const { addOrderItems, getOrderById } = require('../controllers/orderController');


// Create new order
router.post('/', protect, async (req, res) => {
  const {
    orderItems,
    totalPrice
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400).json({ message: 'No order items' });
    return;
  } else {
    const order = new Order({
      user: req.user._id,
      orderItems,
      totalPrice,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

module.exports = router;
