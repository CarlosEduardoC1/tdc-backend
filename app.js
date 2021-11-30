var createError = require('http-errors');
var express = require('express');
var cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var validator = require('express-validator');
const passport = require('passport');
const session = require('express-session');
var sequelize = require('./models/index');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
var auth = require("./middlewares/auth-jwt")();
const ngrok = require('ngrok');

var authRouter = require('./routes/auth');
var recuperarSenhaRouter = require('./routes/recuperarsenha');
var pingRouter = require('./routes/ping');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var processosRouter = require('./routes/processos');
var viaCepRouter = require('./routes/viacep');
var chatRouter = require('./routes/faq');
var filesRouter = require('./routes/files');

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(validator({}));
var pass = require('./middlewares/auth')(passport);
app.use(session({
  secret: "THISISMYSECRET105815",
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 30 * 24 * 60 * 60 * 1000, // 1 month
  },
}));

console.log(path.join(__dirname, 'public'))
app.use(passport.initialize());
app.use(passport.session());
app.use(auth.initialize());
app.use(cors());
app.options('*', cors());
app.set('io', io);

// Routes
app.use('/auth', authRouter);
app.use('/ping', pingRouter);
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/recuperarsenha', recuperarSenhaRouter);
app.use('/processos', processosRouter);
app.use('/cep', viaCepRouter);
app.use('/chat', chatRouter);
app.use('/files', filesRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

(async function() {
  const url = await ngrok.connect(5000);
  console.log(url);
})();
// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
