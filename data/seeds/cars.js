
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cars')
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cars').insert([
        { VIN: '2C1MR2295T6789740', make: 'Geo', model: 'Metro', mileage: '120,008' },
        { VIN: '1HGCG2254WA015540', make: 'Honda', model: 'Accord', mileage: '139,456' },
        { VIN: '5FNRL38739B001353', make: 'Honda', model: 'Odyssey', mileage: '118,026' },
        { VIN: 'JH4DB1671NS000248', make: 'Acura', model: 'Integra', mileage: '189,555', trans_type: 'automatic', title_status: 'clean' }
      ]);
    });
};
