const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { models } = require("mongoose");
require("dotenv").config();
// const hostURL = "http://localhost:${process.env.PORT}"
const hostURL = "https://testorg-backend.onrender.com";

const maxAge = 60 * 60 * 24 * 3; //3day
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: maxAge });
};

//login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.login(email, password);
    // console.log(user.email,user.password,user.usertype);

    //create a token
    const name = user.username;
    const token = createToken(user._id);

    // jwt.verify(token,process.env.SECRET,(err,decodedToken)=>{//await
    //   console.log(decodedToken._id);
    // })

    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ name, email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//logout user
const logoutUser = (req,res) =>{
  res.cookie("jwt",'',{maxAge : 1});
  res.redirect("/")
}

//signup user
const signupUser = async (req, res) => {
  console.log(req.body);
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

    const url = `${hostURL}/confirmation/${token}`;
    sendMail(url, email);

    res.status(201).json({
      msg: " Successfully created your account. Please verify your email before login",
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//confirm User
const verifyUser = async (req, res) => {
  try {
    const { _id } = jwt.verify(req.params.token, process.env.SECRET);
    await userModel.findOneAndUpdate({ _id }, { isVerified: true });

    res.status(201).json({ msg: "Your email is verified successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//resend mail
const resendMail = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await userModel.verification(email);

    //create a token
    const token = createToken(user._id);

    const url = `${hostURL}/confirmation/${token}`;
    sendMail(url, email);

    res.status(200).json({ msg: " An email has been successfully sent" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// send mail
const sendMail = (url, email) => {
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
    html: `Thanks for signing up to TestOrg. Please click this link to confirm your email : <a href="${url}">${url}</a>`, //maybe add login url
  });
};

module.exports = { signupUser, loginUser, logoutUser, verifyUser, resendMail };
