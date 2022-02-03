
require('dotenv').config();
const Bcrypt = require('bcrypt');
const AuthHelper = require('../_Helpers/Auth_Helper');

const User = require('../database/models').AdminUser






 exports.CreateAccount = async (UserModel) =>{

    UserModel.password = Bcrypt.hashSync(UserModel.password,10);

    try{

       const NewUser =  await User.create(UserModel);
       if(NewUser.payload.errors)
       { return  {success: false, payload:NewUser.payload.errors} }
       else{ return {success: true, payload:NewUser.payload}  }

    }
    catch(err){ return err;}
    
 }




