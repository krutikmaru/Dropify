const mongoose = require("mongoose");

const tshirtSchema = new mongoose.Schema({
  type: {
    type: String,
    default: "tshirt",
  },
  username: {
    type: String,
    required: true,
  },
  tshirtColor: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  created: {
    type: String,
    required: true,
  },
});

const Tshirt = mongoose.model("Tshirt", tshirtSchema);

module.exports = Tshirt;
