const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
const tripSchema = new Schema({

      dayOfTheTrip: Date,

      leaveBetween: String,

      startingPointZone: String,

      startingPointAdressNumber: String,


      availableSeats: {
            type: Number,
            min: 1,
            max: 3
      },

      pilot: {type: Schema.Types.ObjectId, ref: 'User'},

      copilots: [{
            type: Schema.Types.ObjectId, 
            ref: 'User',
            min: 0,
            max: 3
              }]

 });

const Trip = mongoose.model('Trip', tripSchema );

module.exports = Trip