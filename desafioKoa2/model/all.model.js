const Mongoose = require("mongoose");

const ProductosSchema = new Mongoose.Schema({
            id: Number,
            producto: String,
            precio: String,
            thumbnail: String,
            dateOfInsert: {
                type: Date,
                default: new Date(),
            },
            lastUpdated: {
                type: Date,
                default: new Date(),
            },
        });
        
const productosModel = Mongoose.model("productos",
ProductosSchema
)

module.exports = {
    productosModel
}