
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const app = express();
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');

require('dotenv').config()

const db = require('../../config/db')
const port = (process.env.PORT || 3000)

const indexRouter = require('./routers') 
const adminRouter = require('./routers/admin');
const lectureRouter = require('./routers/lecture');
const studentRouter = require('./routers/student')

const authAdmin = require('./middlewares/authAdmin');
const authStudent = require('./middlewares/authStudent');
const authLecture = require('./middlewares/authLecture');
global.loggedIn = null;

db.connect();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(methodOverride('_method'))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.static(path.join(__dirname, '..', 'vendor')));
app.use(expressSession({
  secret: 'con cac',
  resave: true,
  saveUninitialized: true
}));
app.use('*', (req, res, next) => {
  loggedIn = req.session.studentId || req.session.lectureId || req.session.adminId;
  next();
})
app.use('/', indexRouter);
app.use('/admin', authAdmin, adminRouter);
app.use('/lecture', authLecture, lectureRouter);
app.use('/student', authStudent, studentRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', {err: err.message});
});



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
