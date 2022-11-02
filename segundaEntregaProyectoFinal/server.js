import { mongoConnect } from './configMongodb.js';
import express from 'express';
import productsRoutes from './routes/productsRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import { firebaseConnect } from './configFirebase.js';

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/products', productsRoutes)
app.use('/cart', cartRoutes)

const PORT = 8080

try {
    await mongoConnect()
    await firebaseConnect()
    app.listen(PORT, () => {
        console.log(`escuchando al puerto ${PORT}`);
    })
} catch (error) {
    console.log(error);
}

// mongoose.connection.on('open', () => {
//     console.log('Base de datos conectada');
// })

// mongoose.connection.on('error', (err) => {
//     console.log(err);
// })