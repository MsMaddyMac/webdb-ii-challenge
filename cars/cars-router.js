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

// POST request to add new car to db
router.post('/', validateCar, (req, res) => {
    const newCar = req.body;

    Cars.add(newCar)
    .then(car => {
        res
        .status(201)
        .json(car);
    })
    .catch(err => {
        console.log('Error adding new car.', err);
        res
        .status(500)
        .json({ error: 'Error adding new car.' });
    })
});

// DELETE request to remove car from db by specified ID
router.delete('/:id', (req, res) => {
    const id = req.params.id;

    Cars.remove(id)
    .then(count => {
        if (count > 0) {
            res
            .status(200)
            .json({ message: 'The car has been totaled.' });
        } else {
            res
            .status(404)
            .json({ message: 'The car could not be found.' });
        }
    })
    .catch(err => {
        console.log('Could not delete car.', err);
        res
        .status(500)
        .json({ error: 'Error removing car.' });
    });
});

module.exports = router;