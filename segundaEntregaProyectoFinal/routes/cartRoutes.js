import { Router } from 'express'
import { cartDaoDynamic } from '../daos/daoDynamic.js'

const router = Router()
const cartDao = new cartDaoDynamic()

router.get('/', async (req, res) => {
    const cart = await cartDao.getAll()
    if (cart.length !== 0) {
        res.json({ cart })
    } else {
        res.json({ msg: 'no hay productos en el carrito actualmente' })
    }
})

router.get('/:id', async (req, res) => {
    const { id } = req.params
    const productCart = await cartDao.getById(id)
    if (productCart.length !== 0) {
        res.json({ productCart })
    } else {
        res.json({ msg: 'no existe producto en el carrito con ese id' })
    }
})

router.post('/', async (req, res) => {
    const obj = req.body
    const productCart = await cartDao.create(obj)
    if (productCart.length !== 0) {
        res.json({ msg: 'producto agregado al carrito con exito', productCart })
    } else {
        res.json({ msg: 'no se pudo agregar el producto al carrito' })
    }
})

router.put('/', async (req, res) => {
    const { id } = req.params
    const obj = req.body
    try {
        const updatedProductCart = await cartDao.update(id, obj)
        res.json({
            msg: 'producto actualizado con exito',
            product: updatedProductCart
        })
    } catch (error) {
        console.log(error);
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const deletedProductCart = await cartDao.delete(id)
        res.json({
            msg: 'producto eliminado con exito',
            product: deletedProductCart
        })
    } catch (error) {
        console.log(error);
    }
})

export default router