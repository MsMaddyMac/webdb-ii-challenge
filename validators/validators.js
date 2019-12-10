const Cars = require('../cars/cars-model');

module.exports = { validateCarId, validateCar }

// custom validator middleware

// to be used on every GET request that expects car id as a parameter.
function validateCarId(req, res, next) {
    const id = req.params.id;

    Cars.findById(id)
        .then(car => {
            if (car) {
                next();
            } else {
                res.status(400)
                .json({ message: 'Invalid car ID.' })
            }
        })
};

// validates the body on the POST request to create a new car
function validateCar(req, res, next) {
    const carData = req.body;
    const { VIN, make, model, mileage } = carData;

    if(Object.keys(carData).length === 0) {
        res.status(400)
            .json({ message: 'Car data is required.' });
    }
    if (!VIN) {
        res.status(400)
            .json({ message: 'Missing required VIN of car.' })
    }
    if (!make) {
        res.status(400)
            .json({ message: 'Missing required make of car.' })
    }
    if (!model) {
        res.status(400)
            .json({ message: 'Missing required model of car.' })
    }
    if (!mileage) {
        res.status(400)
            .json({ message: 'Missing required mileage of car.' })
    } else {
        next();
    }
};


