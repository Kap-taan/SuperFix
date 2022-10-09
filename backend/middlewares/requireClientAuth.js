const jwt = require('jsonwebtoken');
const Client = require('../models/clientModel')

const requireClientAuth = async (req, res, next) => {

    // Getting the Token from req headers
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({ error: "Authorization token is required" });
    }

    const token = authorization.split(' ')[1];

    try {
        const { _id } = jwt.verify(token, process.env.SECRET);
        req.user = await Client.findOne({ _id }).select('_id');
        next();
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: "Request is not authorized" })
    }

}

module.exports = requireClientAuth;