const Express = require("express");
const Validation_Helper = require('../_Helpers/Validation_Helper');
const AuthHelper = require('../_Helpers/Auth_Helper');
const UserService= require('../services/UserService');
const Joi = require('joi');
const Bcrypt = require('bcrypt');

const AdminUser = require('../database/models').AdminUser


const User = require('../database/models').User

exports.CountAll = async (req,res,next)=>{ 
    
     await User.findAll()
     .then( Response=> {

          res.status(200).json({data: {totaluser:Response.length} , responseCode:"200",responseDescription:"Successful "})
     })
     .catch( err => next(err))

    };

    exports.CountAllActiveUsers = async (req,res,next)=>{ 
    
     await User.findAll({ where :{verified:true}})
     .then( Response=> {

          res.status(200).json({data: {totalactiveuser:Response.length} , responseCode:"200",responseDescription:"Successful "})
     })
     .catch( err => next(err))

    };

exports.GetAll = async (req,res,next)=>{ 
    
     await User.findAll()
     .then( Response=> Response? res.status(200).json(Response): res.status(404).json("No User Found"))
     .catch( err => next(err))

    };
    exports.GetUserById = async (req,res,next)=>{

     const Userid = req.params.id;

      await User.findOne({where :{id:Userid}}).then(user =>{

           if(user){
        res.status(200).json({data:user, responseCode:"200",responseDescription:"Successful "})

           }
           
           else{res.status(404).json({data:null, responseCode:"404",responseDescription:"User not Found"})  }
           console.log(user)
      }).catch( err => next(err))
     console.log(Userid);


    };
    exports.GetUserByCountry = async (req,res,next)=>{

     const Userid = req.params.country;

      await User.findAll({where :{country:Userid}}).then(user =>{

           if(user.length >0){
        res.status(200).json({data:user, responseCode:"200",responseDescription:"Successful "})

           }
           
           else{res.status(404).json({data:null, responseCode:"404",responseDescription:"User not Found"})  }
           console.log(user)
      }).catch( err => next(err))
     console.log(Userid);


    };

    exports.GetUserByName = async (req,res,next)=>{

     const Userid = req.params.name;

      await User.findAll({where :{name:Userid}}).then(user =>{

           if(user.length >0){
        res.status(200).json({data:user, responseCode:"200",responseDescription:"Successful "})

           }
           
           else{res.status(404).json({data:null, responseCode:"404",responseDescription:"User not Found"})  }
           console.log(user)
      }).catch( err => next(err))
     console.log(Userid);


    };

    exports.GetUserDateregistered = async (req,res,next)=>{

     const Userid = req.params.date;

      await User.findAll({where :{createdAt:Userid}}).then(user =>{

           if(user.length >0){
        res.status(200).json({data:user, responseCode:"200",responseDescription:"Successful "})

           }
           
           else{res.status(404).json({data:null, responseCode:"404",responseDescription:"User not Found"})  }
           console.log(user)
      }).catch( err => next(err))
     console.log(Userid);


    };

    exports.GetUserByCity = async (req,res,next)=>{

     const Userid = req.params.city;

      await User.findAll({where :{city:Userid}}).then(user =>{

           if(user.length>0){
        res.status(200).json({data:user, responseCode:"200",responseDescription:"Successful "})

           }
           
           else{res.status(404).json({data:null, responseCode:"404",responseDescription:"User not Found"})  }
           console.log(user)
      }).catch( err => next(err))
     console.log(Userid);


    };
    exports.GetUserByEmail = async (req,res,next)=>{

     const Userid = req.params.email;

      await User.findOne({where :{email:Userid}}).then(user =>{

           if(user){
        res.status(200).json({data:user, responseCode:"200",responseDescription:"Successful "})

           }
           
           else{res.status(404).json({data:null, responseCode:"404",responseDescription:"User not Found"})  }
           console.log(user)
      }).catch( err => next(err))
     console.log(Userid);


    };
    exports.UpdateUser = async (req,res,next)=>{

     const Userid = req.params.id;

      await User.findOne({where :{id:Userid}}).then(user =>{

           if(user){

          user.update().then(data=>{ res.status(200).json({data:data, responseCode:"200",responseDescription:"User Successful Updated"})}).catch(err => next(err))

           }
           
           else{res.status(404).json({data:null, responseCode:"404",responseDescription:"User not Found"})  }
           console.log(user)
      }).catch( err => next(err))
     console.log(Userid);


    };