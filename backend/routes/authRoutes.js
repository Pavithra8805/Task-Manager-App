const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

const router = express.Router();

router.post("/signup", async (req, res) => {
    try {
        const { email, password } = req.body;

        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "User already exists" });

        console.log("🔹 Signup Attempt:", email);
        console.log("🔹 Plain Password:", password);

        user = new User({ email, password });
        await user.save();

        console.log("✅ User saved successfully with hashed password:", user.password);
        res.status(201).json({ message: "User created successfully" });

    } catch (error) {
        console.error("❌ Signup Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});


router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        console.log("🔹 Login Attempt:", email);
        console.log("🔹 Entered Password:", password);

        const user = await User.findOne({ email });
        if (!user) {
            console.log("❌ User not found in database!");
            return res.status(400).json({ message: "Invalid credentials" });
        }

        console.log("✅ User found in database:", user.email);
        console.log("🔹 Stored Hashed Password in DB:", user.password);

        const isMatch = await bcrypt.compare(password, user.password);
        
        console.log("🔹 Password Match Result:", isMatch);

        if (!isMatch) {
            console.log("❌ Password does not match for:", email);
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        console.log("✅ Login Successful! Token Generated:", token);
        res.json({ token });

    } catch (error) {
        console.error("❌ Login Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});


router.post("/logout", (req, res) => {
  res.json({ message: "Logout successful" });
});

module.exports = router;
