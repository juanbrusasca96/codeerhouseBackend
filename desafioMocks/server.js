const express = require('express')
const { faker } = require('@faker-js/faker')
const http = require('http')
const { Server: SocketServer } = require('socket.io')
const { Contenedor } = require('./contenedor.js')
const { db } = require('./db/dbConfig.js')
const { dbSQLite } = require('./db/dbConfigSQlite.js')

const app = express()
const hbs = require('express-handlebars')
const { ContenedorMensajes } = require('./contenedorMensajes.js')
const { messageModel } = require('./db/models/messageModels.js')
const { mongoConnect } = require('./db/configMongodb.js')
const httpServer = http.createServer(app)
const socketServer = new SocketServer(httpServer)


try {
  mongoConnect()
} catch (error) {
  console.log(error);
}

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
  res.render('index', { layout: 'layout1.hbs' })
})

app.get('/api/productos-test', (req, res) => {
  const arrayResponse = []
  for (let i = 1; i <= 5; i++) {
    const prod = {
      id: i,
      name: faker.commerce.product(),
      price: faker.commerce.price(1, 10000, 0, '$'),
      image: faker.image.image(200, 200, true)
    }
    arrayResponse.push(prod)
  }
  res.render('main', { arrayResponse, render: true })
  // res.json({ response: arrayResponse })
})

//WEBSOCKET
// const mensajes = []
const mensajes = new ContenedorMensajes(messageModel)
const productos = new Contenedor(db, 'productos')
let flag = true
socketServer.on('connection', async (client) => {
  console.log('!Nuevo cliente conectado!')

  if (flag) {
    client.emit('mensajeBienvenida', await mensajes.getAll())
    flag = false
  }

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