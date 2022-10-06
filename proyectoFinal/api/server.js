const express = require('express')
const app = express()
const productosRoutes = require('./routes/productos.js')
const carritoRoutes = require('./routes/carrito.js')

const cors = require('cors');
app.use(cors());

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/api/productos', productosRoutes)
app.use('/api/carrito', carritoRoutes)
app.use(express.static(__dirname+'/public'))

const PORT = process.env.PORT || 8080
app.listen(PORT, ()=>{
    console.log(`Escuchando al puerto ${PORT}`); 
})