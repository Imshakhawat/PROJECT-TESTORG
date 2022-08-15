const { Router } = require('express');
const router = Router();

//controller functions
const {signupUser, loginUser, verifyUser, resendMail} = require("../controllers/userController")

//signup
router.post("/signup",signupUser)
//login
router.post('/login', loginUser);
//mail confirmation
router.get("/confirmation/:token",verifyUser);
router.post("/confirmation/resend",resendMail);

module.exports = router;