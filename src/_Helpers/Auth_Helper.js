
require('dotenv').config();
const expressJwt = require('express-jwt');
const jwt = require('jsonwebtoken');
const secret = process.env.ACCESSTOKENSECRET;

exports.Authorization =  (roles = [])=> {


    // roles param can be a single role string (e.g. Role.User or 'User') 
     // or an array of roles (e.g. [Role.Admin, Role.User] or ['Admin', 'User'])
     if (typeof roles === 'string') {
       roles = [roles];
   }
 
   return [
       // authenticate JWT token and attach user to request object (req.user)
       expressJwt({secret , algorithms: ['sha1', 'RS256', 'HS256']}), 
 
       // authorize based on user role
       async  (req, res, next) => {

      if (roles.length && !roles.includes(req.user.role)) {
               // user's role is not authorized
               return res.status(401).json({ message: 'Unauthorized' });
           }
 
           // authentication and authorization successful
           next();
       }
   ];
 
 }
 
 
 exports.ErrorHandler =  (err, req, res, next) => {
    if (typeof (err) === 'string') {
        // custom application error
        return res.status(400).json({ message: err });
    }
 
    if (err.name === 'UnauthorizedError') {
        // jwt authentication error
        return res.status(401).json({message:"invalid token"});
    }
 
    // default to 500 server error
    return res.status(500).json({ message: err.message });
 }
 

  exports.CreateAccesstoken = (User) =>{

    const Token = jwt.sign({ id:User.id ,email: User.email, role:User.role_id}, secret, { expiresIn:'10m'} );
    return Token;
  }  




  