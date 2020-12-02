
const Lecture = require('../models/Lecture');

module.exports = (req, res, next) => {
  if (req.session.lectureId && req.session.role === '1') {
    next();
  } else {
    res.redirect('/auth/login')
  }
}