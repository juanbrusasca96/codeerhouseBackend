const Koa = require('koa');
const { PORT } = require('./config/config');
const bodyParser = require('koa-bodyparser');

const productRoutes = require('./routes/Productos.Routes');

const app = new Koa();

app.use(bodyParser());
app.use(productRoutes.routes()).use(productRoutes.allowedMethods());

app.listen(PORT, () => {
    console.log(`App inicia en el puesto ${PORT}`)
 })