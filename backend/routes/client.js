const express = require('express');
const router = express.Router();

// controller functions
const { loginClient } = require('../controllers/clientController')
const { signupClient } = require('../controllers/clientController')

// Client Login
router.post('/client/login', loginClient)

// Client Signup
router.post('/client/signup', signupClient)

module.exports = router;