require('dotenv').config()
const blogsRouter = require('express').Router()
const BlogDB = require('../models/blog')
const CommentDB = require('../models/comment')
const logger = require('../utils/logger')
const middleware = require('../utils/middleware')

//finding all blogs
blogsRouter.get('/', async(request, response, next) => {
  
  try {
    const blogs = await BlogDB
      .find({})
      .populate('user',{
        username: 1,
        name: 1
      })
      .populate('comments', {
        comment: 1, 
        creationDate: 1
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

    const blog = await BlogDB
      .findById(id)
      .populate('user',{
        username: 1,
        name: 1
      })
      .populate('comments', {
        comment: 1, 
        creationDate: 1
      })  
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
    const populateBlog = await blogSaved.populate('user', { username:1, name:1 })
    user.blogs = user.blogs.concat(blogObject._id)
    await request.user.save()
    logger.info('Blog added: ', blogSaved)
    response.status(201).json(populateBlog)
    
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
    ).populate('user', { username: 1, name: 1 })
  
    //  { new: true } - Devuelve el documento actualizado (no el antiguo).
    // runValidators: true - Activa validaciones de Mongoose durante la actualización.
    // context: 'query' - Necesario para que ciertas validaciones funcionen bien en updates.
    // .populate('user', { username: 1, name: 1 }) - Esto hace que en lugar de devolverte solo el user como ID, te devuelva el objeto completo con los campos username y name.
    
    response.json(blogUpdated)
    logger.info('Blog updated: ', blogUpdated)

  } catch (error) {
    next(error)    
  }
})


//adding a comment with params (blog) 
blogsRouter.post('/:id/comments', async (request, response, next) => {

  try {

    const idBlog = request.params.id
    const { comment } = request.body

    console.log('Blog object: ', idBlog)
    console.log('Blog object: ', comment)
  
    if ( !comment ){
      return response.status(400).json({
        error: 'Bad Request: Comment missing'
      })
    }

    const blogObject = await BlogDB.findById(idBlog)
    console.log('Blog object: ', blogObject)

    if (!blogObject){
      return response.status(400).json({
        error: 'Bad Request: Blog not found'
      })
    }

    if ( !blogObject.comments ){
      blogObject.comments = []
    }
    
    const commentObject = new CommentDB({
      comment,
      blog : blogObject._id
    })

    const savedComment = await commentObject.save()

    blogObject.comments = blogObject.comments.concat(savedComment._id)
    await blogObject.save()

    logger.info('Comment added: ', savedComment)
    response.status(201).json(savedComment)
   
  } catch (error) {
    next(error)
  }
})

module.exports = blogsRouter