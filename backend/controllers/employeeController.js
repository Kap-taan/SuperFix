const Employee = require('../models/employeeModel');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
}

const loginEmployee = async (req, res) => {
    const { employeeId, password } = req.body;
    try {
        const employee = await Employee.login(employeeId, password);
        const token = createToken(employee._id);
        res.status(200).json({ employeeId, token, type: employee.type, firebaseId: employee.firebaseId })
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const signupEmployee = async (req, res) => {
    const { email, employeeId, password, firebaseId, type } = req.body;
    console.log(email, employeeId, password);
    try {
        const employee = await Employee.signup(employeeId, password, email, firebaseId, type);
        res.status(200).json({ employeeId, email, employee });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    loginEmployee,
    signupEmployee
}