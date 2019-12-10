const express = require('express');

const Cars = require('./cars-model');

const { validateCarId, validateCar } = require('../validators/validators');

const router = express.Router();

module.exports = router;