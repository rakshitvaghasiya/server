require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./connection");
const userRoutes = require("./model/user");
const bookingRoutes = require("./model/booking");

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Connect DB once and store in app.locals
(async () => {
  try {
    const db = await connectDB();
    app.locals.db = db;
    console.log("✅ Database connection established");
  } catch (err) {
    console.error("❌ Could not connect to DB:", err.message);
  }
})();
app.get("/", (req, res) => {
  res.send("🚀 Backend is running on Render!");
});

app.get("/ping", (req, res) => {
  res.json({ status: "success", message: "pong!" });
});

// ✅ Routes
app.use("/user", userRoutes);
app.use("/api", bookingRoutes);

const PORT = process.env.PORT || 3010;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
