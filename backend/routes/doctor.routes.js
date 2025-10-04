const express = require('express');
const Doctors = require('../models/Doctors');
const router = express.Router();

// Get all doctors
router.get("/", async (req, res) => {
  try {
    const doctors = await Doctors.find().populate("user", "name email");
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch doctors" });
  }
});

// Get single doctor by ID
router.get("/:id", async (req, res) => {
  try {
    const doctor = await Doctors.findById(req.params.id).populate("user", "name email");
    if (!doctor) return res.status(404).json({ error: "Doctor not found" });
    res.json(doctor);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch doctor" });
  }
});

// Add new doctor
router.post("/", async (req, res) => {
  try {
    const { user, specialization, availableDays, timing } = req.body;
    const doctor = new Doctors({ user, specialization, availableDays, timing });
    await doctor.save();
    res.status(201).json(doctor);
  } catch (err) {
    res.status(400).json({ error: "Failed to create doctor" });
  }
});

// Update doctor
router.put("/:id", async (req, res) => {
  try {
    const doctor = await Doctors.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!doctor) return res.status(404).json({ error: "Doctor not found" });
    res.json(doctor);
  } catch (err) {
    res.status(400).json({ error: "Failed to update doctor" });
  }
});

// Delete doctor
router.delete("/:id", async (req, res) => {
  try {
    const doctor = await Doctors.findByIdAndDelete(req.params.id);
    if (!doctor) return res.status(404).json({ error: "Doctor not found" });
    res.json({ message: "Doctor deleted" });
  } catch (err) {
    res.status(500).json({ errosr: "Failed to delete doctor" });
  }
});

module.exports = router;
