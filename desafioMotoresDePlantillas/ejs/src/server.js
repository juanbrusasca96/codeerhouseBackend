const express = require('express')
const app = express()
const hbs = require('express-handlebars')
const productosRoutes = require('./views/routes/productos.js')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// app.engine('hbs', hbs.engine({
//     partialsDir: __dirname + '/views/partials',
//     layoutsDir: __dirname + '/views/layouts',
//     extname: '.hbs',
//     defaultLayout: 'layout2.hbs'
// }))
app.set('views', './src/views')
app.set('view engine', 'ejs')
app.use('/api/productos', productosRoutes)
// app.use(express.static(__dirname + '/public'))
// app.get('/', (req, res) => {
//     res.render('index', { layout: 'layout2.hbs' })
// })

// app.get('/main', (req, res) => {
//     const { nombre, apellido, deporte } = req.query
//     res.render('main', { nombre, apellido, deporte, render: true })
// })

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`Escuchando al puerto ${PORT}`);
})