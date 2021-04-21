//import model
const Blog = require('../database/models/blogs')
const Category = require('../database/models/categories')

const getBlogs = async (request, response) => {

    try {
        const blogs = await Blog.findAll({
            include: {
                model: Category,
                attributes: ['name']
            }, 
            attributes: ['ID', 'title', 'image', 'createdAt'],
            order: [['createdAt', 'DESC']]
        })
        console.log(blogs)
        response.json(blogs)
    } catch (error) {
        response.status(400).json({ error: error })
    }
}

const getBlogById = async (request, response) => {
    const id = request.params.id

    try {
        const blog = await Blog.findByPk(id, {
            include: {
                model: Category,
                attributes: ['name']
            },
            attributes: ['ID', 'title', 'image', 'createdAt'],
        })
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
        const category = await Category.findOne({where: { name: body.category }})
        if(!category){
            const newCategory = await Category.create({
                    name: body.category
                })  

            if(regExpImg.test(body.image)){
                const newBlog = await Blog.create({
                    title: body.title,
                    content: body.content,
                    image: body.image,
                    categoryId: newCategory.ID,
                })
                response.status(201).json(newBlog)
            } else {
                    response.status(400).json({ error: 'image url not valid'})
            }
        } else {        
            if(regExpImg.test(body.image)){
                const newBlog = await Blog.create({
                    title: body.title,
                    content: body.content,
                    image: body.image,
                    categoryId: category.ID,
                })
                response.status(201).json(newBlog)
            } else {
                response.status(400).json({ error: 'image url not valid'})
            }
        }
    } catch (error) {
        response.status(400).json({ error: error })
    }
}

const updateBlog = async (request, response) => {
    const id = request.params.id
    const body = request.body

    try {
        if(body.category){
            const category = await Category.findOne({where: { name: body.category }})
            if(!category){
                const newCategory = await Category.create({
                        name: body.category
                    })
                const isUpdated = await Blog.update({
                    title: body.title,
                    content: body.content,
                    image: body.image,
                    categoryId: newCategory.ID
                }, { where: { ID: id } })
                if(isUpdated[0] === 1) {
                    const updatedBlog = await Blog.findByPk(id)
                    response.json(updatedBlog)
                } else {
                    response.status(400).json({ error: 'blog or field not exist'})
                }                 
            } else {
                const isUpdated = await Blog.update({
                    title: body.title,
                    content: body.content,
                    image: body.image,
                    categoryId: category.ID
                }, { where: { ID: id } })
                if(isUpdated[0] === 1) {
                    const updatedBlog = await Blog.findByPk(id)
                    response.json(updatedBlog)
                } else {
                    response.status(400).json({ error: 'blog or field not exist'})
                }       
            }
        } else {
            const isUpdated = await Blog.update(body, { where: { ID: id } })
            if(isUpdated[0] === 1) {
                const updatedBlog = await Blog.findByPk(id)
                response.json(updatedBlog)
            } else {
                response.status(400).json({ error: 'blog or field not exist'})
            }  
        }     
    } catch (error) {
        response.json({ error: error.message})
    }
}

const deleteBlog = async (request, response) => {
    const id = request.params.id
    
    try {
        // Verify that blog exist
        const blogToDelete = await Blog.findByPk(id)
        // Save categoryId of blog to delete
        const categoryId = blogToDelete ? blogToDelete.categoryId : null
        
        if(blogToDelete){
            await Blog.destroy({
                where: {
                    ID: id
                }
            })            
            // Verify that not exist a blog with this category
            const blogsWithCategory = await Blog.findOne({ where: { categoryId: categoryId}})
            // If no one exist, delete categorys
            if(!blogsWithCategory){
                await Category.destroy({
                    where: {
                        ID: categoryId
                    }
                })
            }
            response.status(204).json({ message: 'blog deleted' })
        } else {
        response.status(400).json({ error: 'blog not exist' })
        }    
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