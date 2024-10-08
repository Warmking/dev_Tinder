#                 **Welcome to the world of Node Js **

#  npm i validator
API validation - validate every field with proper vaidators .Eg - Validate the email and allow onlly valid email ,put lenth restriction and for arrays i.e for sills limit it to 5.
--Other wise the attackers will send the humongus data and crash your database
# NEVER TRUST  req.body i.e never trust the data send by user. Do the proper validation to that while allowing it to your DB.

# Cleaning the API Logic
1. validate the user data
2. Encrypt the passwords (bcrypt - package)
# npm i bcrypt

- ValidateSignUpData  -- check the fname and lname is empty and validate the emailId 
- Do password encyption on post method - bcrpt.hash
- LogIn API -- Get user based email and compare the req mail and password with the db data 
- bcrypty.compare will return true or false

# Authentication, JWT & Cookies - EP-10
- npm i cookie-parser
- npm i jsonwebtoken

# Create the routes for API 
- use different routes for different category of API e.g for users use userRouter like that it will make our code more cleaner.  
