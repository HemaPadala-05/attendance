const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.use('/auth', authRoutes);

// Add other routes: /students, /teachers, /admin as you implement
app.use('/qrcode', require('./routes/qrcode'));
app.use('/notify', require('./routes/notify'));
app.use('/attendance', require('./routes/attendance'));
app.use('/admin', require('./routes/admin'));
app.use('/timetable', require('./routes/timetable'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

