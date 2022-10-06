const { Router } = require('express')
const { Contenedor } = require('../contenedor')

const router = Router()
let carritoContenedor = new Contenedor('carrito.txt')
// let productosCarrito = carritoContenedor.getAll()

// console.log(productosCarrito);

let admin = true

router.get('/', async (req, res) => {
    if (admin) {
        let productosCarrito = await carritoContenedor.getAll()
        res.json({ productosCarrito })
    }
})

router.get('/:id', async (req, res) => {
    if (admin) {
        let productosCarrito = await carritoContenedor.getAll()
        const { id } = req.params
        let productoCarrito = productosCarrito.find(prod => prod.id === parseInt(id))
        res.json(productoCarrito ? productoCarrito : { error: 'productoCarrito no encontrado' })
    }
})

router.post('/', async (req, res) => {
    if (admin) {
        let productosCarrito = await carritoContenedor.getAll()
        let productoCarrito = req.body
        productoCarrito = { ...productoCarrito, id: productosCarrito.length > 0 ? productosCarrito[productosCarrito.length - 1].id + 1 : 1 }
        // productosCarrito.push(productoCarrito)
        await carritoContenedor.save(productoCarrito)
        res.json(productoCarrito)
    }
})

router.put('/:id', async (req, res) => {
    if (admin) {
        let productosCarrito = await carritoContenedor.getAll()
        const { id } = req.params
        const nuevoProducto = req.body
        let productoCarrito = productosCarrito.find(prod => prod.id === parseInt(id))
        if (productoCarrito) {
            let index = productosCarrito.indexOf(productoCarrito)
            productoCarrito = { ...productoCarrito, ...nuevoProducto }
            productosCarrito[index] = productoCarrito
            await carritoContenedor.saveArray(productosCarrito)
            res.send('Producto actualizado correctamente')
        }
        else {
            res.json({ error: 'productoCarrito no encontrado' })
        }
    }
})
router.delete('/deleteAll', async (req, res) => {
    if (admin) {
        await carritoContenedor.deleteAll()
        res.send('Carrito vaciado correctamente')
    }
})

router.delete('/:id', async (req, res) => {
    if (admin) {
        let productosCarrito = await carritoContenedor.getAll()
        const { id } = req.params
        if (id > 0) {
            // productosCarrito = productosCarrito.filter(prod => prod.id !== parseInt(id))
            await carritoContenedor.deleteById(id)
            res.send('Producto eliminado correctamente')
        } else {
            res.json({ error: 'productoCarrito no encontrado' })
        }
    }
})



module.exports = router