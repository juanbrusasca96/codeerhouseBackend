require('dotenv').config();

const NODE_ENV = process.env.ENVIROMENT;

module.exports = {
    PORT: process.env.PORT || 4000,
    MONGO_URI: process.env.MONGO_URI || '',
}