const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(400).json({ msg: 'User not found' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token, user });
});

// Register
router.post('/register', async (req, res) => {
  const { username, password, role, email } = req.body;
  const existing = await User.findOne({ username });
  if (existing) return res.status(400).json({ msg: 'User already exists' });

  const hashed = await bcrypt.hash(password, 10);
  const newUser = new User({ username, password: hashed, role, email });
  await newUser.save();
  res.json({ msg: 'Registered successfully' });
});

// Forgot password
router.post('/reset-password', async (req, res) => {
  const { username, newPassword } = req.body;
  const hashed = await bcrypt.hash(newPassword, 10);
  await
