// server/routes/notify.js
const router = require('express').Router();
const nodemailer = require('nodemailer');
const User = require('../models/User');
const Attendance = require('../models/Attendance');

router.get('/irregular/:section', async (req, res) => {
  const students = await User.find({ role: 'student', section: req.params.section });
  const reports = [];

  for (const student of students) {
    const total = await Attendance.countDocuments({ studentId: student._id });
    const present = await Attendance.countDocuments({ studentId: student._id, status: 'present' });
    const percentage = (present / total) * 100;

    if (percentage < 75) {
      reports.push({ email: student.email, percentage: percentage.toFixed(2) });
    }
  }

  const transporter = nodemailer.createTransport({ service: 'gmail', auth: { user: 'yourmail@gmail.com', pass: 'yourpassword' } });
  for (const r of reports) {
    await transporter.sendMail({
      from: 'yourmail@gmail.com',
      to: r.email,
      subject: 'Low Attendance Alert',
      text: `Your attendance is ${r.percentage}%. Please improve.`
    });
  }

  res.json({ status: 'emails sent' });
});
