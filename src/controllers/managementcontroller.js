const Express = require("express");
const Validation_Helper = require('../_Helpers/Validation_Helper');
const AuthHelper = require('../_Helpers/Auth_Helper');
const UserService= require('../services/UserService');
const Joi = require('joi');
const Bcrypt = require('bcrypt');
const devicelogs = require("../database/models/devicelogs");
const configuration = require("../database/models/configuration");
const { Op } = require('sequelize');
const { Error } = require("sequelize");
const user = require("../database/models/user");
const AdminUser = require('../database/models').AdminUser;

const Device = require('../database/models').Device;
const User = require('../database/models').User;

const DeviceLogs = require('../database/models').DeviceLogs;

const Configuration = require("../database/models").Configuration;


exports.GetDeviceandUser = async (req,res,next)=>{ 

     try{

 

        const Users_count  = await User.findAll();
        const Device_count = await Device.findAll();
       const ActiveDevice  = await Device.findAll({where:{flightMode:false }})
        const InActiveDevice  = await Device.findAll({where:{flightMode:true }})



        res.status(200).json({data:{Users_count:Users_count.length, Device_count:Device_count.length,ActiveDevice:ActiveDevice.length, InActiveDevice:InActiveDevice.length } , responseCode:"200",responseDescription:"Successful "})
        
     }
     catch(error){  res.status(500).json(error)}
     
  
    };

exports.GetDeviceStatus = async (req,res,next)=>{ 

     try{

        //  black: 0,
        //   army: 1,
        //    blue: 2,
        //    silver: 3,
        //  white: 4,


        const assigned  = await Device.findAll({where:{status:'assigned' }})
        const assigning = await Device.findAll({where:{status:'assigning' }})
        const unassigned  = await Device.findAll({where:{status:'unassigned' }})


       

        res.status(200).json({data:{assigned:assigned.length, assigning:assigning.length, unassigned:unassigned.length, } , responseCode:"200",responseDescription:"Successful "})
        
     }
     catch(error){  res.status(500).json(error)}
     
  
    };
exports.GetCountry = async (req,res,next)=>{ 

     try{

        //  black: 0,
        //   army: 1,
        //    blue: 2,
        //    silver: 3,
        //  white: 4,


        const nl  = await User.findAll({where:{country:'nl' }})
        const us = await User.findAll({where:{country:'us' }})
        const fr = await User.findAll({where:{country:'fr' }})
        const uk = await User.findAll({where:{country:'uk' }})
        const be = await User.findAll({where:{country:'be' }})

        res.status(200).json({data:{nl:nl.length, us:us.length, fr:fr.length,uk:uk.length, be:be.length } , responseCode:"200",responseDescription:"Successful "})
        
     }
     catch(error){  res.status(500).json(error)}
     
  
    };

exports.GetAllDevicesColour = async (req,res,next)=>{ 

     try{

        //  black: 0,
        //   army: 1,
        //    blue: 2,
        //    silver: 3,
        //  white: 4,


        const black = await Device.findAll({where:{color:0 }})
        const army = await Device.findAll({where:{color:1 }})
        const blue = await Device.findAll({where:{color:2 }})
        const silver = await Device.findAll({where:{color:3 }})
        const white = await Device.findAll({where:{color:4 }})

        res.status(200).json({data:{black:black.length, army:army.length, blue:blue.length,silver:silver.length, white:white.length } , responseCode:"200",responseDescription:"Successful "})
        
     }
     catch(error){ return Error;}
     
  
    };
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
    exports.GetDevice = async (req,res,next)=>{ 
     
     var sn = req.params.sn;
      console.log(sn)
     await  Device.findAll({ where :{serialNumber:sn}})
     .then( Response=> {
          if(Response?.length> 0){
               res.status(200).json({data:Response , responseCode:"200",responseDescription:"Successful "})
    
          } else{ 

               res.status(404).json({data:null , responseCode:"404",responseDescription:"Not Found "})
    
          }
    
     })
     .catch( err => next(err))

    };

    exports.GetDevicebyuserid = async (req,res,next)=>{ 
     
     var sn = req.params.userid;
      console.log(sn)
     await  Device.findAll({ where :{userId:sn}})
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
    
     await User.findAll({ where :{verified:true}})
     .then( Response=> {

          res.status(200).json({data: {totaluser:Response.length} , responseCode:"200",responseDescription:"Successful "})
     })
     .catch( err => next(err))

    };

    exports.GetAllActiveUsers = async (req,res,next)=>{ 
    
     await Configuration.findAll()
          .then( Response=> {
//console.log(Response)
          if(Response?.length> 0){

               const ActiveDevice = Response[0].configuration.every(x => x.active === true);
               console.log(ActiveDevice)
               res.status(200).json({data:ActiveDevice, activeUser:ActiveDevice.length , responseCode:"200",responseDescription:"Successful "})
    
          } else{ 

               res.status(404).json({data:null , responseCode:"404",responseDescription:"Not Found "})
    
          }
     })
     .catch( err => next(err))

    };

exports.GetAll = async (req,res,next)=>{ 
    
     await User.findAll({ where :{verified:true}})
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
   
      await User.findByPk(Userid).then(user =>{

           if(user){
        res.status(200).json({data:user, responseCode:"200",responseDescription:"Successful "})
      
           }
           
           else{res.status(404).json({data:null, responseCode:"404",responseDescription:"User not Found"})  ;  console.log(user) }
         
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