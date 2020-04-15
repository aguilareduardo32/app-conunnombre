const express = require('express');
const router = express.Router();
const TripController = require('../controllers/TripController');

//Function to check wich Rol is the current user 

function checkRoles(role) {
  return function(req, res, next) {
    console.log(req.user, role)
    if (req.isAuthenticated() && req.user.rol === role) {
      return next();
    } else {
      res.send("errorcheckroles")
    }
  }
}


const checkPilot  = checkRoles('PILOT');
const checkCopilot = checkRoles('COPILOT');

router.get('/trips', TripController.checkTrips);
router.get('/:id', TripController.getSpecificTrip);
router.post('/create',  TripController.createTrip);
router.delete('/:id', checkPilot, TripController.deleteTrip);
router.put('/:id',  TripController.addCuCopilot);
router.post('/:id', TripController.deleteCopilot)

module.exports = router;    