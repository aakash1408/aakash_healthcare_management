const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/Users");
const Patients = require("../models/Patients");
const Doctors = require("../models/Doctors");
require('dotenv').config();

router.post("/register", async (req, res) => {
    const { name, email, password, role, age, gender, contact, medicalHistory, specialization, availableDays, timing } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: "User exists" });

        // Create User
        user = new User({ name, email, password, role });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();

        // Create role-specific record
        if (role.toLowerCase() === "patient") {
            console.log("Creating patient with data:", { user: user._id, age, gender, contact, medicalHistory });
            const patient = new Patients({
                user: user._id,
                age: age || 0,
                gender: gender || "other",
                contact: contact || "",
                medicalHistory: medicalHistory || []
            });
            
            await patient.save();
            console.log("Patient saved successfully");

            await patient.save();
        } else if (role.toLowerCase() === "doctor") {
            const doctor = new Doctors({
                user: user._id,
                specialization: specialization || {},
                availableDays: availableDays || [],
                timing: timing || { start: "", end: "" }
            });
            await doctor.save();
        }

        // Generate JWT
        const payload = { userId: user.id, role: user.role };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({
            token,
            user: { id: user._id, name: user.name, email: user.email, role: user.role }
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: "Invalid Credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid Credentials" });

        const payload = { userId: user.id, role: user.role, name: user.name };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});

module.exports = router;
