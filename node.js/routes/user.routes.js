const express = require('express');
const router = express.Router();
const userHandler = require('../handler/user.handler');

// Route for user registration
router.post('/register', userHandler.registerUser);

// Route for user login
router.post('/login', userHandler.loginUser);

module.exports = router;
