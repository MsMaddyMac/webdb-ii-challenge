
exports.up = function(knex) {
  return knex.schema.createTable('cars', tbl => {
    tbl.increments(); // creates an 'id' column that auto increments

    tbl.string('VIN', 17) // creates a 'VIN' column that is required and unique
        .notNullable()
        .unique()
        .index();

    tbl.string('make') // creates a 'make' column that is required
        .notNullable()
        .index();

    tbl.string('model') // creates a 'model' column that is required
        .notNullable()
        .index();

    tbl.string('mileage') // creates a 'mileage' column that is required
        .notNullable()
        .index();

    tbl.string('trans_type') // creates a 'trans type' column that is not required
        .nullable()
        .index();

    tbl.string('title_status') // creates a 'title status' column that is not required
        .nullable()    
        .index();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('cars')
};
