const express  = require('express');
const router = express.Router();
const passport   = require('passport');
const bcrypt     = require('bcryptjs');
const User = require("../models/User-model");


const AuthController = require('../controllers/AuthController')



router.post('/signup', AuthController.create);


module.exports = router;