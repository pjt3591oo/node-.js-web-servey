var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var session = require('express-session');

var routes = require('./routes/index');
var posts = require('./routes/posts');
var users = require('./routes/users');
var search = require('./routes/search');
var admin = require('./routes/admin');
var video = require('./routes/video');

var loginAuth = require('./routes/auth/loginAuth');
var adminAuth = require('./routes/auth/adminAuth');
var mongoose   = require('mongoose');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
if (app.get('env') === 'development') {
  app.locals.pretty = true;
}
app.locals.moment = require('moment');

// mongodb connect
// 아래 DB접속 주소는 꼭 자기 것으로 바꾸세요!
mongoose.connect('mongodb://user:123@ds049651.mongolab.com:49651/pjt3591oo');
mongoose.connection.on('error', console.log);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
app.use('/bower_components',  express.static(path.join(__dirname, '/bower_components')));
app.use(methodOverride('_method', {methods: ['POST', 'GET']}));

app.use('/', routes); //로그인 , 회원가입, 설문하기
app.use('/posts',loginAuth.loginAuth, posts);  // 설문 작성부분
app.use('/users', users); //로그인, 회원가입

app.use('/search',search); //찾는 부분

app.use('/video', video); //로그인, 회원가입
app.use('/admin',loginAuth.loginAuth,adminAuth.adminAuth, admin); //관리자 권한 페이지, 로그인, 권한 검사후 접속

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500).end();
  /*res.render('error', {
    message: err.message,
    error: {}
  });*/
});


module.exports = app;
