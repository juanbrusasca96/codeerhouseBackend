const express = require('express')
const http = require('http')
const { Server: SocketServer } = require('socket.io')
const { Contenedor } = require('./contenedor')
const {db} = require('./db/dbConfig.js')
const {dbSQLite} = require('./db/dbConfigSQlite.js')

const app = express()
const hbs = require('express-handlebars')
const httpServer = http.createServer(app)
const socketServer = new SocketServer(httpServer)

app.use(express.static('./public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.engine('hbs', hbs.engine({
    partialsDir: __dirname + '/views/partials',
    layoutsDir: __dirname + '/views/layouts',
    extname: '.hbs',
    defaultLayout: 'layout1.hbs'
}))
app.set('views', './views')
app.set('view engine', 'hbs')

app.get('/', (req, res) => {
    res.render('index',{layout:'layout1.hbs'})
})

//WEBSOCKET
// const mensajes = []
const mensajes = new Contenedor(dbSQLite, 'mensajes')
const productos = new Contenedor(db, 'productos')
socketServer.on('connection', async (client) => {
  console.log('!Nuevo cliente conectado!')

  client.emit('mensajeBienvenida', await mensajes.getAll())

  client.on('mensaje', async (obj) => {
    await mensajes.save(obj)
    socketServer.sockets.emit('mensajesArray', await mensajes.getAll())
  })

  client.emit('productosGuardados', await productos.getAll())

  client.on('producto', async (obj) => {
    await productos.save(obj)
    socketServer.sockets.emit('productosArray', await productos.getAll())
  })
})

const PORT = process.env.PORT || 3000
httpServer.listen(PORT, () => {
  console.log(`Servidor escuchando al puerto ${PORT}`)
})