const mongoose = require("mongoose");
require("dotenv").config();
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minLength: 2,
      maxLength: 50,
    },
    lastName: {
      type: String,
      trim: true,
      minLength: 2,
      maxLength: 50,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Enter a valid email");
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Password was too weak, Enter a strong psaaword");
        }
      },
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      trim: true,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Enter a valid gender");
        }
      },
      lowercase: true,
    },
    about: {
      type: String,
      default: 'Hi there i"m the new user ',
      trim: true,
      maxLength: 200,
    },
    skills: {
      type: [],
      validate(data){
        if(data.length > 5) {
            throw new Error('Only 5 skills are accepted')
        }
      }
    },
    photoUrl: {
      type: String,
      trim: true,
      default: function () {
        if (this.gender === "male") {
          return "https://manmohinihealthcare.com/wp-content/uploads/2019/07/dummy-user.jpg";
        }
        if (this.gender === "female") {
          return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtDG1Reo7Oy4N6MAsP4UeFwMVHcaR-XLb3Eg&s";
        }
        return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0rz7SHvHoyn3LwaQ6Zc8LkQEmi-ClP8mvZg&s"; // Fallback for 'others' or undefined gender
      },
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Enter a valid URL");
        }
      },
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.passwordCheck = async function (password) {
  const user = this;
  const passwordHash = user.password;
  return await bcrypt.compare(password, passwordHash);
};

userSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id }, process.env.JWT_SCERET, {
    expiresIn: "7d",
  });
  return token;
};

const User = mongoose.model("user", userSchema);

module.exports = { User };
