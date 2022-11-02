import mongoose from 'mongoose';

const productsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    stock: {
        type: Number,
        required: true
    }
})

export const productsModel = mongoose.model('Products', productsSchema)