const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userModel = new mongoose.Schema(
  {
    firstName:{
        type: String,
        required: [true,"first name required"]
    },
    lastName:{
        type: String,
        required: [true,"last  name required"]
    },
    password:{
        type: String,
        required: [true,"password required"]
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: {
          validator: function (value) {
            // Use a regular expression to validate the email format
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
          },
          message: 'Invalid email format',
        },
      },
      gender:{
        type: String,
        required: [true,"gender required"]
      },
      avatar: {
        type: String,
        
      },
      coverImage: {
        type: String,
       
      }
  },
  { timestamps: true }
);
userModel.pre('save', async function(next){
    if(!this.isModified('password')){
        return next();
    }
    this.password = await bcrypt.hash(this.password,10);
})
userModel.methods.matchPassword = function(password){
  return bcrypt.compare(password,this.password);
}

const User = mongoose.model("User", userModel);
module.exports = User;
