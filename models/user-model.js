
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  user: String,

   password: {
    type: String,
    required: true,
     minlength: 8,
},
   phone: {
    type: String,
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
},
   birthday: {
    type: Date,
    required: true
},
   gender: {
    type:  String,
    enum: ['male', 'female', 'other'],
    required: true,
    default: 'other'
},
  password: {
    type: String,
    required: true,
    minlength: 8,
},

 //  trips: {type: Schema.Types.ObjectId, 
   // ref: 'Trip',
 //  required: false}
        });

module.exports = mongoose.model('User', userSchema)