const express = require('express');
const router = express.Router();

// Minimal placeholder endpoint(s) for medical records
router.get('/', (req, res) => {
	res.json({ msg: 'medical record routes placeholder' });
});

module.exports = router;
