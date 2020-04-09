const knex = require('knex');
const configuration = require('../../knexfile');

const { Client } = require('pg');
const client = new Client();

const env = process.env.NODE_ENV == 'test' ? configuration.test : configuration.development

const connection = knex(env);

module.exports = connection;

/*
knex migrate:latest
knex migrate:make create_vendas_anuncios
*/