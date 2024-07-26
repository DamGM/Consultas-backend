const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');



const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true, 
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  
}, {
  timestamps: true,
});




const User = mongoose.model('User', UserSchema);
module.exports = User;