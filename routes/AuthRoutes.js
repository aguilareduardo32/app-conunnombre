const express  = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController')

router.post('/signup', AuthController.signup);
router.post('/login', AuthController.login);
router.post('/logout', AuthController.logout);
router.get('/loggedin', AuthController.loggedin);

module.exports = router;