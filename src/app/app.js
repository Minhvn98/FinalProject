
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const app = express();
require('dotenv').config()


const port = (process.env.PORT || 3000)
const adminRouter = require('./routers/admin');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(cookieParser());
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.static(path.join(__dirname, '..', 'vendor')));

//app.use('/', indexRouter);
//app.use('/users', usersRouter);
app.use('/admin', adminRouter);

app.get('/', (req, res) => res.render('hehe'))



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

// const express = require('express')
// const path = require('path')
// const app = express();


// const adminRouter = require('./routers/admin');
// app.use(express.static('public'));
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');
// app.use(express.json()) // for parsing application/json
// app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
// app.get('/', (req, res) =>
//     res.render(path.join(__dirname, 'views', 'admin', 'admin-lecture'))
// )

// app.use('/admin', adminRouter);


// console.log(__dirname)
// app.listen(3000, () => console.log(`App listen on port 3000`))