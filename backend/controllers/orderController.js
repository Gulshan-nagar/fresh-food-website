const Order = require('../models/orderModel');

exports.createOrder = async (req, res) => {
  const { items, totalPrice } = req.body;

  if (!items || totalPrice <= 0) {
    return res.status(400).json({ message: 'Please provide valid items and total price.' });
  }

  try {
    const order = new Order({
      user: req.user._id,
      items,
      totalPrice,
    });

    const createdOrder = await order.save();
    res.status(201).json({ message: 'Order created successfully!', order: createdOrder });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(400).json({ message: 'Error creating order. Please try again.' });
  }
};

exports.getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'name email');
    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate('user', 'name email');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.updateOrderStatus = async (req, res) => {
  const { status } = req.body;

  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.status = status;
      const updatedOrder = await order.save();
      res.json({ message: 'Order status updated successfully', order: updatedOrder });
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      await order.remove();
      res.json({ message: 'Order deleted successfully' });
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
