const express = require('express');
const Medical_Records = require('../models/Medical_Records');
const router = express.Router();


// Get all medical records (optionally filter by patient)
router.get('/', async (req, res) => {
  try {
    const { patientId } = req.query; // e.g., /api/medical-records?patientId=123
    let query = {};
    if (patientId) query.patient = patientId;

    const records = await Medical_Records.find(query)
      .populate('patient', 'name')
      .populate('doctor', 'specialization name');

    res.json(records);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch medical records' });
  }
});

// Get a single medical record by ID
router.get('/:id', async (req, res) => {
  try {
    const record = await Medical_Records.findById(req.params.id)
      .populate('patient', 'name')
      .populate('doctor', 'specialization name');
    if (!record) return res.status(404).json({ error: 'Record not found' });
    res.json(record);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch record' });
  }
});

// Create a medical record
router.post('/', async (req, res) => {
  try {
    const { patient, doctor, diagnosis, prescription, notes } = req.body;
    const record = new Medical_Records({ patient, doctor, diagnosis, prescription, notes });
    await record.save();
    res.status(201).json(record);
  } catch (err) {
    console.error(err); // <-- Log full error to console
    res.status(400).json({ 
      error: 'Failed to create medical record', 
      details: err.message // <-- send error message in response
    });
  }
});


// Update a medical record
router.put('/:id', async (req, res) => {
  try {
    const record = await Medical_Records.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!record) return res.status(404).json({ error: 'Record not found' });
    res.json(record);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update record' });
  }
});

// Delete a medical record
router.delete('/:id', async (req, res) => {
  try {
    const record = await Medical_Records.findByIdAndDelete(req.params.id);
    if (!record) return res.status(404).json({ error: 'Record not found' });
    res.json({ message: 'Record deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete record' });
  }
});
module.exports = router;
