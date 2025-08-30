const express = require("express");
const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const db = req.app.locals.db;;
    const { name, email, password } = req.body;
    const result = await db.collection("information").insertOne({ name, email, password });

    if (result.acknowledged) {
      res.status(200).json({ status: "success", name, email });
    } else {
      res.status(400).json({ status: "error", message: "User registration failed" });
    }
  } catch (err) {
    res.status(500).json({ status: "error", message: "Internal server error", error: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const db = req.app.locals.db;;
    const { email, password } = req.body;

    const user = await db.collection("information").findOne({ email });
    if (user && user.password === password) {
      res.status(200).json({ status: "success", name: user.name, email: user.email });
    } else {
      res.status(401).json({ status: "error", message: "Invalid email or password" });
    }
  } catch (err) {
    res.status(500).json({ status: "error", message: "Server error", error: err.message });
  }
});

router.post("/book-car", async (req, res) => {
  try {
    const { name, email, phone, carModel, startDate, endDate, pickupLocation, totalPrice } = req.body;

    if (!name || !email || !phone || !carModel || !startDate || !endDate || !pickupLocation) {
      return res.status(400).json({ status: "error", message: "All fields are required" });
    }

    const db = req.app.locals.db;;
    const result = await db.collection("Bookings").insertOne({
      name, email, phone, carModel, startDate, endDate, pickupLocation, totalPrice,
      status: "Pending",
      createdAt: new Date(),
    });

    if (result.acknowledged) {
      return res.json({ status: "success", message: "Booking successful", bookingId: result.insertedId });
    } else {
      return res.status(400).json({ status: "error", message: "Booking failed" });
    }
  } catch (error) {
    console.error("Booking Error:", error);
    return res.status(500).json({ status: "error", message: "Internal server error" });
  }
});

module.exports = router;
