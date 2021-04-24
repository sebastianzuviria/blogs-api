require('dotenv').config()
const express = require('express')
const app = express('express')
const cors = require('cors')
const blogRouter = require('./routes/blog')
const middleware = require('./utils/middleware')
require('./database/associations')

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

app.get('/', (request, response) => {
    response.send('BLOG API')
})
app.use('/api/blogs', blogRouter)

app.use(middleware.unknownEndpoint)

module.exports = app