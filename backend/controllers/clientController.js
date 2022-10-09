const Client = require('../models/clientModel');
const jwt = require('jsonwebtoken');

// Create a web token
const createToken = (_id) => {
    // We want _id as a payload
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' })
}

// Login a client
const loginClient = async (req, res) => {
    const { email, password } = req.body;
    try {
        const client = await Client.login(email, password);
        const token = createToken(client._id);
        return res.status(200).json({ email, token, _id: client._id, carNo: client.carNo, name: client.name })
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

// Signup a client
const signupClient = async (req, res) => {
    const { email, password, name, address, phone, carNo } = req.body;
    try {
        const client = await Client.signup(name, address, phone, email, password, carNo);
        const token = createToken(client._id);
        return res.status(200).json({ email, token, _id: client._id, name, carNo });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

module.exports = {
    loginClient,
    signupClient
}