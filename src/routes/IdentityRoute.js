const Express = require("express");
const router = Express.Router();
const ValidationHelper = require('../_Helpers/Validation_Helper');
const AuthHelper = require('../_Helpers/Auth_Helper');

const IdentityRoute = require('../controllers/IdentityController');



///////Get All-----------------------
router.get("/getAlluser", AuthHelper.Authorization([ 1, 2]), IdentityRoute.GetAll);
router.get("/getadminbyid/:id", AuthHelper.Authorization(), IdentityRoute.FindUserById);
router.post("/getadminbyemail/:email", IdentityRoute.FindUserByEmail);
router.post("/createaccount", AuthHelper.Authorization([1,2]), IdentityRoute.CreateAccount);
router.post("/login", IdentityRoute.Authenticate);
router.post("/ManageAccount/:id", AuthHelper.Authorization(), IdentityRoute.ManageAccount);
router.post("/ManageProfile/:id", AuthHelper.Authorization(), IdentityRoute.ManageProfile);
router.post("/ManageUserRole/:id", AuthHelper.Authorization(), IdentityRoute.ManageUserRole);
router.delete("/Log_Out", AuthHelper.Authorization(),  IdentityRoute.Log_Out);
router.delete("/DeleteUser/:id", AuthHelper.Authorization(), IdentityRoute.DeleteUser);


module.exports = router;
   