const express = require('express');

const Cars = require('./cars-model');

const { validateCarId, validateCar } = require('../validators/validators');

const router = express.Router();

// GET request to retrieve all cars in db
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

// GET request to retrieve car by specified ID
router.get('/:id', validateCarId, (req, res) => {
    Cars.findById(req.params.id)
    .then(car => {
        res
        .status(200)
        .json(car);
    })
    .catch(err => {
        console.log('Error retrieving car.');
        res
        .status(500)
        .json({ error: 'Error retrieving car.' });
    });
});

module.exports = router;