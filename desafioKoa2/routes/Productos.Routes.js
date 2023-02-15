const Router = require('koa-router');
const {
    guardarProducto,
    cargarTodosLosProductos,
    cargarUnProducto,
    borrarProducto
} = require('../api/productosNormalizer');

const router = new Router({
    prefix: '/products'
});

router.get('/', async ctx => {
    ctx.body = await cargarTodosLosProductos();
});

router.get('/:id', async ctx => {
    const id = ctx.params.id;
    ctx.body = await cargarUnProducto(id);
});

router.post('/', async ctx => {
    let product = ctx.request.body;
    product = await guardarProducto(product);
    ctx.response.status = 200;
    ctx.body = product;
});

router.put('/:id', async ctx => {
    const id = ctx.params.id;
    let product = ctx.request.body;
    product = await updateProduct(id, product);
    ctx.response.status = 200;
    ctx.body = product;
});

router.delete('/:id', async ctx => {
    const id = ctx.params.id;
    await borrarProducto(id);
});

module.exports = router;