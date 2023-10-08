const mongoose = require("mongoose");

const backpackSchema = new mongoose.Schema({
  type: {
    type: String,
    default: "backpack",
  },
  username: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  textColor: {
    type: String,
    required: true,
  },
  bagColor: {
    type: String,
    required: true,
  },
  created: {
    type: String,
    required: true,
  },
});

const Backpack = mongoose.model("Backpack", backpackSchema);

module.exports = Backpack;
