const express = require('express');
const { createOrder, getOrder, getAllOrders, updateOrderStatus, deleteOrder } = require('../controllers/orderController');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

// Create order route
router.post('/create', authenticate, createOrder);
router.post('/', authenticate, createOrder);

router.put('/:id', authenticate, updateOrderStatus);

router.delete('/:id', authenticate, deleteOrder);

// Get specific order route
router.get('/:id', authenticate, getOrder);

// Get all orders route
router.get('/', authenticate, getAllOrders);

module.exports = router;
