require('dotenv').config()
const express = require('express')
const app = express('express')
const blogRouter = require('./routes/blog')

app.use(express.json())

app.get('/', (request, response) => {
    response.send('BLOG API')
})

app.use('/api/blogs', blogRouter)

module.exports = app