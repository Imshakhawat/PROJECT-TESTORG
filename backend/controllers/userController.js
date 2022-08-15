const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { models } = require("mongoose");
require("dotenv").config();

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

//login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.login(email, password);
    // console.log(user.email,user.password,user.usertype);

    //create a token
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//signup user
const signupUser = async (req, res) => {
  const { isVerified, usertype, username, email, password } = req.body;
  try {
    const user = await userModel.signup(
      isVerified,
      usertype,
      username,
      email,
      password
    );

    //create a token
    const token = createToken(user._id);
      
    const url = `http://localhost:${process.env.PORT}/confirmation/${token}`;
    sendMail(url,email);

    res.status(200).json({ msg : " Successfully created your account " });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//confirm User
const verifyUser = async (req, res) => {
  try {
    const { _id } = jwt.verify(req.params.token, process.env.SECRET);
    await userModel.findOneAndUpdate({_id}, {isVerified:true});    
    res.status(200).json({ msg : "Your email is verified successfully"});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//resend mail
const resendMail = async(req,res) =>{
  const { email } = req.body;  
  try {    
    const user = await userModel.verification(email);
    
    //create a token
    const token = createToken(user._id);

    const url = `http://localhost:${process.env.PORT}/confirmation/${token}`;
    sendMail(url,email);

    res.status(200).json({ msg : " An email has been successfully sent" });
  } catch (error) {    
    res.status(400).json({ error: error.message });
  }
}

// send mail
const sendMail = (url,email) =>{
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });  
  
  
  transporter.sendMail({
    from: '"TestOrg Team" <foo@example.com>',
    to: email,
    subject: "Confirm Email",
    html: `Thanks for signing up to TestOrg. Please click this link to confirm your email : <a href="${url}">${url}</a>`,
  });
}

module.exports = { signupUser, loginUser, verifyUser, resendMail };
