const express = require('express');
const router = express.Router();

// Minimal placeholder endpoint(s) for appointments
router.get('/', (req, res) => {
	res.json({ msg: 'appointment routes placeholder' });
});

module.exports = router;
