const fs = require('fs')

class Contenedor {
    constructor(nombreArchivo) {
        this.nombreArchivo = nombreArchivo
        this.id = 1
    }

    save(obj) {
        let array = []
        let id = 1
        return fs.promises.readFile(`./${this.nombreArchivo}`, 'utf-8').then(contenido => {
            if (contenido) {
                array = JSON.parse(contenido)
                id = array[array.length - 1].id + 1
            }
            array.push({ ...obj, id })
            fs.promises.writeFile(`./${this.nombreArchivo}`, JSON.stringify(array))
            return id
        }).catch(error => console.log(error))
    }

    getById(id) {
        let obj
        return fs.promises.readFile(`./${this.nombreArchivo}`, 'utf-8').then(contenido => {
            obj = JSON.parse(contenido).find(elem => elem.id === id)
            return obj
        }).catch(error => console.log(error))
    }

    getAll() {
        return fs.promises.readFile(`./${this.nombreArchivo}`, 'utf-8').then(contenido => {
            return JSON.parse(contenido)
        }).catch(error => console.log(error))
    }

    deleteById(id) {
        fs.promises.readFile(`./${this.nombreArchivo}`, 'utf-8').then(contenido => {
            fs.promises.writeFile(`./${this.nombreArchivo}`, JSON.stringify(JSON.parse(contenido).filter(elem => elem.id !== id)))
        }).catch(error => console.log(error))
    }

    deleteAll() {
        fs.promises.writeFile(`./${this.nombreArchivo}`, '').then(() => {
            console.log('Todos los elementos han sido borrados')
        }).catch(error => console.log(error))
    }
}

let contenedor = new Contenedor('productos.txt')

contenedor.save({
    title: 'Ecuadra',
    price: 123.45,
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png'
}).then(() => {
    contenedor.save({
        title: 'Calculadora',
        price: 234.56,
        thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png'
    }).then(() => {
        contenedor.save({
            title: 'Globo Terráqueo',
            price: 345.67,
            thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png'
        })
    })
})

const express = require('express')

const app = express()

app.get('/productos', (req, res) => {
    contenedor.getAll().then(resp => res.send(resp))
})

app.get('/productoRandom', (req, res) => {
    contenedor.getAll().then(resp => res.send(resp[Math.floor(Math.random() * resp.length)])) 
})




const PORT = 8080

const server = app.listen(PORT, () => {
    console.log(`Escuchando al puerto ${PORT}`)
})

server.on('error', error => console.log(`Error: ${error}`))




// contenedor.deleteAll()

// contenedor.save({
//     title: 'Ecuadra',
//     price: 123.45,
//     thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png'
// }).then(res => console.log(res)).then(() => {
//     contenedor.save({
//         title: 'Calculadora',
//         price: 234.56,
//         thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png'
//     }).then(res => console.log(res)).then(() => {
//         contenedor.save({
//             title: 'Globo Terráqueo',
//             price: 345.67,
//             thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png'
//         }).then(res => console.log(res)).then(() => {
//             contenedor.getById(1).then(res => console.log(res)).then(() => {
//                 contenedor.getAll().then(res => console.log(res)).then(() => {
//                     contenedor.deleteById(2)
//                 })
//             })
//         })
//     })
// })

// setTimeout(() => {
//     contenedor.save({
//         title: 'Calculadora',
//         price: 234.56,
//         thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png'
//     }).then(res => console.log(res))
// }, 50)

// setTimeout(() => {
//     contenedor.save({
//         title: 'Globo Terráqueo',
//         price: 345.67,
//         thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png'
//     }).then(res => console.log(res))
// }, 100)

// setTimeout(() => {
//     contenedor.getById(3).then(res => console.log(res))
// }, 150)



// .then(() =>
//     contenedor.save({
//         title: 'Calculadora',
//         price: 234.56,
//         thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png'
//     }
//     )).then(() => {
//         contenedor.save({
//             title: 'Globo Terráqueo',
//             price: 345.67,
//             thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png'
//         }
//         )
//     }).then(() => {
//         contenedor.getById(1)
//     })


// contenedor.save({
//     title: 'Calculadora',
//     price: 234.56,
//     thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png'
// }
// )


