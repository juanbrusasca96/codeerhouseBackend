const socketClient = io()

const formularioMensajes = document.getElementById('formularioMensajes')
const inputEmailMensajes = document.getElementById('emailMensajes')
const inputInfoMensajes = document.getElementById('infoMensajes')
const listaMensajes = document.getElementById('listaMensajes')

const formularioProductos = document.getElementById('formularioProductos')
const inputTitleProductos = document.getElementById('title')
const inputPriceProductos = document.getElementById('price')
const listaProductos = document.getElementById('listaProductos')

formularioMensajes.onsubmit = (e) =>{
    e.preventDefault()
    const info = inputInfoMensajes.value
    const nombre = inputEmailMensajes.value
    const obj = {nombre,info}
    socketClient.emit('mensaje',obj)
    inputInfoMensajes.value = ''
}


socketClient.on('mensajesArray',mensajesArray=>{
    console.log(mensajesArray)
    generarTexto(mensajesArray)
})

socketClient.on('mensajeBienvenida',msn=>{
    generarTexto(msn)
})

function generarTexto(mensajes){
    const inner = mensajes.map(mensaje=>{
        return (`<li>${mensaje.nombre}: ${mensaje.info}</li><br>`)
    }).join(' ')
    listaMensajes.innerHTML = inner
}

formularioProductos.onsubmit = (e) =>{
    e.preventDefault()
    const title = inputTitleProductos.value
    const price = inputPriceProductos.value
    const obj = {title,price}
    socketClient.emit('producto',obj)
    inputPriceProductos.value = ''
}


socketClient.on('productosArray',productosArray=>{
    console.log(productosArray)
    generarProducto(productosArray)
})

socketClient.on('productosGuardados',prod=>{
    generarProducto(prod)
})

function generarProducto(productos){
    const inner = productos.map(producto=>{
        return (`<li>${producto.title}, $${producto.price}</li><br>`)
    }).join(' ')
    listaProductos.innerHTML = inner
}