const db = require('../data/dbConfig');

module.exports = {
    find,
    findById,
    add,
    remove,
    update,
    findCarSales
};

function find(query) {
    let { page = 1, limit = 5, sortby = 'id', sortdir = 'asc' } = query;
    const offset = limit * (page - 1);

    let rows = db('cars')
    .orderBy(sortby, sortdir)
    .limit(limit)
    .offset(offset);

    return rows;
}

function findById(id) {
    return db('cars')
        .where({ id })
        .first();
}

async function add(car) {
    const [id] = await db('cars').insert(car);

    return findById(id);
}

function remove(id) {
    return db('cars')
        .where({ id })
        .del();
}

function update(id, changes) {
    return db('cars')
        .where({ id })
        .update(changes, '*');
}

function findCarSales(carId) {
    return db('sales as s')
        .join('cars as c', 's.car_id', 'c.id')
        .select('s.id', 's.sale_price', 'c.id as carId', 'c.make as carMake', 'c.model as carModel', 'c.VIN as carVIN')
        .where({ car_id: carId });
}