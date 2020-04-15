
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  
  username: {
    type: String,
    required: true
  } ,

   password: {
    type: String,
    required: true,
     minlength: 8,
},
   phone: {
    type: Number,
    required: true
},
   email: {
   type: String,
    required: true,
     unique: true,
},
   rol: {
     type: String,
     required: true,
     enum : ['PILOT','COPILOT']
}

});

module.exports = mongoose.model('User', userSchema)