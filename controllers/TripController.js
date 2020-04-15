const mongoose = require("mongoose");
const Trip = require('../models/Trip-model');



  exports.createTrip = (req, res) => {
      
      Trip.create({

        pilot: req.user._id,
        dayOfTheTrip: req.body.dayOfTheTrip,
        leaveBetween: req.body.leaveBetween,
        from: req.body.from,
        availableSeats: req.body.availableSeats
    
      })
    .then(response => {
    res.json(response);
    })
    .catch(err => {
    res.json(err);
    })

  } 

  exports.checkTrips = (req, res) => {

    Trip.find().populate('pilot').populate('copilots')
    .then(allTheProjects => {
      res.json(allTheProjects);
    })
    .catch(err => {
      res.json(err);
    })

  }

  exports.getSpecificTrip = (req, res) => {

    if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }
  
    Trip.findById(req.params.id).populate("pilot").populate('copilots')
      .then(response => {
        console.log(response)
        res.status(200).json(response);
      })
      .catch(err => {
        res.json(err);
      })

  }

 
  exports.addCuCopilot = (req, res) => {

    copilotId = req.user._id
  
    Trip.findByIdAndUpdate(req.params.id, {$push:{ copilots: copilotId, $slice: 2 } })
      
      .then(() => {
        
        res.json({ message: `Copilot   was added.` });
      })
      .catch(err => {
    });

  }

  exports.deleteTrip = (req, res) => {

    if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.status(400).json({message: `Specific id is not valid`});
      return;
    }
    
    Trip.findByIdAndRemove(req.params.id)
      .then(() => {
        res.json({message: `Task with ${req.params.id} is removed successfully`})
      })
      .catch(err => {
        res.json(err);
      })

  }

  exports.deleteCopilot = (req, res) => {
    copilotId  = req.body.username;
    Trip.findByIdAndUpdate(req.params.id, {$pull:{copilots: copilotId } })
     
      .then(() => {
        res.json({ message: `Copilot  ${req.params.id} was remove.` });
      })
      .catch(err => {
        res.json(err);
      });
  }