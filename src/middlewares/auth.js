const jwt = require("jsonwebtoken");
require('dotenv').config()
const { User } = require("../model/user");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new Error("Invalid token !!!!");
    }
    const decode = jwt.verify(token, process.env.JWT_SCERET);
    const user = await User.findById(decode._id);
    if (!user) {
      throw new Error("User doesn't exist");
    }
    req.user = user
    next();
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
};
module.exports = {
  userAuth
};
