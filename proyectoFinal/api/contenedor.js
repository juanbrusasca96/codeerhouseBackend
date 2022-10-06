const fs = require('fs')

class Contenedor {
    constructor(nombreArchivo) {
        this.nombreArchivo = nombreArchivo
        this.id = 1
    }

    async save(obj) {
        let array = []
        let id = 1
        return fs.promises.readFile(`./${this.nombreArchivo}`, 'utf-8').then(contenido => {
            if (JSON.parse(contenido).length>0) {
                array = JSON.parse(contenido)
                id = array[array.length - 1].id + 1
            }
            array.push({ ...obj, id })
            fs.promises.writeFile(`./${this.nombreArchivo}`, JSON.stringify(array))
            return id
        }).catch(error => console.log(error))
    }

    async saveArray(array) {
        return fs.promises.readFile(`./${this.nombreArchivo}`, 'utf-8').then(() => {
            fs.promises.writeFile(`./${this.nombreArchivo}`, JSON.stringify(array))
        }).catch(error => console.log(error))
    }

    async getById(id) {
        let obj
        return fs.promises.readFile(`./${this.nombreArchivo}`, 'utf-8').then(contenido => {
            obj = JSON.parse(contenido).find(elem => elem.id === id)
            return obj
        }).catch(error => console.log(error))
    }

    async getAll() {
        return fs.promises.readFile(`./${this.nombreArchivo}`, 'utf-8').then(contenido => {
            return contenido ? JSON.parse(contenido) : ''
        }).catch(error => console.log(error))
    }

    async deleteById(id) {
        fs.promises.readFile(`./${this.nombreArchivo}`, 'utf-8').then(contenido => {
            fs.promises.writeFile(`./${this.nombreArchivo}`, JSON.stringify(JSON.parse(contenido).filter(elem => elem.id != id)))
        }).catch(error => console.log(error))
    }

    async deleteAll() {
        fs.promises.readFile(`./${this.nombreArchivo}`, 'utf-8').then(() => {
            fs.promises.writeFile(`./${this.nombreArchivo}`, '[]')
        }).catch(error => console.log(error))
    }
}

module.exports = { Contenedor }