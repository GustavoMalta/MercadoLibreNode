
exports.up = function(knex) {
    return knex.schema
    .createTable('venda_anuncios', function (table) {
       table.string('Id_Venda_anuncio').primary();  //gerar chave primaria com id do anuncio + id da venda
       table.string('Id_ML').notNullable();
       table.string('Title').notNullable();;
       table.string('Color');
       table.decimal('Unit_price').notNullable();
       table.integer('Quantity').notNullable();
       table.decimal('Full_unit_price').notNullable();
       table.decimal('Listing_type_id');
       table.decimal('Sale_fee').notNullable();
       table.string('CustoProduto').defaultTo(0);

       table.string('Id_Venda').notNullable();  
       table.string('Id_Anuncio').notNullable();  
       
       table.foreign('Id_Venda').references('Id_Venda').inTable('vendas');
       table.foreign('Id_Anuncio').references('Id_Anuncio').inTable('anuncios');
       
    });
};

exports.down = function(knex) {
    return knex.schema
    .dropTable("venda_anuncios");
}