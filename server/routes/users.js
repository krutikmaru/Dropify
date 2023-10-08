const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Tshirt = require("../models/tshirt");
const Backpack = require("../models/backpack");

router.post("/update-picture", async (req, res) => {
  try {
    const { username, picture } = req.body;

    let user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    user.picture = picture;
    await user.save();

    res.json(user);
  } catch (err) {
    console.error("Error updating user picture:", err);
    res.status(500).json({ error: "Server error", err });
  }
});

router.post("/delete-user", async (req, res) => {
  try {
    const { username } = req.body;

    const deletedUser = await User.findOneAndDelete({ username });

    if (!deletedUser) {
      return res.status(404).json({ error: "User not found." });
    }

    res.json({ message: "User deleted successfully." });
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).json({ error: "Server error", err });
  }
});
router.get("/user-products/:username", async (req, res) => {
  try {
    const { username } = req.params;

    let tshirts = await Tshirt.find({ username });
    let backpacks = await Backpack.find({ username });

    backpacks = backpacks.map((backpack) => {
      return {
        _id: backpack._id,
        title: "Backpack",
        price: "$12.99",
        focusColor: "bg-display-green",
        navigationUrl: "/backpack",
        data: {
          type: backpack.type,
          created: backpack.created,
          username: backpack.username,
          text: backpack.text,
          textColor: backpack.textColor,
          bagColor: backpack.bagColor,
        },
      };
    });
    tshirts = tshirts.map((tshirt) => {
      return {
        _id: tshirt._id,
        title: "Plain T-Shirt",
        price: "$7.99",
        focusColor: "bg-display-pink",
        navigationUrl: "/tshirt",
        data: {
          type: tshirt.type,
          created: tshirt.created,
          username: tshirt.username,
          tshirtColor: tshirt.tshirtColor,
          image: tshirt.image,
        },
      };
    });

    const products = [...tshirts, ...backpacks];

    res.json(products);
  } catch (err) {
    console.error("Error fetching user products:", err);
    res.status(500).json({ error: "Server error", err });
  }
});
router.post("/add-to-cart", async (req, res) => {
  try {
    const { username, cartItem } = req.body;

    let user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    user.cart.push(cartItem);
    await user.save();

    res.json(user.cart);
  } catch (err) {
    console.error("Error adding item to cart:", err);
    res.status(500).json({ error: "Server error", err });
  }
});

router.post("/remove-from-cart", async (req, res) => {
  try {
    const { username, itemId } = req.body;

    let user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    user.cart = user.cart.filter((item) => item.id.toString() !== itemId);
    await user.save();

    res.json(user.cart);
  } catch (err) {
    console.error("Error removing item from cart:", err);
    res.status(500).json({ error: "Server error", err });
  }
});

router.get("/user-cart/:username", async (req, res) => {
  try {
    const { username } = req.params;

    let user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    res.json(user.cart);
  } catch (err) {
    console.error("Error fetching user cart:", err);
    res.status(500).json({ error: "Server error", err });
  }
});

router.post("/clear-cart/:username", async (req, res) => {
  try {
    const { username } = req.params;

    let user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Set the cart to an empty array
    user.cart = [];

    await user.save();

    res.json({ message: "Cart cleared successfully.", cart: user.cart });
  } catch (err) {
    console.error("Error clearing user cart:", err);
    res.status(500).json({ error: "Server error", err });
  }
});

module.exports = router;
