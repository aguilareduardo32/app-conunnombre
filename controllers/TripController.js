const mongoose = require("mongoose");
const passport   = require('passport');
const Trip = require('../models/Trip-model');


  exports.createtrip = (req,res) => {
      
    function checkRoles(role) {
      return function(req, res, next) {
        if (req.isAuthenticated() && req.user.role === role) {
          return next();
        } else {
          res.send("errorcheckroles")
        }
      }
    }
    const checkPilot  = checkRoles('PILOT');
    const checkCopilot = checkRoles('COPILOT');

    Trip.create(checkPilot,{
        pilot: req.user._id
    })
    .then(response => {
    res.json(response);
    })
    .catch(err => {
    res.json(err);
    })

  } 