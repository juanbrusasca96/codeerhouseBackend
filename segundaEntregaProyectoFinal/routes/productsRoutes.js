import { Router } from 'express'
import { productsDaoDynamic } from '../daos/daoDynamic.js'

const router = Router()
const productsDao = new productsDaoDynamic()

router.get('/', async (req, res) => {
    const products = await productsDao.getAll()
    if (products.length !== 0) {
        res.json({ products })
    } else {
        res.json({ msg: 'no hay productos actualmente' })
    }
})

router.get('/:id', async (req, res) => {
    const { id } = req.params
    const product = await productsDao.getById(id)
    if (product.length !== 0) {
        res.json({ product })
    } else {
        res.json({ msg: 'no existe producto con ese id' })
    }
})

router.post('/', async (req, res) => {
    const obj = req.body
    console.log(obj);
    const product = await productsDao.create(obj)
    if (product.length !== 0) {
        res.json({ msg: 'producto creado con exito', product })
    } else {
        res.json({ msg: 'no se pudo crear el producto' })
    }
})

router.put('/', async (req, res) => {
    const { id } = req.params
    const obj = req.body
    try {
        const updatedProduct = await productsDao.update(id, obj)
        res.json({
            msg: 'producto actualizado con exito',
            product: updatedProduct
        })
    } catch (error) {
        console.log(error);
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const deletedProduct = await productsDao.delete(id)
        res.json({
            msg: 'producto eliminado con exito',
            product: deletedProduct
        })
    } catch (error) {
        console.log(error);
    }
})

export default router