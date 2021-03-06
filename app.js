var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors")
var passport = require("passport")

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const UserSchema = require('./Schema/UserSchema');


var app = express();
app.use(cors())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//important to added this

app.use(require("express-session")({
  secret: "Miss white is my cat",
  resave: false,
  saveUninitialized: false
}));


app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//passport initalization and sessions
app.use(passport.initialize())
app.use(passport.session())

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
  res.render('error');
});

passport.serializeUser(UserSchema.serializeUser())
passport.deserializeUser(UserSchema.deserializeUser())


const LocalStrategy = require('passport-local').Strategy

//customize your own startegy/logic only on passport-local not on passport local mongoose
passport.use(new LocalStrategy(UserSchema.authenticate()))

module.exports = app;
