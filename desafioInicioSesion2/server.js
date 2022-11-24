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
const passport = require('passport');
require('./middlewares/auth.js');

const app = express()
const hbs = require('express-handlebars')
const { ContenedorMensajes } = require('./contenedorMensajes.js')
const { messageModel } = require('./db/models/messageModels.js')
const { mongoConnect } = require('./db/configMongodb.js')
const checkAuthentication = require('./middlewares/auth.js')
const httpServer = http.createServer(app)
const socketServer = new SocketServer(httpServer)

const fileStore = sessionFileStore(session)
const sessionExpires = 100000

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
  resave: false,
  saveUninitialized: false,
  rolling: true,
  cookie: {
    httpOnly: false,
    secure: false,
    maxAge: sessionExpires
  }
}));
app.engine('hbs', hbs.engine({
  partialsDir: __dirname + '/views/partials',
  layoutsDir: __dirname + '/views/layouts',
  extname: '.hbs',
  defaultLayout: 'layout1.hbs'
}))
app.set('views', './views')
app.set('view engine', 'hbs')


app.use(passport.initialize());
app.use(passport.session());


app.get('/', checkAuthentication, (req, res) => {
  res.render('index', { layout: 'layout1.hbs' })
})

let flag = true


app.get('/login', (req, res) => {
  flag = true
  res.render('signup.hbs')
})
app.post('/login', passport.authenticate('login', { failureRedirect: '/faillogin' }), (req, res) => {
  const { email } = req.user;
  res.render('index', { layout: 'layout1.hbs', email })
})
app.get('/faillogin', (req, res) => {
  res.render('faillogin.hbs')
})


app.get('/signup', (req, res) => res.render('signup.hbs'))
app.post('/signup', passport.authenticate('signup', { failureRedirect: '/failsignup' }), (req, res) => {
  const { email } = req.user;
  console.log(email);
  res.render('index', { layout: 'layout1.hbs', email })
});
app.get('/failsignup', (req, res) => res.render('failsingup.hbs'));


app.post('/redirect-signup', (req, res) => res.redirect('/signup'));
app.post('/redirect-login', (req, res) => res.redirect('/login'));


app.post('/logout', (req, res) => {
  req.logout(error => { if (error) next(error) });
  res.redirect('/login');
})

app.get('*', (req, res) => res.status(404).render('routingerror.hbs'));

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