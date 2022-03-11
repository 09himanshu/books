/**
 * This file contain all stuff like db connection and string schema
 */

const Sequelize = require('sequelize');
const {DB, USER, PASSWORD, dialect, HOST, pool} = require('../config/server.config');


const sequelize = new Sequelize(DB, USER, PASSWORD, {
    host: HOST,
    dialect: dialect,
    pool :{
        max: Number(pool.max),
        min: Number(pool.min),
        acquire: pool.acquire,
        idle: pool.idle,
    }
})

const db = {}
db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.books = require('./books.model')(sequelize, Sequelize);
db.bookCategory = require('./bookCategory.model')(sequelize,Sequelize);
db.users = require('./user.models')(sequelize,Sequelize);
db.roles =require('./roles.models')(sequelize,Sequelize);
db.Roles = ['customer', 'admin']

// Relationship between book and bookCategory
db.bookCategory.hasMany(db.books);

// Relationship between users and roles
db.users.belongsToMany(db.roles, {
    "through": "user_roles",
    "foreignKey": "users_id",
    "otherKey": "roles_id"
})

db.roles.belongsToMany(db.users, {
    "through": "user_roles",
    "foreignKey": "roles_id",
    "otherKey": "users_id"
})

module.exports = db;