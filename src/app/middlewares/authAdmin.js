
const Admin = require('../models/Admin');

module.exports = (req, res, next) => {
  if (req.session.adminId && req.session.role === '2') {
    next();
  } else {
    res.redirect('/auth/login')
  }
}