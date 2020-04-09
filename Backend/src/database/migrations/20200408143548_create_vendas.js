
exports.up = function(knex) {
    return knex.schema
    .createTable('vendas', function (table) {
       table.string('Id_Venda').primary();
       table.string('Id_Seller');
       table.string('Status');
       table.timestamp('Date_created').notNullable();
       table.decimal('Total_amount').notNullable();
       table.decimal('Total_paid_amount').notNullable();
       table.decimal('Shipping_cost').notNullable();
       table.decimal('Marketplace_fee').notNullable();
       table.string('Payment_method_id');
       table.string('Refunded');  
       table.decimal('List_cost').notNullable().defaultTo(0);  
       table.decimal('Total_custo').notNullable().defaultTo(0);
       
    });
};

exports.down = function(knex) {
    return knex.schema
    .dropTable("vendas");
}