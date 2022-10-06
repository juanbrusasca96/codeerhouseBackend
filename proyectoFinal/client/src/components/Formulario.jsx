import React from 'react'
import { useState } from 'react'
import axios from "axios";
import { useEffect } from 'react';

export default function Formulario() {
    const [nombre, setNombre] = useState()
    const [descripcion, setDescripcion] = useState()
    const [codigo, setCodigo] = useState()
    const [foto, setFoto] = useState()
    const [precio, setPrecio] = useState()
    const [stock, setStock] = useState()
    const [listaProductos, setListaProductos] = useState([])
    const [productosCarrito, setProductosCarrito] = useState([])

    useEffect(() => {
        async function getProductos() {
            const res = await axios.get('/api/productos')
            setListaProductos(res.data.productos)
        }
        async function getProductosCarrito() {
            const res = await axios.get('/api/carrito')
            setProductosCarrito(res.data.productosCarrito)
        }
        getProductos()
        getProductosCarrito()
    }, [])

    return (
        <div>
            <h1>FORMULARIO DE INGRESO DE PRODUCTOS</h1>
            <form onSubmit={async (e) => {
                e.preventDefault()
                await axios.post('/api/productos', { nombre, descripcion, codigo, foto, precio, stock })
                const res = await axios.get('/api/productos')
                setListaProductos(res.data.productos)
            }}>
                <input type="text" name="nombre" id="nombre" placeholder="nombre" value={nombre} onChange={e => setNombre(e.target.value)} />
                <input type="text" name="descripcion" id="descripcion" placeholder="descripcion" value={descripcion} onChange={e => setDescripcion(e.target.value)} />
                <input type="text" name="codigo" id="codigo" placeholder="codigo" value={codigo} onChange={e => setCodigo(e.target.value)} />
                <input type="text" name="foto" id="foto" placeholder="foto" value={foto} onChange={e => setFoto(e.target.value)} />
                <input type="number" name="precio" id="precio" placeholder="precio" value={precio} onChange={e => setPrecio(e.target.value)} />
                <input type="number" name="stock" id="stock" placeholder="stock" value={stock} onChange={e => setStock(e.target.value)} />
                <input type="submit" value="INGRESAR UN PRODUCTO" />
            </form>
            <h1>LISTA DE PRODUCTOS</h1>
            <div>
                <ul>
                    {
                        listaProductos && listaProductos?.map(prod => <li>nombre: {prod.nombre}, descripcion: {prod.descripcion}, codigo: {prod.codigo}, URL foto: {prod.foto}, precio: ${prod.precio}, stock: {prod.stock} <button onClick={async () => {
                            await axios.post('/api/carrito', { ...prod })
                            const res = await axios.get('/api/carrito')
                            setProductosCarrito(res.data.productosCarrito)
                        }}>AGREGAR AL CARRITO</button> 
                        <button onClick={async () => {
                            await axios.delete(`/api/productos/${prod.id}`)
                            const res = await axios.get('/api/productos')
                            setListaProductos(res.data.productos)
                        }}>ELIMINAR PRODUCTO</button></li>)
                    }
                </ul>
            </div>
            <h1>PRODUCTROS EN EL CARRITO</h1>
            {
                productosCarrito && productosCarrito.length > 0 && <button onClick={async () => {
                    await axios.delete('/api/carrito/deleteAll')
                    const res = await axios.get('/api/carrito')
                    setProductosCarrito(res.data.productosCarrito)
                }}>VACIAR CARRITO</button>
            }
            <div>
                <ul>
                    {
                        productosCarrito && productosCarrito?.map(prod => <li>nombre: {prod.nombre}, descripcion: {prod.descripcion}, codigo: {prod.codigo}, URL foto: {prod.foto}, precio: ${prod.precio}, stock: {prod.stock} <button onClick={async () => {
                            await axios.delete(`/api/carrito/${prod.id}`)
                            const res = await axios.get('/api/carrito')
                            setProductosCarrito(res.data.productosCarrito)
                        }}>ELIMINAR DEL CARRITO</button></li>)
                    }
                </ul>
            </div>
        </div>
    )
}
