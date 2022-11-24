const {db} = require('../dbConfig.js')

; (async function () {
    try {
        const isTable = await db.schema.hasTable('productos')
        if (!isTable) {
            await db.schema.createTable('productos', (table) => {
                table.increments('id').primary().notNullable()
                table.string('title').notNullable()
                table.integer('price').notNullable()
            })
        }
        console.log('tabla creada con exito');
    } catch (error) {
        console.log(error);
    }
})()