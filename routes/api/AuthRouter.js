// routing

const express =require('express');
const { signupvalidation, loginvalidation } = require('../../middlewares/AuthValidation');
const { signup, login } = require('../../controllers/AuthController');
const { updatePassword } = require('../../controllers/updatePassword');
const router = express.Router();
// or
// shorthand : const router = require("express").Router();


router.post('/login', loginvalidation ,login);

// router.post('/signup' ,(res,req)=>{
//     res.send('signup success');
// });  change to below

router.post('/signup', signupvalidation ,signup);
router.post('/update-password', updatePassword);  //api/auth/updatePassword


module.exports = router;