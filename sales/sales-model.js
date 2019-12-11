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

    let rows = db('sales')
        .orderBy(sortby, sortdir)
        .limit(limit)
        .offset(offset);

    return rows;
}

function findById(id) {
    return db('sales')
        .where({ id })
        .first();
}

async function add(sale) {
    const [id] = await db('sales').insert(sale);

    return findById(id);
}

function remove(id) {
    return db('sales')
        .where({ id })
        .del();
}

function update(id, changes) {
    return db('sales')
        .where({ id })
        .update(changes, '*');
}