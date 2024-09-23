require('dotenv').config();

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {


  development: {
    client: 'postgresql',
    connection: {
      database:process.env.DATABASE,
      user:process.env.USERNSME,
      password:process.env.PASSWORD, 
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


// console.log({
//   database: process.env.DATABASE,
//   user: process.env.USERNSME,
//   password: process.env.PASSWORD,
// });


