const jwt = require('jsonwebtoken');

router.get('/self', async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const records = await Attendance.find({ studentId: decoded.id });
  res.json(records);
});
