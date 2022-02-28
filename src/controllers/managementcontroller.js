const Express = require("express");
const Validation_Helper = require('../_Helpers/Validation_Helper');
const AuthHelper = require('../_Helpers/Auth_Helper');
const UserService= require('../services/UserService');
const Joi = require('joi');
const Bcrypt = require('bcrypt');
const devicelogs = require("../database/models/devicelogs");
const configuration = require("../database/models/configuration");

const AdminUser = require('../database/models').AdminUser;

const Device = require('../database/models').Device;
const User = require('../database/models').User;

const DeviceLogs = require('../database/models').DeviceLogs;

const Configuration = require("../database/models").Configuration;


exports.GetDeviceConfiguration = async (req,res,next)=>{ 
     
     var sn = req.params.sn;
 console.log(sn)
     await  Configuration.findAll({ where :{serialNumber:sn}})
     .then( Response=> {
          if(Response?.length> 0){
               res.status(200).json({data:Response , responseCode:"200",responseDescription:"Successful "})
    
          } else{ 

               res.status(404).json({data:null , responseCode:"404",responseDescription:"Not Found "})
    
          }
    
     })
     .catch( err => next(err))

    };
exports.GetAllConfiguration = async (req,res,next)=>{ 
     
     await  Configuration.findAll()
     .then( Response=> {
          if(Response?.length> 0){
               res.status(200).json({data:Response , responseCode:"200",responseDescription:"Successful "})
    
          } else{ 

               res.status(404).json({data:null , responseCode:"404",responseDescription:"Not Found "})
    
          }
    
     })
     .catch( err => next(err))

    };

    exports.GetDeviceLogs = async (req,res,next)=>{ 
     
     var sn = req.params.sn;
 console.log(sn)
     await  DeviceLogs.findAll({ where :{serialNumber:sn}})
     .then( Response=> {
          if(Response?.length> 0){
               res.status(200).json({data:Response , responseCode:"200",responseDescription:"Successful "})
    
          } else{ 

               res.status(404).json({data:null , responseCode:"404",responseDescription:"Not Found "})
    
          }
    
     })
     .catch( err => next(err))

    };

exports.GetAllDeviceLogs = async (req,res,next)=>{ 
     
     await  DeviceLogs.findAll()
     .then( Response=> {
          if(Response?.length> 0){
               res.status(200).json({data:Response , responseCode:"200",responseDescription:"Successful "})
    
          } else{ 

               res.status(404).json({data:null , responseCode:"404",responseDescription:"Not Found "})
    
          }
    
     })
     .catch( err => next(err))

    };
exports.GetAllDevices = async (req,res,next)=>{ 
     
     await  Device.findAll()
     .then( Response=> {
          if(Response?.length> 0){
               res.status(200).json({data:Response , responseCode:"200",responseDescription:"Successful "})
    
          } else{ 

               res.status(404).json({data:null , responseCode:"404",responseDescription:"Not Found "})
    
          }
    
     })
     .catch( err => next(err))

    };
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

          if(Response?.length> 0){
               res.status(200).json({data:{avtiveuser:Response.length} , responseCode:"200",responseDescription:"Successful "})
    
          } else{ 

               res.status(404).json({data:null , responseCode:"404",responseDescription:"Not Found "})
    
          }
     })
     .catch( err => next(err))

    };

exports.GetAll = async (req,res,next)=>{ 
    
     await User.findAll()
     .then( Response=>{
          
          if(Response?.length> 0){
               res.status(200).json({data:Response , responseCode:"200",responseDescription:"Successful "})
    
          } else{ 

               res.status(404).json({data:null , responseCode:"404",responseDescription:"Not Found "})
    
          }

     }
     ).catch( err => next(err))

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