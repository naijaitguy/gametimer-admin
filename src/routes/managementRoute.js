
const Express = require("express");
const router = Express.Router();
const ValidationHelper = require('../_Helpers/Validation_Helper');
const AuthHelper = require('../_Helpers/Auth_Helper');

const IdentityRoute = require('../controllers/IdentityController');
const ManagementRoute = require('../controllers/managementcontroller');


///////Get All-----------------------
router.get("/getalluser", AuthHelper.Authorization([ 1, 2]), ManagementRoute.GetAll);



module.exports = router;
   
