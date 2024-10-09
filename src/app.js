const express = require("express");
require('dotenv').config();
const { connectDB } = require("./config/dataBase");
const app = express();
const cookie = require("cookie-parser");

const authRouter = require('./Routers/auth')
const profileRouter = require('./Routers/profile')
const requestRouter = require('./Routers/requests')

//Middleware helps us to convert the JSON to Js Obj
app.use(express.json());
app.use(cookie());

app.use('/',authRouter)
app.use('/',profileRouter)
app.use('/',requestRouter)


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
