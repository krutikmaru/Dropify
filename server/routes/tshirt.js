const express = require("express");
const router = express.Router();
const Tshirt = require("../models/tshirt");

function getDate() {
  const date = new Date(new Date().toISOString());
  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
}
// Create or update a t-shirt
router.post("/save-tshirt", async (req, res) => {
  try {
    const { _id, username, tshirtColor, image } = req.body;

    if (_id) {
      // Update existing t-shirt
      const existingTshirt = await Tshirt.findByIdAndUpdate(_id, {
        tshirtColor,
        image,
      });

      if (!existingTshirt) {
        return res.status(404).json({ error: "T-shirt not found." });
      }

      res.json(existingTshirt);
    } else {
      // Create a new t-shirt
      const newTshirt = new Tshirt({
        username,
        tshirtColor,
        image,
        created: getDate(),
      });

      await newTshirt.save();

      res.json(newTshirt);
    }
  } catch (err) {
    console.error("Error creating/updating t-shirt:", err);
    res.status(500).json({ error: "Server error", err });
  }
});

router.delete("/delete-tshirt/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTshirt = await Tshirt.findByIdAndDelete(id);

    if (!deletedTshirt) {
      return res.status(404).json({ error: "T-shirt not found." });
    }

    res.json({ message: "T-shirt deleted successfully." });
  } catch (err) {
    console.error("Error deleting t-shirt:", err);
    res.status(500).json({ error: "Server error", err });
  }
});

module.exports = router;
