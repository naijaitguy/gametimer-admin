const Express = require("express");
const Validation_Helper = require('../_Helpers/Validation_Helper');
const AuthHelper = require('../_Helpers/Auth_Helper');
const UserService= require('../services/UserService');
const Joi = require('joi');
const Bcrypt = require('bcrypt');
const { Role } = require("../database/models")

const User = require('../database/models').AdminUser;
const Rol = require('../database/models').Role;

exports.GetRoles = async(req,res,next)=>{
await Role.findAll().then(
    data=>{ 
        if(data?.length>0){ 
        res.status(200).json({data:data, responseCode:"200",responseDescription:"Successful"});}
   else{ 

    res.status(404).json({data:data, responseCode:"404",responseDescription:"Not Found"});
   }
   
    }
)  .catch(err=>{  next.status(400).json({data:null, responseCode:"400",responseDescription:""}) })

}

exports.GetLogedInUser = async(req,res,next)=>{


    try{
    const CurrentUserid = req.user.id;

    const Admin = await User.findByPk(CurrentUserid)  
    
 
    const userRole = await  Role.findByPk(Admin.role_id);

    res.status(200).json({data:Admin, rolename:userRole.role_name, responseCode:"200",responseDescription:'Successful'})
    }
    catch(err){
        res.status(500).json({data:null, responseCode:"500",responseDescription:"Internal Server Error"});
    }

};

exports.GetAll = async (req,res,next)=>{ 
    
     await UserService.GetAllUsers()
     .then( Response=> Response? res.status(200).json({ data:Response,responseCode:"200",responseDescription:'Successful'}): res.status(404).json("No User Found"))
     .catch( err => next(err))

};

exports.CreateAccount = async (req, res, next) =>{

    
    /////validate user input with joi-------------


        const value =  Validation_Helper.ValidateCreateAccountModel(req.body) ;

        if(value.error){  res.status(400).json({data:null, responseCode:"400",responseDescription:value.error.message});}
        else{

            const UserModel = 
            { 
                email:req.body.email,
                fullname:req.body.fullname,
                 password:req.body.password,
                 phone:req.body.phone,
                 role_id:req.body.role_id 
            }
              const UserEmail = await  User.findOne({
                where: {email: UserModel.email}
              });

              console.log(UserEmail)
              
              if(UserEmail){  res.status(400).json({data:null, responseCode:"400",responseDescription:"Email Already Exist"}) }
               else{

            UserModel.password = Bcrypt.hashSync(UserModel.password,10);
             User.create(UserModel).then( 
                Response => { res.status(200).json({payload:Response.payload, responseCode:"201",responseDescription:" Registration Successful "})}
                   
                 
                ).catch( err => res.status(500).json({data:null, responseCode:"500",responseDescription:"Internal Server Error"}))

            }
        }

    




 
}

exports.FindUserById = async (req, res, next)=> {

        /////validate user input with joi-------------
Joi.validate(req.params.id, Validation_Helper.ValidateString(), async (err, Result )=>{

    if(err){ res.status(442).json({mgs:err.details.map(i => i.message ).join(" / ")})}
    
else{

    const Id = req.params.id;

    await UserService.GetUserById(Id)
    .then(  Response => Response? res.status(200).json(Response) : res.status(404).json("User Not Found") )


    .catch( err=> next("User Not Found"));
    

}

    });
   

}

exports.Authenticate = async (req, res, next) => {

        /////validate user input with joi-------------
    const value = Validation_Helper.ValidateAuthenticationInput(req.body);
    if(value.error){  res.status(400).json({data:null, responseCode:"400",responseDescription:value.error.message});}
    else{

        
    const LoginModel =  {  email:req.body.email, password:req.body.password, }
      await  User.findOne({
                where: {email: LoginModel.email}          })
              .then(data=>{

                if(data && Bcrypt.compareSync(LoginModel.password,data.password)){


                    const AccesToken = AuthHelper.CreateAccesstoken(data);

                    res.status(200).json({data:data,token:AccesToken, responseCode:"200",responseDescription:" login  Succesful "})

                } else{ res.status(400).json({data:null, responseCode:"400",responseDescription:"Invalid login Credentials"})}

              })
              .catch(err=>{  res.status(400).json({data:null, responseCode:"400",responseDescription:"Invalid login Credentials"}) })

            
            }
    
};

exports.ManageAccount = async (req ,res, next) =>{
  /////validate user input with joi-------------
  Joi.validate(req.body, Validation_Helper.ValidateManageAccount(req.body), async (err, Result )=>{

    if(err){ res.status(442).json({mgs:err.details.map(i => i.message ).join(" / ")})}
    
    else{   const Id = req.params.id;
        const CurrentUserId = req.user.Id;
        
        if(Id !== CurrentUserId){ res.status(401).json("Access Denied") }
        const Model = req.body;
        await UserService.ManageAccount(Id, Model)
        .then( Response => res.status(200).json("Update Successful") )
        .catch( err => next(err) );}

    });
    

}

exports.ManageProfile = async (req ,res, next ) =>{
  /////validate user input with joi-------------
  Joi.validate(req.body, Validation_Helper.ValidateManageprofileAccountModel(req.body), async (err, Result )=>{

    if(err){ res.status(442).json({mgs:err.details.map(i => i.message ).join(" / ")})}
    

    else{

        const Id = req.params.id;
const CurrentUserId = req.user.Id;

if(Id !== CurrentUserId){ res.status(401).json("Access Denied") }

await UserService.ManageProfile(Id, req.body)
.then(Response => res.status(200).json("Profile Updated Successfully"))
.catch(err => next(err));
    }
    });


}

exports.ManageUserRole = async (req ,res, next ) =>{
    /////validate user input with joi-------------
    Joi.validate(req.body, Validation_Helper.ValidateRoleModel(req.body), async (err, Result )=>{
  
      if(err){ res.status(442).json({mgs:err.details.map(i => i.message ).join(" / ")})}

      else{  

        const Id = req.params.id;
        const CurrentUserRole = req.user.role;
        
       if(CurrentUserRole !== "Director"){ res.status(401).json("Access Denied Only Diresctor Have Access") }
        
        await UserService.MnageUserRole(Id, req.body)
        .then(Response => res.status(200).json("User Role  Updated Successfully"))
        .catch(err => next(err));
      }
      
      });

  
}

exports.DeleteUser = async (req ,res, next ) =>{
      
      const Id = req.params.id;

         await User.findByPk(Id).then(
             data=>{

                if(data){

                   // await User.destroy(Id)
                    //.then(res.status(200).json({data:data,token:AccesToken, responseCode:"200",responseDescription:"Admin User Successfully Removed "}))
                    //.catch(err => next(err));

                }else{


                    res.status(404).json({data:null, responseCode:"404",responseDescription:"User Not Found. "})

                }

             }
         )
         .catch(err=>{  res.status(500).json({data:null, responseCode:"500",responseDescription:" Try Again "}) })
      
     
      
}

exports.Log_Out = async (req, res, next) =>{
res.status(200).json("Log Out Successfull")   
}