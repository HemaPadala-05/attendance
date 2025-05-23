const router = require('express').Router();
const Timetable = require('../models/Timetable');

router.post('/add', async (req, res) => {
  const data = req.body;
  const entry = new Timetable(data);
  await entry.save();
  res.json({ status: 'saved' });
});

router.get('/:section/:day', async (req, res) => {
  const { section, day } = req.params;
  const schedule = await Timetable.findOne({ section, day });
  res.json(schedule);
});

module.exports = router;
