const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    employeeId: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    firebaseId: {
        type: String,
        required: true
    }
})

// static method for signup
employeeSchema.statics.signup = async function (employeeId, password, email, firebaseId, type) {
    if (!employeeId || !password || !email || !firebaseId || !type) {
        throw Error('All fields must be filled');
    }
    const exists = await this.findOne({ email });
    if (exists) {
        throw Error('This employee already exists');
    }
    // Encrypting the password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const newEmployee = {
        email, employeeId, password: hash, type, firebaseId
    };

    const employee = await this.create(newEmployee);

    return employee;

}

// static method for login
employeeSchema.statics.login = async function (employeeId, password) {
    if (!employeeId || !password) {
        throw Error('All Field must be filled');
    }
    const employee = await this.findOne({ employeeId });
    if (!employee) {
        throw Error('Invalid Email');
    }
    const match = await bcrypt.compare(password, employee.password);
    if (!match) {
        throw Error('Invalid Password');
    }

    return employee;
}

module.exports = mongoose.model('Employee', employeeSchema);