const { Router } = require("express");
const router = Router();

//controller functions
const {
  signupUser,
  loginUser,
  logoutUser,
  verifyUser,
  resendMail,
} = require("../controllers/userController");

//signup
router.post("/signup", signupUser);
//login
router.post("/login", loginUser);
//logout
router.get("/logout",logoutUser);
//mail confirmation
router.get("/confirmation/:token", verifyUser);
router.post("/confirmation/resend", resendMail);
//password recovery

module.exports = router;
