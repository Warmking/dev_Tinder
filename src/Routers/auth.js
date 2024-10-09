const express = require('express')
const auth = express.Router()
const {User} = require('../model/user')
const bcrypt = require('bcrypt')


auth.post("/signup", async (req, res) => {
    try {
      //Validation
      signUpValidation(req.body);
      const { firstName, lastName, emailId, password, gender } = req.body;
      // Encrypt the password
      const passwordHash = await bcrypt.hash(password, 10);
      const user = new User({
        firstName,
        lastName,
        emailId,
        password: passwordHash, 
        gender,
      });
      await user.save();
      res.status(201).send("user added successfully");
    } catch (err) {
      res.status(400).send("Error : " + err.message);
    }
  });

  auth.post("/login", async (req, res) => {
    try {
      const { emailId, password } = req.body;
      const user = await User.findOne({ emailId });
      if (!user) {
        throw new Error("Invalid Credentials");
      }
      const isPasswordValid = user.passwordCheck(password)
      if (isPasswordValid) {
        const token = await user.getJWT()
        res.cookie("token", token,{expires: new Date(Date.now() + 900000)});
        res.send("Login successful");
      } else {
        throw new Error("Invalid Credentials");
      }
    } catch (err) {
      res.status(400).send("Error : " + err.message);
    }
  });
  
  module.exports = auth