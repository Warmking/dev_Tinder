const express = require("express");
require('dotenv').config();
const { connectDB } = require("./config/dataBase");
const app = express();
const cookie = require("cookie-parser");
const bcrypt = require("bcrypt");
const { User } = require("./model/user");
const { signUpValidation } = require("./utils/validator");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/auth");

//Middleware helps us to convert the JSON to Js Obj
app.use(express.json());
app.use(cookie());

app.post("/signup", async (req, res) => {
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

app.post("/login", async (req, res) => {
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

app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});

app.post("/sendRequest", userAuth, (req, res) => {
  try {
    const user = req?.user;
    res.send(user?.firstName + " sent you a connection");
  } catch (err) {
    res.status(400).send("Someting went Wrong , Error: " + err.message);
  }
});

connectDB()
  .then(() => {
    console.log("connection established successfully");
    app.listen(3000, () => {
      console.log("server started and listening at port : 3000");
    });
  })
  .catch((err) => {
    console.log("Connection not established successfully");
  });
