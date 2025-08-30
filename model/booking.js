const express = require("express");
const router = express.Router();

// Save new booking

router.post("/bookings", async (req, res) => {
  try {
    const booking = req.body;
    const db = req.app.locals.db;

    const result = await db.collection("Bookings").insertOne({
      ...booking,
      status: "Pending", // default status
      createdAt: new Date(),
    });

    res.status(201).json({ success: true, bookingId: result.insertedId });
  } catch (error) {
    console.error("Error saving booking:", error);
    res.status(500).json({ success: false, error: "Failed to save booking" });
  }
});

// Fetch bookings by email
router.get("/bookings/:email", async (req, res) => {
  try {
    const db = req.app.locals.db;
    const bookings = await db.collection("Bookings")
      .find({ email: req.params.email })
      .sort({ createdAt: -1 })
      .toArray();

    res.json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ success: false, error: "Failed to fetch bookings" });
  }
});

module.exports = router;
