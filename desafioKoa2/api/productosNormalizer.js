const productosDaoMongo = require('../persistencia/productosMongo');

const guardarProducto = async (obj) => {
    if (
      obj.producto &&
      obj.precio &&
      obj.thumbnail
    ) {
      const producto = {
        producto: obj.producto,
        precio: obj.precio,
        thumbnail: obj.thumbnail, 
        id:obj.id 
              
      };
      const productoGuardado = await new productosDaoMongo().save(producto)
      return {message: "se cargo correctamente", success: "err", data: productoGuardado}

    }else{
        return {message: "no cumple con los requisitos", success: "err"}
    }
  }

const cargarTodosLosProductos =   async () =>  {  
    const productos =  await new productosDaoMongo().getAll()
    console.log('productos!', productos)
    if(productos.data?.length > 0){
        return {message: "Productos encontrados", data: productos.data, success: true}      
    }else {
      return {message: "no se encontro productos", success: false}
    }   
}

const cargarUnProducto =   async (id) =>  {  
  const productos =  await new productosDaoMongo().getById(id)
  console.log('productos!', productos)
  if(productos.data?.length > 0){
      return {message: "Productos encontrados", data: productos.data, success: true}      
  }else {
    return {message: "no se encontro productos", success: false}
  }   
}
const borrarProducto =   async (id) =>  {  
  const productos =  await new productosDaoMongo().deleteById(id)
  console.log('productos!', productos)
  if(productos.acknowledged){
      return {message: "Producto eliminado", data: productos, success: true}      
  }else {
    return {message: "no se encontro productos", success: false}
  }   
}
module.exports = {
    guardarProducto,
    cargarTodosLosProductos,   
    cargarUnProducto,
    borrarProducto
};