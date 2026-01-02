const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const Contact = require("./models/Contact");

const app = express();
const PORT = process.env.PORT || 5000;

/* Middleware */
app.use(cors());
app.use(express.json());

/* MongoDB connection */
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Error:", err));

/* Health check */
app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

/* SAVE CONTACT */
app.post("/api/contact", async (req, res) => {
  try {
    const { email, phone, message } = req.body;

    if (!email || !message) {
      return res.status(400).json({ message: "Email and message are required" });
    }

    const contact = new Contact({ email, phone, message });
    await contact.save(); // 🔥 Saved to MongoDB

    res.status(201).json({ message: "Contact saved successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

/* View all contacts (optional for testing) */
app.get("/api/contact", async (req, res) => {
  const contacts = await Contact.find().sort({ createdAt: -1 });
  res.json(contacts);
});

/* Start server */
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
