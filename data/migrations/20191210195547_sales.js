
exports.up = function(knex) {
  return knex.schema.createTable('sales', function(sales) {
    sales.increments();

    sales
        .string('sale_price')
        .notNullable()
        .index();
        
    sales
        .integer('car_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('cars')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');

    sales.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('sales');
};
