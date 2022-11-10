const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  usertype: {
    type: String,
    required: true,
    possibleValues: ["teacher", "student"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  username: {
    type: String,
    required: true,
    minlength: 2,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
});

//static signup method
userSchema.statics.signup = async function (
  isVerified,
  usertype,
  username,
  email,
  password
) {
  // console.log(isVerified, usertype, username, email, password);
  //validation
  if (!email || !password || !usertype || !username) {
    throw Error("All fields must be field");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email isn't valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error(
      "For Password Use 8 or more characters with a mix of letters, numbers & symbols"
    );
  }
  const exist = await this.findOne({ email });
  if (exist) {
    // console.log("exist");
    throw Error("Email already in use");
  }

  //hashing
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({
    isVerified,
    usertype,
    username,
    email,
    password: hash,
  });

  return user;
};

// static login method
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be field");
  }
  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Incorrect email");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Invalid login credentials");
  }
  // if(!user.isVerified){
  //   throw Error("Please confirm your email to login");
  // }

  return user;
};

//email verification
userSchema.statics.verification = async function (email, password) {
  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Incorrect email");
  }
  return user;
};
module.exports = mongoose.model("User", userSchema);
// const userModel = mongoose.model("User", userSchema);
// module.exports = userModel;
