
const Express = require("express");
const router = Express.Router();
const ValidationHelper = require('../_Helpers/Validation_Helper');
const AuthHelper = require('../_Helpers/Auth_Helper');

const IdentityRoute = require('../controllers/IdentityController');
const ManagementRoute = require('../controllers/managementcontroller');


///////Get All-----------------------
router.get("/getallusers", AuthHelper.Authorization([ 1, 2]), ManagementRoute.GetAll);
router.put("/updateuser:id",AuthHelper.Authorization([2,1]),ManagementRoute.UpdateUser);
router.get("/getuserbyid/:id",AuthHelper.Authorization([2,1]),ManagementRoute.GetUserById);
router.get("/getuserbyage/:age",AuthHelper.Authorization([2,1]),ManagementRoute.UpdateUser);
router.get("/getuserbycountry/:country",AuthHelper.Authorization([2,1]),ManagementRoute.GetUserByCountry);
router.get("/getuserbycity/:city",AuthHelper.Authorization([2,1]),ManagementRoute.GetUserByCity);
router.get("/getuserbyemail/:email",AuthHelper.Authorization([2,1]),ManagementRoute.GetUserByEmail);
router.get("/getuserbyname/:name",AuthHelper.Authorization([2,1]),ManagementRoute.GetUserByName);
router.get("/getuserbydateregistered/:date",AuthHelper.Authorization([2,1]),ManagementRoute.GetUserDateregistered);
router.get("/countallusers",AuthHelper.Authorization([2,1]),ManagementRoute.CountAll);
router.get("/countactiveusers",AuthHelper.Authorization([2,1]),ManagementRoute.CountAllActiveUsers);



module.exports = router;
   
