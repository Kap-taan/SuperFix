require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

// Getting the routes
const clientRoutes = require('./routes/client');
const employeeRoutes = require('./routes/employee');

// express app
const app = express();

// middlewares
app.use(express.json());


// To get the req path and method
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})

// Routes
app.use('/api/auth', clientRoutes);
app.use('/api/auth', employeeRoutes);

// Connecting to the Database
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // Listening to the requests
        app.listen(process.env.PORT, () => {
            console.log(`Listening at Port ${process.env.PORT}`)
        })
    })
    .catch((err) => {
        console.log(err);
    })