// import sequelize
const Sequelize = require('sequelize')

const database = new Sequelize(
    process.env.DB_NAME, // database
    process.env.DB_USERNAME, // username
    process.env.DB_PASSWORD, // password
    {
        host: 'localhost',
        dialect: 'mysql'
    }
)

database.sync()

module.exports = database