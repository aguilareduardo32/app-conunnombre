const express  = require('express');
const router = express.Router();

const AuthController = require('../controllers/AuthController')



router.post('/signup', AuthController.create)


module.exports = router;