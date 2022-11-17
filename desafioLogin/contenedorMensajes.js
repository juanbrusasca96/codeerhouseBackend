const { schema, normalize } = require('normalizr')
const util = require('util')

require('./db/models/productsModel.js')
require('./db/models/messageModels.js')

class ContenedorMensajes {
    constructor(collection) {
        this.collection = collection
    }

    async save(obj) {
        console.log(obj);
        return await this.collection(obj).save()
    }

    // getById(id) {
    //     let obj
    //     return fs.promises.readFile(`./${this.nombreArchivo}`, 'utf-8').then(contenido => {
    //         obj = JSON.parse(contenido).find(elem => elem.id === id)
    //         return obj
    //     }).catch(error => console.log(error))
    // }

    async getAll() {
        // return await this.collection.find({})
        const mensajesResponse = await this.collection.find({}, 'author text')
        const mensajesObject = {
            id: 'mensajes',
            mensajes: mensajesResponse.map((msg, i) => ({ id: i, author: msg.author, text: msg.text }))
        }
        console.log(mensajesObject);
        const authorEntity = new schema.Entity('author', {}, { idAttribute: 'email' })
        const mensajesEntity = new schema.Entity('mensajes', {
            author: authorEntity
        })

        const dataEntity = new schema.Entity('data', {
            mensajes: [mensajesEntity]
        })

        const mensajesNormalized = normalize(mensajesObject, dataEntity)
        console.log(util.inspect(mensajesNormalized, false, 12, true));
        console.log('data original', JSON.stringify(mensajesObject).length)
        console.log('data normalizada', JSON.stringify(mensajesNormalized).length)
        return {mensajesNormalized, mensajesObject};
    }

    // deleteById(id) {
    //     fs.promises.readFile(`./${this.nombreArchivo}`, 'utf-8').then(contenido => {
    //         fs.promises.writeFile(`./${this.nombreArchivo}`, JSON.stringify(JSON.parse(contenido).filter(elem => elem.id !== id)))
    //     }).catch(error => console.log(error))
    // }

    // deleteAll() {
    //     fs.promises.writeFile(`./${this.nombreArchivo}`, '').then(() => {
    //         console.log('Todos los elementos han sido borrados')
    //     }).catch(error => console.log(error))
    // }
}

module.exports = { ContenedorMensajes }