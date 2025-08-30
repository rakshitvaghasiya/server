require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./model/user");
const bookingRoutes = require("./model/booking");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Connect MongoDB (only once)
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.error("❌ MongoDB connection error:", err));

// ✅ Routes
app.use("/user", userRoutes);
app.use("/api", bookingRoutes);

// ✅ Use Render's dynamic port
const PORT = process.env.PORT || 3010;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
