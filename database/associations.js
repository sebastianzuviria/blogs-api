const Blog = require('./models/blogs')
const Category = require('./models/categories')

// Blog has one category
Blog.belongsTo(Category, {
    foreignKey: 'categoryId'
})