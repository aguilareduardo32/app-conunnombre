const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const copilotSchema = new Schema({
     username: String,
   password: String,
   from: '' ,
   destiny: '',
   trips: {type: Schema.Types.ObjectId, ref: 'Trip'}
 }, 
 {
   timestamps: true
 });

 const Copilot = mongoose.model('Copilot', copilotSchema);
 module.exports = Copilot;