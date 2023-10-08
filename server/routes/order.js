const express = require("express");
const router = express.Router();
const Order = require("../models/order");

// Create a new order
router.post("/create-order", async (req, res) => {
  try {
    const { username, email, phone, address, amount, paymentid, date } =
      req.body;

    const order = new Order({
      username,
      email,
      phone,
      address,
      amount,
      paymentid,
      date,
    });

    await order.save();

    res.json({ message: "Order created successfully", order });
  } catch (err) {
    console.error("Error creating order:", err);
    res.status(500).json({ error: "Server error", err });
  }
});

// Get all orders of a user by username
router.get("/user-orders/:username", async (req, res) => {
  try {
    const { username } = req.params;

    const orders = await Order.find({ username });

    res.json(orders);
  } catch (err) {
    console.error("Error fetching user orders:", err);
    res.status(500).json({ error: "Server error", err });
  }
});

module.exports = router;
