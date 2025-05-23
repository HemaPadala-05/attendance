// server/routes/qrcode.js
const express = require('express');
const router = express.Router();
const QRCode = require('qrcode');
const { v4: uuidv4 } = require('uuid');

const activeQR = {}; // sessionId -> {subject, section, expires}

router.get('/generate/:subject/:section', async (req, res) => {
  const sessionId = uuidv4();
  const { subject, section } = req.params;

  activeQR[sessionId] = {
    subject,
    section,
    expires: Date.now() + 1000 * 60 * 5 // 5 mins
  };

  const qrData = JSON.stringify({ sessionId });
  const qrCode = await QRCode.toDataURL(qrData);
  res.json({ qrCode });
});

module.exports = router;
