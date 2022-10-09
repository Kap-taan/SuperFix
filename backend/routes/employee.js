const express = require('express');
const router = express.Router();

// Controller Functions
const { loginEmployee, signupEmployee } = require('../controllers/employeeController');



router.post('/employee/login', loginEmployee)

router.post('/employee/signup', signupEmployee)

module.exports = router;
