
exports.up = function(knex) {
    return knex.schema
    .createTable('produtos_anuncios', function (table) {
       //table.increments('Id_Prod_Anun');
       table.string('Id_Prod_Anun').primary();
       table.integer('Quantidade').notNullable().defaultTo(1);
       table.string('Id_Produto').notNullable();
       table.string('Id_Anuncio').notNullable();

       table.foreign('Id_Produto').references('Id_Produto').inTable('produtos');
       table.foreign('Id_Anuncio').references('Id_Anuncio').inTable('anuncios');
       
    });
};

exports.down = function(knex) {
    return knex.schema
    .dropTable("produtos_anuncios");
};