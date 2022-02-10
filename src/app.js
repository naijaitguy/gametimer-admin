var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var identityRouter = require('./routes/IdentityRoute');
var managementRouter = require('./routes/managementRoute');
const AuthHelper = require("./_Helpers/Auth_Helper");
var app = express();
const cors = require('cors');
const corsOptions ={
    origin:'*',
    credentials:true,  
     //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
const Port = process.env.PORT||3000;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
////////////////////global error handler-------
///////////////
app.use('/api/v1/management', managementRouter);
app.use('/api/v1/identity', identityRouter);

app.use(AuthHelper.ErrorHandler);  
/////////////page Not Found ---------------
app.get('*', function(req, res){ res.status(404).json("Resources Not Found on game Timer Get Request")});
app.post('*', function(req, res){ res.status(404).json("Resources Not Found on game Timer")});
app.put('*', function(req, res){ res.status(404).json("Resources Not Found on game Timer")});
app.delete('*', function(req, res){ res.status(404).json("Resources Not Found on game Timer ")});


module.exports = app;
