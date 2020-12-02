
const Student = require('../models/Student');

module.exports = (req, res, next) => {
  if (req.session.studentId && req.session.role === '0') {
    next();
  } else {
    res.redirect('/auth/login')
  }
}