const express = require('express')
const {userAuth} = require('../middlewares/auth')
const request = express.Router()

request.post("/sendRequest", userAuth, (req, res) => {
    try {
      const user = req?.user;
      res.send(user?.firstName + " sent you a connection");
    } catch (err) {
      res.status(400).send("Someting went Wrong , Error: " + err.message);
    }
  });

  module.exports = request