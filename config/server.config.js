/**
 * containg all databse stuff
 */

if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

module.exports = {
    PORT: process.env.PORT,
    HOST: process.env.HOST,
    USER: process.env.USER,
    PASSWORD: process.env.PASSWORD,
    DB: process.env.DB,
    dialect: process.env.dialect,
    secret: process.env.secret,
    pool : {
        max: process.env.max,
        min: process.env.min,
        acquire: process.env.acquire,
        idle: process.env.idle,
    }
}