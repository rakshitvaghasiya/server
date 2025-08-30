const { MongoClient } = require("mongodb");
require("dotenv").config();

const uri = process.env.MONGO_URI; // from .env
let db;

async function connectDB(app) {
  try {
    const client = new MongoClient(uri);
    await client.connect();
    console.log("✅ Connected to MongoDB Atlas");

    db = client.db("rentcar"); 
    app.locals.db = db;   // here we can safely attach db to app
  } catch (err) {
    console.error("❌ DB connection failed:", err);
  }
}

module.exports = connectDB;
