const {dbSQLite} = require('../dbConfigSQlite.js')

; (async function () {
    try {
        const isTable = await dbSQLite.schema.hasTable('mensajes')
        console.log('SI');
        if (!isTable) {
            await dbSQLite.schema.createTable('mensajes', (table) => {
                table.increments('id').primary().notNullable()
                table.string('nombre').notNullable()
                table.string('info').notNullable()
            })
        }
        console.log('tabla creada con exito');
    } catch (error) {
        console.log(error);
    }
})()