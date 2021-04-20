const blogRouter = require('express').Router()
const blogController = require('../controllers/blog')

blogRouter.get('/', blogController.getBlogs)
blogRouter.get('/:id', blogController.getBlogById)
blogRouter.post('/', blogController.createBlog)
blogRouter.patch('/:id', blogController.updateBlog)
blogRouter.delete('/:id', blogController.deleteBlog)

//middleware ValidationError for required values

module.exports = blogRouter