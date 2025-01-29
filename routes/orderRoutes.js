const express = require('express');
const axios = require('axios');
const router = express.Router();

let orders = [];

// Place an order
router.post('/', (req, res) => {
  const { userId, productId, quantity } = req.body;
  const order = { userId, productId, quantity, orderId: orders.length + 1 };
  orders.push(order);
  res.status(201).json(order);
});

// Get all orders
router.get('/', (req, res) => {
  res.json(orders);
});

// Get orders by User ID
router.get('/user/:userId', (req, res) => {
  const userOrders = orders.filter(order => order.userId === parseInt(req.params.userId));
  res.json(userOrders);
});

// Get orders by Product ID
router.get('/product/:productId', (req, res) => {
  const productId = parseInt(req.params.productId);
  const productOrders = orders.filter(order => order.productId === productId);
  res.json(productOrders);
});

// Get an order with User & Product details
router.get('/:id', async (req, res) => {
  const orderId = parseInt(req.params.id);
  const order = orders.find(o => o.orderId === orderId);
  if (!order) return res.status(404).json({ message: "Order not found" });

  try {
    const { data: user } = await axios.get(`http://localhost:3001/users/${order.userId}`);
    const { data: product } = await axios.get(`http://localhost:3003/products/${order.productId}`);

    res.json({ ...order, user, product });
  } catch (error) {
    if (error.response) {
      // Log the response data for more details
      console.error('Error response:', error.response.data);
      console.error('Status code:', error.response.status);
    }
    res.status(500).json({ message: "Error fetching data", error: error.message });
  }
});


module.exports = router;
