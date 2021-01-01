var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors=require('cors');
var bodyParser =require('body-parser');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
let loginRouter = require('./loginModule/login.js');
let deleteRouter= require('./deleteMoudle/delete.js');
let updateRouter= require('./updateMOdule/update.js');
var getRouter=require('./getusers/getUsers.js');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));    
app.set('view engine', 'jade');

app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(__dirname));

app.use('/', indexRouter);
app.use('/create/', loginRouter);
app.use('/login/',loginRouter)
app.use('/delete/',deleteRouter);
app.use('/update/',updateRouter);
app.use('/',getRouter);

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
  res.render('error');
});
app.listen(3001,function(err,data){
  if(err){
    console.log(err);
  }
  else{
    console.log("app is listening to port 3001");
  }
});
module.exports = app;
