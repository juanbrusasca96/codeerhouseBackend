const express = require('express')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const sessionFileStore = require('session-file-store')
const { faker } = require('@faker-js/faker')
const http = require('http')
const { Server: SocketServer } = require('socket.io')
const { Contenedor } = require('./contenedor.js')
const { db } = require('./db/dbConfig.js')
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };

const app = express()
const hbs = require('express-handlebars')
const { ContenedorMensajes } = require('./contenedorMensajes.js')
const { messageModel } = require('./db/models/messageModels.js')
const { mongoConnect } = require('./db/configMongodb.js')
const httpServer = http.createServer(app)
const socketServer = new SocketServer(httpServer)

const fileStore = sessionFileStore(session)
const sessionExpires = 600000

try {
  mongoConnect()
} catch (error) {
  console.log(error);
}

app.use(express.urlencoded({ extended: true }))
app.use(express.static('./public'))
app.use(express.json())
app.use(session({
  store: MongoStore.create({
    mongoUrl: 'mongodb+srv://juanbrusasca:iacc40105795@cluster0.f6mjx6z.mongodb.net/ecommerce?retryWrites=true&w=majority',
    mongoOptions: advancedOptions,
    ttl: 60,
    collectionName: 'sessions'
  }),
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: sessionExpires }
}));
app.engine('hbs', hbs.engine({
  partialsDir: __dirname + '/views/partials',
  layoutsDir: __dirname + '/views/layouts',
  extname: '.hbs',
  defaultLayout: 'layout1.hbs'
}))
app.set('views', './views')
app.set('view engine', 'hbs')

app.get('/', (req, res, next) => {
  if (req.session?.name) {
    next();
  } else {
    res.render('login', { layout: 'layout1.hbs' })
  }
}, (req, res) => {
  res.render('index', { layout: 'layout1.hbs', name: req.session.name })
})

let flag = true

app.post('/session', (req, res) => {
  flag = true
  const { name } = req.body;
  req.session.name = name;
  res.redirect('/');
})

app.post('/logout', (req, res) => {
  try {
    req.session.destroy();
    res.redirect('/');
  } catch (err) {
    res.status(500).send('Error: ', err);
  }
})

// app.get('/session', (req, res) => {
//   flag = true
//   if (req.session.cookie.expires.getTime() + sessionExpires < Date.now()) {
//     res.render('login', { layout: 'layout1.hbs' })
//   } else {
//     for (const key in req.body) {
//       req.session[key] = req.body[key]
//     }
//     res.render('index', { layout: 'layout1.hbs' })
//   }
// })

app.get('/index', (req, res) => {
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

socketServer.on('connection', async (client) => {
  console.log('!Nuevo cliente conectado!')

  // if (flag) {
    client.emit('mensajeBienvenida', await mensajes.getAll())
  //   flag = false
  // }

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