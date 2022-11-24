require('./db/models/productsModel.js')
require('./db/models/messageModels.js')

class Contenedor {
    constructor(db, nombreTabla) {
        this.db = db
        this.nombreTabla = nombreTabla
    }

    async save(obj) {
        try {
            return await this.db.from(this.nombreTabla).insert(obj)
        } catch (error) {
            console.log(error);
        }
    }

    // getById(id) {
    //     let obj
    //     return fs.promises.readFile(`./${this.nombreArchivo}`, 'utf-8').then(contenido => {
    //         obj = JSON.parse(contenido).find(elem => elem.id === id)
    //         return obj
    //     }).catch(error => console.log(error))
    // }

    async getAll() {
        try {
            return await this.db.from(this.nombreTabla).select('*')
        } catch (error) {
            console.log(error);
        }
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

module.exports = { Contenedor }