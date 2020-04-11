
exports.up = function(knex) {
    return knex.schema
    .createTable('anuncios', function (table) {
       table.string('Id_Anuncio').primary();
       table.string('Title', 60).notNullable();
       table.string('Price', 55).notNullable();
       table.boolean('status').notNullable();
       table.integer('Available_quantity');
       table.string('Listing_type_id',20).notNullable();
       table.string('Free_shipping',20).notNullable();
       table.string('Shipping_mode',20).notNullable();
       table.decimal('Total_custo').notNullable().defaultTo(0);
       table.string('List_cost',20)
       table.string('SellerId_Empresa',20).notNullable();  
       
       table.foreign('SellerId_Empresa').references('id').inTable('empresas');
    });
};

exports.down = function(knex) {
    return knex.schema
    .dropTable("anuncios");
};
