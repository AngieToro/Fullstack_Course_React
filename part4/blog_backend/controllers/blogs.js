require('dotenv').config()
const blogsRouter = require('express').Router()
const BlogDB = require('../models/blog')
const logger = require('../utils/logger')
const middleware = require('../utils/middleware')

console.log('Blog Controller')

//finding all blogs
blogsRouter.get('/', async(request, response, next) => {
  
  try {
    const blogs = await BlogDB
      .find({})
      .populate('user',{
        username: 1,
        name: 1
      })

    if (blogs){
      response.json(blogs)
      logger.info('Blogs: ', blogs)
    } else {
      logger.error('Error finding blogs')
      response.status(404).send( { error: 'Not Found - Error finding blogs' } )
    }

  } catch (error) {
    next(error)
  }
})

//finding a blog by id
blogsRouter.get('/:id', async(request, response, next) => {
   
  try {
    const id = request.params.id

    const blog = await BlogDB.findById(id)
    
    if (blog){
      logger.info('Find blog by id: ', blog)
      response.json(blog)
    } else {
      logger.error('Error finding the blog')
      response.status(404).send( { error: 'Not Found - Error finding a blog by id' } )
    }
  } catch (error) {
    next(error)
  }
})

///adding a blog
blogsRouter.post('/', middleware.userExtractor, async(request, response, next) => {

  try {
    const body = request.body
    const user = request.user
      
    if (!body.title || !body.author || !body.url){
      return response.status(400).json({
        error: 'Bad Request: Content missing'
      })
    } 
   
    const blogObject = new BlogDB({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0,
      user: user.id
    })

    const blogSaved = await blogObject.save()
    user.blogs = user.blogs.concat(blogObject._id)
    await request.user.save()
    logger.info('Blog added: ', blogSaved)
    response.status(201).json(blogSaved)
    
  } catch (error) {
    next(error)
  }
})

//Deleting a blog
blogsRouter.delete('/:id', middleware.userExtractor, async (request, response, next) => {

  try {

    const id = request.params.id
    console.log('Delete ID: ', id)

    const user = request.user

    const blog = await BlogDB.findById(id)
    
    if (!blog){
      return response.status(404).json({ error: 'Blog not found' })
    }

    if (!blog.user || blog.user.toString() !== user.id.toString()){
      return response.status(403).json({ error: 'Not authorized to delete this blog. Only the creator can delete the blog' })
    }

    await blog.deleteOne()
    response.status(204).end()
    logger.info('Note deleted') 

  } catch (error) {
    next(error)    
  }
})

//Updating a blog
blogsRouter.put('/:id', async (request, response, next) => {

  try {
    console.log('Update body: ', request.body)
    const { title, author, url, likes } = request.body
  
    const id = request.params.id
    console.log('Update id: ', id)
  
    const blogUpdated = await BlogDB.findByIdAndUpdate(
      id, 
      { title, author, url, likes }, 
      { new: true, runValidators: true, context:'query' }
    )
    
    response.json(blogUpdated)
    logger.info('Blog updated: ', blogUpdated)

  } catch (error) {
    next(error)    
  }
})

module.exports = blogsRouter