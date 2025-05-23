const express = require('express');
const router = express.Router();
const Attendance = require('../models/Attendance');
const { generateQRCode } = require('../utils/qr');

// Get today's/weekly/monthly attendance
router.get('/attendance/:subject/:type', async (req, res) => {
  const { subject, type } = req.params;
  // Logic to filter based on `type`
  const attendance = await Attendance.find({ subject });
  res.json(attendance);
});

// Generate QR code
router.get('/generate-qr', async (req, res) => {
  const qr = await generateQRCode(); // your custom logic
  res.json({ qr });
});

module.exports = router;
