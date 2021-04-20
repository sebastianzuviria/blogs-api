// import sequelize
const Sequelize = require('sequelize')
// import connection database
const sequelize = require('../database')
// define model
const Category = sequelize.define('categories', {
    ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
})

module.exports = Category