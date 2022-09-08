const express = require('express')
const app = express()
const productosRoutes = require('./routes/productos.js')

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/api/productos', productosRoutes)
app.use(express.static(__dirname+'/public'))

const PORT = process.env.PORT || 8080
app.listen(PORT, ()=>{
    console.log(`Escuchando al puerto ${PORT}`); 
})