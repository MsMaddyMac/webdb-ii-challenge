const express = require('express');

const Cars = require('./cars-model');
const Sales = require('../sales/sales-model');

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

// PUT request to update car in db
router.put('/:id', validateCarId, (req, res) => {
    const updates = req.body;
    const id = req.params.id;

    Cars.find(id)
    .then(update => {
        if(Object.keys(updates).length === 0) {
            res
            .status(400)
            .json({ message: 'Changed your mind? There is nothing to update.' })
        } else {
            Cars.update(id, updates)
            .then(updatedCar => {
                res
                .status(200)
                .json({ message: 'Successfully update!', updatedCar });
            })
        }
    })
    .catch(err => {
        console.log('Error updating car info.', err);
        res
        .status(500)
        .json({ error: 'The car could not be updated.' });
    });
});

// ***** SUB ROUTES *****
// GET endpoint to retrieve sale for a car
router.get('/:id/sales', (req, res) => {
    Cars.findCarSales(req.params.id)
    .then(sales => {
        res.status(200).json(sales);
    })
    .catch(err => {
        console.log('Error getting sale for car.', err);
        res.status(500).json({ error: 'Error getting sale for car.' });
    });
});

// POST endpoint to add a sale for a car by ID
router.post('/:id/sales', (req, res) => {
    const saleData = { ...req.body, car_id: req.params.id };

    Sales.add(saleData)
    .then(sale => {
        res.status(201).json(sale);
    })
    .catch(err => {
        console.log('Error adding new sale.', err);
        res.status(500).json({ error: 'Error adding new sale.' })
    });
});

module.exports = router;