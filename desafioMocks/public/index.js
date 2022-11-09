const socketClient = io()

const formularioMensajes = document.getElementById('formularioMensajes')
const inputEmailMensajes = document.getElementById('emailMensajes')
const inputNombreMensajes = document.getElementById('nombreMensajes')
const inputApellidoMensajes = document.getElementById('apellidoMensajes')
const inputEdadMensajes = document.getElementById('edadMensajes')
const inputAliasMensajes = document.getElementById('aliasMensajes')
const inputAvatarMensajes = document.getElementById('avatarMensajes')
const inputInfoMensajes = document.getElementById('infoMensajes')
const listaMensajes = document.getElementById('listaMensajes')

const porcentajeCompresion = document.getElementById('porcentajeCompresion')

const formularioProductos = document.getElementById('formularioProductos')
const inputTitleProductos = document.getElementById('title')
const inputPriceProductos = document.getElementById('price')
const listaProductos = document.getElementById('listaProductos')

formularioMensajes.onsubmit = (e) => {
    e.preventDefault()
    const text = inputInfoMensajes.value
    const author = {
        email: inputEmailMensajes.value,
        nombre: inputNombreMensajes.value,
        apellido: inputApellidoMensajes.value,
        edad: inputEdadMensajes.value,
        alias: inputAliasMensajes.value,
        avatar: inputAvatarMensajes.value
    }
    const obj = { author, text }
    socketClient.emit('mensaje', obj)
    inputInfoMensajes.value = ''
}


socketClient.on('mensajesArray', mensajesArray => {
    generarTexto(mensajesArray)
})

socketClient.on('mensajeBienvenida', msn => {
    generarTexto(msn)
})

function generarTexto(mensajes) {
    const inner = Object.keys(mensajes.mensajesNormalized.entities.mensajes).map(key => {
        return (`<li>${mensajes.mensajesNormalized.entities.mensajes[key].author}: ${mensajes.mensajesNormalized.entities.mensajes[key].text}</li><br>`)
    }).join(' ')
    console.log(inner);
    listaMensajes.innerHTML = inner
    calcularCompresion(mensajes)
}

function calcularCompresion(obj){
    const ahorro = (((JSON.stringify(obj.mensajesObject).length - JSON.stringify(obj.mensajesNormalized).length)/JSON.stringify(obj.mensajesObject).length)*100).toFixed(2)
    const inner = `<p>Compresion: %${ahorro}</p>`
    porcentajeCompresion.innerHTML=inner
}

formularioProductos.onsubmit = (e) => {
    e.preventDefault()
    const title = inputTitleProductos.value
    const price = inputPriceProductos.value
    const obj = { title, price }
    socketClient.emit('producto', obj)
    inputPriceProductos.value = ''
}


socketClient.on('productosArray', productosArray => {
    console.log(productosArray)
    generarProducto(productosArray)
})

socketClient.on('productosGuardados', prod => {
    generarProducto(prod)
})

function generarProducto(productos) {
    const inner = productos.map(producto => {
        return (`<li>${producto.title}, $${producto.price}</li><br>`)
    }).join(' ')
    listaProductos.innerHTML = inner
}