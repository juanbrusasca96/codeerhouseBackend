const Mongoose = require('mongoose');
const dotenv = require('dotenv')
const {usuarioModel, productosModel, CarroModel} = require('../model/all.model.js');
dotenv.config()

let database;
const connect = () => {
    // Add your own uri below, here my dbname is UserDB
    // and we are using the local mongodb
//    const url = process.env.MONGO_URI;
    const url = 'mongodb+srv://juanbrusasca:iacc40105795@cluster0.f6mjx6z.mongodb.net/ecommerce?retryWrites=true&w=majority'
  
    if (database) {
        return;
    }
    // In order to fix all the deprecation warnings, 
    // below are needed while connecting
    Mongoose.connect(url);
  
    database = Mongoose.connection;
  
  
    return {
        usuarioModel,
        productosModel,
        CarroModel
    };
};
  
// Safer way to get disconnected
const disconnect = () => {
    if (!database) {
        return;
    }
  
    Mongoose.disconnect();
};
module.exports = {connect, disconnect}