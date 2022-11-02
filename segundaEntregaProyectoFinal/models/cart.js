import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
    product: {
        type: Object,
        required: true,
        unique: true
    }
})

export const cartModel = mongoose.model('Cart', cartSchema)