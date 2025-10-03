const express = require('express');
const router = express.Router();

// Minimal placeholder endpoint(s) for doctors
router.get('/', (req, res) => {
	res.json({ msg: 'doctor routes placeholder' });
});

module.exports = router;
