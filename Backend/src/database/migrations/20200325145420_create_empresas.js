
exports.up = function(knex) {
    return knex.schema
    .createTable('empresas', function (table) {
       table.string('id',20).primary();
       table.string('name', 30).notNullable();
       table.string('Tg_Code', 37).notNullable();
       table.string('Access_Token', 74).notNullable();
       table.string('Refresh_Token', 74);
       table.timestamp('Date_Expire', 55).notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema
    .dropTable("empresas");
};
