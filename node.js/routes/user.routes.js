const express = require('express');
const router = express.Router();
const userHandler = require('../handler/user.handler');

// Route for registration (sign-up)
router.post('/signup', userHandler.signup);

// Route for login
router.post('/login', userHandler.login);

module.exports = router;
