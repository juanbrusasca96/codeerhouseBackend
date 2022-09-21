const express = require('express')
const app = express()
const hbs = require('express-handlebars')
const productosRoutes = require('./views/routes/productos.js')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.set('views', './src/views')
app.set('view engine', 'pug')
app.use('/api/productos', productosRoutes)

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`Escuchando al puerto ${PORT}`);
})