var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var users = require('./routes/users');

//  需要添加的
var session=require('express-session');

var app = express();

//需要修改的
app.use(cookieParser("An"));
//需要添加的
app.use(session({
    secret:'an',
    resave:false,
    saveUninitialized:true
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));

var ejs = require('ejs');
app.engine("html",require("ejs").__express);
app.set('view engine', 'html');
//app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//需要修改的
app.use(cookieParser("An"));
//需要添加的
app.use(session({
    secret:'an',
    resave:false,
    saveUninitialized:true
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('文件不存在');
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
			title: "打标管理系统",
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
		title: "打标管理系统",
        message: err.message,
        error: {}
    });
});

module.exports = app;
