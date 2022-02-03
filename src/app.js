var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var identityRouter = require('./routes/IdentityRoute');
var managementRouter = require('./routes/managementRoute');
const AuthHelper = require("./_Helpers/Auth_Helper");
var app = express();
const Port = process.env.PORT||3000;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
////////////////////global error handler-------
swaggerJsdoc = require("swagger-jsdoc"),
swaggerUi = require("swagger-ui-express");
///////////////
app.use('/api/v1/management', managementRouter);
app.use('/api/v1/identity', identityRouter);

app.use(AuthHelper.ErrorHandler);  
/////////////page Not Found ---------------
app.get('*', function(req, res){ res.status(404).json("404 Page Not found ")});
app.post('*', function(req, res){ res.status(404).json("404 Page Not found ")});
app.put('*', function(req, res){ res.status(404).json("404 Page Not found ")});
app.delete('*', function(req, res){ res.status(404).json("404 Page  Not found ")});


module.exports = app;
