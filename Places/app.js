var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const db = require("./db");

var app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

db.sequelize.sync().then(() => {
  console.log('Database synchronization completed successfully.');
})
  .catch((error) => {
    console.error('Error during database synchronization:', error);
  });



require("./routes/category.routes")(app);
require("./routes/place.routes")(app);


app.get('/', (req, res, next) => {
  res.json('Hello Feras')
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: 'error' });
});

module.exports = app;