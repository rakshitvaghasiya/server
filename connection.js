// connection.js
const { MongoClient } = require("mongodb");
require("dotenv").config();

const client = new MongoClient(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function connectDB() {
  if (!client.topology?.isConnected()) {
    await client.connect();
    console.log("✅ Connected to MongoDB Atlas");
  }
  return client.db("your_db_name"); // 👉 replace with your DB name
}

module.exports = connectDB;
