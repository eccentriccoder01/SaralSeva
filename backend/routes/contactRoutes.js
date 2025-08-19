
import express from "express";
import Contact from "../models/contactModel.js";

const router = express.Router();

// POST /api/v1/contact
router.post("/", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // save to MongoDB
    const newMessage = await Contact.create({
      name,
      email,
      subject,
      message,
    });

    res.status(201).json({
      success: true,
      message: "Message sent successfully!",
      data: newMessage,
    });
  } catch (err) {
    console.error("Contact form error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
