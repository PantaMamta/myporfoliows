const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const Contact = require("./models/Contact");

const app = express();
const PORT = process.env.PORT || 5000;

// ================= MIDDLEWARE =================
app.use(express.json());

app.use(cors({
  origin: [
    "http://localhost:5500",
    "https://YOUR-FRONTEND-NAME.onrender.com"
  ],
  methods: ["GET", "POST"],
  credentials: true
}));

// ================= MONGODB =================
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Error:", err));

// ================= ROUTES =================
app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

// SAVE CONTACT
app.post("/api/contact", async (req, res) => {
  try {
    const { email, phone, message } = req.body;

    if (!email || !message) {
      return res.status(400).json({ message: "Email and message are required" });
    }

    const contact = new Contact({ email, phone, message });
    await contact.save();

    res.status(201).json({ message: "Contact saved successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// VIEW CONTACTS (testing only)
app.get("/api/contact", async (req, res) => {
  const contacts = await Contact.find().sort({ createdAt: -1 });
  res.json(contacts);
});

// ================= START SERVER =================
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
