const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const index = require('./routes/index');
const users = require('./routes/users');
const indent = require('./routes/indent');
const setting = require('./setting');
const app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
	secret:'du',
	store:new MongoStore({
		url:'mongodb://localhost/shopping'
	}),
	saveUninitialized:false,
	resave:false,
	name:'SCGL'
}))
app.use(cookieParser());
app.use(express.static('www'));


////登录拦截
//app.use(function (req,res,next) {
//  if(req.cookies.username){
//      next();
//  }else{
//      if(req.originalUrl=='/users/login' || req.originalUrl=='/users/register' || req.originalUrl == '/users/exit'
//       || req.originalUrl=='/users/gain' || req.originalUrl=='/users/classify/:id'  || req.originalUrl=='/users/specific/:id' 
//      ){
//          next();
//      }else{
//          res.json({
//              status:'10001',
//              msg:'当前未登录',
//              result:''
//          });
//      }
//  }
//});
//console.log('111');


app.use('/', index);
app.use('/users', users);
app.use('/indent',indent)
app.use(require('./routes/adm'));




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
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

app.listen(2000,function(){
	console.log('数据库运行咯')
})

module.exports = app;
