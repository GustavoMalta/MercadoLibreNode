
exports.up = function(knex) {
    return knex.schema
    .createTable('config', function (table) {
       table.string('id').primary();
       table.string('Title', 55);
       table.string('client_id', 55).notNullable();
       table.string('client_secret').notNullable();

    });
};

exports.down = function(knex) {
    return knex.schema
    .dropTable("config");
};
