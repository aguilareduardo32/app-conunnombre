const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const TripController = require('../controllers/TripController');

router.post('/create', TripController.createtrip);

module.exports = router;