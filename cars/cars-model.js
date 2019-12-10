const db = require('../data/dbConfig');

module.exports = {
    find,
    findById,
    add,
    remove,
    update
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