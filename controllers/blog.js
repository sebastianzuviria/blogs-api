//import model
const Blogs = require('../models/blogs')

const getBlogs = async (request, response) => {

    try {
        const blogs = await Blogs.findAll({ 
            attributes: ['ID', 'title', 'image', 'category', 'createdAt'],
            order: [['createdAt', 'DESC']]
        })
        console.log(blogs)
        response.json(blogs)

    } catch (error) {
        console.log('error controller.getBlogs')
    }
}

const getBlogById = async (request, response) => {
    const id = request.params.id

    try {
        const blog = await Blogs.findByPk(id)
        if (blog){ 
            response.json(blog)
        } else {
            response.status(400).json({ error: 'blog not exist' })
        }
    } catch (error) {
        response.status(401).json({ error: error })
    }
}

const createBlog = async (request, response) => {
    const body = request.body
    const regExpImg = new RegExp(/[\/.](gif|jpg|jpeg|tiff|png)$/i)

    try {
        if(regExpImg.test(body.image)){
            const newBlog = await Blogs.create({
                title: body.title,
                content: body.content,
                image: body.image,
                category: body.category,
            })

            response.status(201).json(newBlog)
        } else {
            response.status(400).json({ error: 'image url not valid'})
        }
    } catch (error) {
        const errors = error.errors.map(e => e.message)
        response.status(400).json(errors)
    }
}

const updateBlog = async (request, response) => {
    const id = request.params.id
    const body = request.body

    try {
        const isUpdated = await Blogs.update(body, { where: { ID: id } })
        if(isUpdated[0] === 1) {
            const updatedBlog = await Blogs.findByPk(id)
            response.json(updatedBlog)
        } else {
            response.status(400).json({ error: 'blog or field not exist'})
        }       
    } catch (error) {
        response.json({ error: error.message})
    }
}

const deleteBlog = async (request, response) => {
    const id = request.params.id

    try {
        const blog = await Blogs.findByPk(id)
        if(blog){
            await Blogs.destroy({
                where: {
                    ID: id
                }
            })
            response.status(204).json({ message: 'blog deleted' })
        }

        response.status(400).json({ error: 'blog not exist' })
    } catch (error) {
        response.status(401).json({ error: error.message })
    }
}

const blogController = {
    getBlogs,
    getBlogById,
    createBlog,
    updateBlog,
    deleteBlog
}

module.exports = blogController