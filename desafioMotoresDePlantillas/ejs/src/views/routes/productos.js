const { Router } = require('express')

const router = Router()
let productos = []

router.get('/', (req, res) => {
    res.render('pages/index', { productos })
    // res.json({ productos })
})

router.get('/productos', (req, res) => {
    res.render('pages/index2', { productos })
    // res.json({ productos })
})

router.get('/:id', (req, res) => {
    const { id } = req.params
    let producto = productos.find(prod => prod.id === parseInt(id))
    res.json(producto ? producto : { error: 'producto no encontrado' })
})

router.post('/', (req, res) => {
    let producto = req.body
    producto = { ...producto, id: productos.length > 0 ? productos[productos.length - 1].id + 1 : 1 }
    productos.push(producto)
    res.redirect('/api/productos')
})

router.put('/:id', (req, res) => {
    const { id } = req.params
    const nuevoProducto = req.body
    let producto = productos.find(prod => prod.id === parseInt(id))
    if (producto) {
        let index = productos.indexOf(producto)
        producto = { ...producto, ...nuevoProducto }
        productos[index] = producto
        res.send('Producto actualizado correctamente')
    }
    else {
        res.json({ error: 'producto no encontrado' })
    }

})

router.delete('/:id', (req, res) => {
    const { id } = req.params
    if (id > 0 && id < productos.length) {
        productos = productos.filter(prod => prod.id !== parseInt(id))
        res.send('Producto eliminado correctamente')
    } else {
        res.json({ error: 'producto no encontrado' })
    }

})

module.exports = router