const commentsRouter = require('express').Router()
const Comment = require('../models/comment')
const Blog = require('../models/blog')
const logger = require('../utils/logger')

//finding all comments
commentsRouter.get('/', async (request, response, next) => {
  try {

    const comments = await Comment
      .find({})
      .populate('blog',{
        title: 1,
        author: 1,
        url: 1,
        likes: 1
      }) 
  
    if (comments){
      response.json(comments)
      logger.info('Comments: ', comments)
    } else {
      logger.error('Error finding comments')
      response.status(404).end()
    } 

  } catch (error) {
    next(error)
  }
   
})

//adding a comment
commentsRouter.post('/', async (request, response, next) => {

  try {

    const { comment, blog } = request.body
  
    if ( !comment ){
      return response.status(400).json({
        error: 'Bad Request: Comment missing'
      })
    }

    const blogObject = await Blog.findById(blog)
    console.log('Blog object: ', blogObject)

    if (!blogObject){
      return response.status(400).json({
        error: 'Bad Request: Blog not found'
      })
    }

    if ( !blogObject.comments ){
      blogObject.comments = []
    }
    
    const commentObject = new Comment({
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

module.exports = commentsRouter