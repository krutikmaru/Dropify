// routes/auth.js
const express = require("express");
const router = express.Router();
const User = require("../models/user");
router.post("/login", async (req, res) => {
  try {
    const { username, password, picture, created, products, given_name } =
      req.body;

    let user = await User.findOne({ username });
    if (!user) {
      user = new User({
        username,
        password,
        picture,
        created,
        products,
        given_name,
      });
      await user.save();
      res.json(user);
    } else {
      if (password === user.password) {
        // Formatting username if google login, otherwise it will display username-surname-google
        const splits = user.username.split("-");
        // if true then it is google login else application login
        if (splits.length > 0) {
          user.username = splits[0];
        }
        res.json(user);
      } else {
        throw new Error("PASSWORD-INVALID");
      }
    }
  } catch (err) {
    console.error("Error handling user login:", err);
    res.status(500).json({ error: "Server error", err });
  }
});

module.exports = router;
