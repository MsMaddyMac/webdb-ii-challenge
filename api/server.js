const express = require('express');
const helmet = require('helmet');

const carsRouter = require('../cars/cars-router');

const server = express();

server.get('/', (req, res) => {
    res.send("<h2>Here we go...<h2>");
});

// custom middleware
function logger(req, res, next) {
    console.log(`[${new Date().toISOString()}] ${req.method} to ${req.originalUrl}`)

    next();
};

server.use(helmet());
server.use(express.json());
server.use(logger);

server.use('/api/cars', carsRouter);

module.exports = server;