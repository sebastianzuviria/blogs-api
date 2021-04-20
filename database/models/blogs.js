// import sequelize
const Sequelize = require('sequelize')
// import connection database
const sequelize = require('../database')
// define model
const Blog = sequelize.define('blogs', {
    ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    content: {
        type: Sequelize.STRING,
        allowNull: false
    },
    image: {
        type: Sequelize.STRING,
        allowNull: false
    },
    categoryId: {
        type: Sequelize.INTEGER,
        required: true,
        allowNull: false
    },
})

module.exports = Blog