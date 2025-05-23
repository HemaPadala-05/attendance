const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String },
  role: { type: String, enum: ['student', 'teacher', 'admin'], required: true },
  classAssigned: { type: String }, // for teachers
  name: { type: String },
});

module.exports = mongoose.model('User', UserSchema);
