const express = require('express');

const Cars = require('./cars-model');

const { validateCarId, validateCar } = require('../validators/validators');

const router = express.Router();

router.get('/', (req, res) => {
    Cars.find(req.query)
    .then(cars => {
        res
        .status(200)
        .json(cars);
    })
    .catch(err => {
        console.log('Issue retrieving cars.', err);
        res
        .status(500)
        .json({ message: 'Error retrieving cars.' })
    });
});

module.exports = router;