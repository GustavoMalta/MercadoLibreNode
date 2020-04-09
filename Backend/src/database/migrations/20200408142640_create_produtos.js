
exports.up = function(knex) {
    return knex.schema
    .createTable('produtos', function (table) {
       table.string('Id_Produto').primary();
       table.string('Title', 55).notNullable();
       table.decimal('Custo').notNullable();
       table.string('Obs',55); 
       
    });
};

exports.down = function(knex) {
    return knex.schema
    .dropTable("produtos");
};
