const {knex} = require('knex')

const config = {
    client: 'sqlite3',
    connection: {
        filename: './db/mensajes'
    }
}

const dbSQLite = knex(config)

module.exports = { dbSQLite }