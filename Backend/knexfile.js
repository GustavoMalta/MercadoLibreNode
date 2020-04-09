// Update with your config settings.

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      database: 'ML_Node',
      user:     'postgres',
      password: 'aqyb829'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory:'./src/database/migrations',
      tableName: 'knex_migrations'
    },
  },

  test: {
    client: 'sqlite3',
    connection: {
      filename: './src/database/dbtest.sqlite'
    },
    migrations: {
      directory:'./src/database/migrations',
      tableName: 'knex_migrations'
    },
    useNullAsDefault: true,
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
