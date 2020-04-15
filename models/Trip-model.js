const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
const tripSchema = new Schema({

      dayOfTheTrip: Date,

      leaveBetween: Number,

      from: String,

      availableSeats: Number,

      pilot: {type: Schema.Types.ObjectId, ref: 'User'},

      copilots: [{
            type: Schema.Types.ObjectId, 
            ref: 'User'
              }]

 });

const Trip = mongoose.model('Trip', tripSchema );

module.exports = Trip