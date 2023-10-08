const express = require("express");
const router = express.Router();
const Backpack = require("../models/backpack");

function getDate() {
  const date = new Date(new Date().toISOString());
  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
}

// Create or update a backpack
router.post("/save-backpack", async (req, res) => {
  try {
    const { _id, username, text, textColor, bagColor } = req.body;

    if (_id) {
      // Update existing backpack
      const existingBackpack = await Backpack.findByIdAndUpdate(_id, {
        text,
        textColor,
        bagColor,
      });

      if (!existingBackpack) {
        return res.status(404).json({ error: "Backpack not found." });
      }

      res.json(existingBackpack);
    } else {
      // Create a new backpack
      const newBackpack = new Backpack({
        username,
        text,
        textColor,
        bagColor,
        created: getDate(),
      });

      await newBackpack.save();

      res.json(newBackpack);
    }
  } catch (err) {
    console.error("Error creating/updating backpack:", err);
    res.status(500).json({ error: "Server error", err });
  }
});

router.delete("/delete-backpack/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedBackpack = await Backpack.findByIdAndDelete(id);

    if (!deletedBackpack) {
      return res.status(404).json({ error: "Backpack not found." });
    }

    res.json({ message: "Backpack deleted successfully." });
  } catch (err) {
    console.error("Error deleting backpack:", err);
    res.status(500).json({ error: "Server error", err });
  }
});

module.exports = router;
