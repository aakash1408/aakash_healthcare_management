// const express = require('express');
// const Doctors = require('../models/Doctors');
// const router = express.Router();

// Get all doctors
// router.get("/", async (req, res) => {
//   try {
//     const doctors = await Doctors.find().populate("user", "name email");
//     res.json(doctors);
//   } catch (err) {
//     res.status(500).json({ error: "Failed to fetch doctors" });
//   }
// });

// Get single doctor by ID
// router.get("/:id", async (req, res) => {
//   try {
//     const doctor = await Doctors.findById(req.params.id).populate("user", "name email");
//     if (!doctor) return res.status(404).json({ error: "Doctor not found" });
//     res.json(doctor);
//   } catch (err) {
//     res.status(500).json({ error: "Failed to fetch doctor" });
//   }
// });

// Add new doctor
// router.post("/", async (req, res) => {
//   try {
//     const { user, specialization, availableDays, timing } = req.body;
//     const doctor = new Doctors({ user, specialization, availableDays, timing });
//     await doctor.save();
//     res.status(201).json(doctor);
//   } catch (err) {
//     res.status(400).json({ error: "Failed to create doctor" });
//   }
// });

// Update doctor
// router.put("/:id", async (req, res) => {
//   try {
//     const doctor = await Doctors.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!doctor) return res.status(404).json({ error: "Doctor not found" });
//     res.json(doctor);
//   } catch (err) {
//     res.status(400).json({ error: "Failed to update doctor" });
//   }
// });

// Delete doctor
// router.delete("/:id", async (req, res) => {
//   try {
//     const doctor = await Doctors.findByIdAndDelete(req.params.id);
//     if (!doctor) return res.status(404).json({ error: "Doctor not found" });
//     res.json({ message: "Doctor deleted" });
//   } catch (err) {
//     res.status(500).json({ errosr: "Failed to delete doctor" });
//   }
// });

// module.exports = router;



const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Users = require('../models/Users');
const Doctors = require('../models/Doctors');

// Get all doctors
router.get("/", async (req, res) => {
  try {
    const doctors = await Doctors.find().populate("user", "name email");
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch doctors" });
  }
});

// Get single doctor
router.get("/:id", async (req, res) => {
  try {
    const doctor = await Doctors.findById(req.params.id).populate("user", "name email");
    if (!doctor) return res.status(404).json({ error: "Doctor not found" });
    res.json(doctor);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch doctor" });
  }
});

// ✅ Add new doctor (with user creation)
router.post("/", async (req, res) => {
  try {
    const { name, email, password, specialization, availableDays, timing } = req.body;

    // 1️⃣ Check if user already exists
    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User with this email already exists" });
    }

    // 2️⃣ Create user with role = 'doctor'
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new Users({
      name,
      email,
      password: hashedPassword,
      role: "doctor"
    });
    await newUser.save();

    // 3️⃣ Create corresponding doctor profile
    const newDoctor = new Doctors({
      user: newUser._id,
      specialization,
      availableDays: availableDays || [],
      timing: timing || { start: "", end: "" }
    });
    await newDoctor.save();

    // 4️⃣ Respond
    res.status(201).json({
      message: "Doctor and user created successfully",
      doctor: newDoctor
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create doctor" });
  }
});

// Update doctor
router.put("/:id", async (req, res) => {
  try {
    const { name, email, specialization } = req.body;

    // Update doctor info
    const doctor = await Doctors.findById(req.params.id).populate("user");
    if (!doctor) return res.status(404).json({ error: "Doctor not found" });

    // Update user info if provided
    if (name) doctor.user.name = name;
    if (email) doctor.user.email = email;
    await doctor.user.save();

    // Update doctor details
    if (specialization) doctor.specialization = specialization;
    await doctor.save();

    res.json({ message: "Doctor updated successfully", doctor });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Failed to update doctor" });
  }
});

// Delete doctor (and its linked user)
router.delete("/:id", async (req, res) => {
  try {
    const doctor = await Doctors.findById(req.params.id);
    if (!doctor) return res.status(404).json({ error: "Doctor not found" });

    // Delete linked user
    await Users.findByIdAndDelete(doctor.user);

    // Delete doctor profile
    await Doctors.findByIdAndDelete(req.params.id);

    res.json({ message: "Doctor and user deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete doctor" });
  }
});

module.exports = router;
