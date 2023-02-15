# Coderhouse

## Proyecto realizado con KOA

este proyecto tiene 4 enpoints de los cuales son
'/products' -> GET , recibe todos los productos
'/products/id' -> GET , recibe el producto que tiene el id (IMPORTANTE, NO ES EL ID DE MONGO, ES EL ID DEL PRODUCTO, POR SI SE USAN OTRAS BD)
'/products' -> POST, Se crea en bd un elemento, se requiere minimo un json como el siguiente ejemplo

```json
{       
            "producto": "MOCK A BORRAR",
            "precio": "100",
            "thumbnail": "https://assets.adidas.com/images/w_766,h_766,f_auto,q_auto,fl_lossy,c_fill,g_auto/d2219197ed56442281b6acb700930fde_9366/botines-copa-sense.1-terreno-firme.jpg",
            "id": 300
}
```
'/products/id' -> DELETE, Se borra el elemento creado con el ID (otra ves, no es el de mongo, es un valor numerico)
