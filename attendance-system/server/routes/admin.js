const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Timetable = require('../models/Timetable');

// Assign class teacher
router.post('/assign-class-teacher', async (req, res) => {
  const { className, teacherId } = req.body;
  await User.updateOne({ _id: teacherId }, { $set: { classAssigned: className } });
  res.json({ msg: 'Class teacher assigned' });
});

// Upload timetable
router.post('/upload-timetable', async (req, res) => {
  const { className, timetable } = req.body;
  const newTT = new Timetable({ className, timetable });
  await newTT.save();
  res.json({ msg: 'Timetable uploaded' });
});

module.exports = router;
