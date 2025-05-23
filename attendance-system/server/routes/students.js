const express = require('express');
const router = express.Router();
const Attendance = require('../models/Attendance');

// Get student's attendance
router.get('/:studentId', async (req, res) => {
  const attendance = await Attendance.find({ studentId: req.params.studentId });
  res.json(attendance);
});

module.exports = router;
