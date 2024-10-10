const express = require('express')
const profile = express.Router()
const {userAuth} = require('../middlewares/auth')
const {validateProfileEdit} = require('../utils/validator')

profile.get("/profile/view", userAuth, async (req, res) => {
    try {
      const user = req.user;
      res.send(user);
    } catch (err) {
      res.status(400).send("Error : " + err.message);
    }
  });

profile.patch('/profile/edit',userAuth,async (req,res)=>{
  try{
    if(!validateProfileEdit(req.body)){
      throw new Error('Some fields are not allowed to edit')
    }
    const userSentData = req.body
    
    const loggedInUser = req.user
    console.log(loggedInUser)
    Object.keys(userSentData).forEach((key)=>{
      loggedInUser[key] = userSentData[key]
    })
    console.log(loggedInUser)
    await loggedInUser.save()
      res.send(`${loggedInUser.firstName}, your profile updated successfully`)
  }
  catch(err){
      res.status(400).send('Error : '+err.message)
  }
})

module.exports = profile 