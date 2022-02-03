const Express = require("express");
const Validation_Helper = require('../_Helpers/Validation_Helper');
const AuthHelper = require('../_Helpers/Auth_Helper');
const UserService= require('../services/UserService');
const Joi = require('joi');
const Bcrypt = require('bcrypt');

const AdminUser = require('../database/models').AdminUser


const User = require('../database/models').User

exports.GetAll = async (req,res,next)=>{ 
    
     await User.findAll()
     .then( Response=> Response? res.status(200).json(Response): res.status(404).json("No User Found"))
     .catch( err => next(err))

    };