const mongoose = require('mongoose')

async function mongoConnect() {
    const URL = 'mongodb+srv://juanbrusasca:iacc40105795@cluster0.f6mjx6z.mongodb.net/ecommerce?retryWrites=true&w=majority'
    mongoose.connect(URL).then(() => {
        console.log('Conectado a Atlas');
    }).catch((e) => console.log(e))
}

module.exports = {mongoConnect}
