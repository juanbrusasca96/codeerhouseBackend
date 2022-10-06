const { Router } = require('express')
const { Contenedor } = require('../contenedor')

const router = Router()
let productosContenedor = new Contenedor('productos.txt')
// let productos = productosContenedor.getAll()

// console.log(productos);

let admin = true;

router.get('/', async (req, res) => {
    if (admin) {
        let productos = await productosContenedor.getAll()
        res.json({ productos })
    }
})

router.get('/:id', async (req, res) => {
    if (admin) {
        let productos = await productosContenedor.getAll()
        const { id } = req.params
        let producto = productos.find(prod => prod.id === parseInt(id))
        res.json(producto ? producto : { error: 'producto no encontrado' })
    }
})

router.post('/', async (req, res) => {
    if (admin) {
        let productos = await productosContenedor.getAll()
        let producto = req.body
        producto = { ...producto, id: productos.length > 0 ? productos[productos.length - 1].id + 1 : 1 }
        // productos.push(producto)
        await productosContenedor.save(producto)
        res.json(producto)
    }
})

router.put('/:id', async (req, res) => {
    if (admin) {
        let productos = await productosContenedor.getAll()
        const { id } = req.params
        const nuevoProducto = req.body
        let producto = productos.find(prod => prod.id === parseInt(id))
        if (producto) {
            let index = productos.indexOf(producto)
            producto = { ...producto, ...nuevoProducto }
            productos[index] = producto
            await productosContenedor.saveArray(productos)
            res.send('Producto actualizado correctamente')
        }
        else {
            res.json({ error: 'producto no encontrado' })
        }
    }

})

router.delete('/:id', async (req, res) => {
    if (admin) {
        let productos = await productosContenedor.getAll()
        const { id } = req.params
        if (id > 0 && id <= productos.length) {
            // productos = productos.filter(prod => prod.id !== parseInt(id))
            await productosContenedor.deleteById(id)
            res.send('Producto eliminado correctamente')
        } else {
            res.json({ error: 'producto no encontrado' })
        }
    }
})

module.exports = router