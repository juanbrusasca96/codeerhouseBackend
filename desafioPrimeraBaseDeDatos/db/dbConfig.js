const {knex} = require('knex')

const config = {
  client: 'mysql2',
  connection: {
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'productos',
  },
}

const db = knex(config)

module.exports = { db }