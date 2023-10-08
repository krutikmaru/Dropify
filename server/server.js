const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.log("MongoDB connection error:", err));

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const tshirtRoutes = require("./routes/tshirt");
const backpackRoutes = require("./routes/backpack");
const orderRoutes = require("./routes/order");

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/tshirt", tshirtRoutes);
app.use("/api/backpack", backpackRoutes);
app.use("/api/order", orderRoutes);

app.get("/", (req, res) => {
  res.send("Working");
});

app.listen(port, () => {
  console.log("Listening on: http://localhost:5000");
});
