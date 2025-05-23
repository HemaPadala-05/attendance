const mongoose = require('mongoose');

const TimetableSchema = new mongoose.Schema({
  className: { type: String, required: true },
  timetable: { type: Array, default: [] }, // e.g., [{ day: 'Monday', period1: 'Math', ... }]
});

module.exports = mongoose.model('Timetable', TimetableSchema);
