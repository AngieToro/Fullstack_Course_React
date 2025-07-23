require('dotenv').config()
const notesRouter = require('express').Router()
const NoteDB = require('../models/note')
const UserDB = require('../models/user')
const logger = require('../utils/logger')
const jwt = require('jsonwebtoken')

const getToken = ( request ) => {

  const authorization = request.get('authorization')
  console.log('authorization: ', authorization)  

  if (authorization && authorization.startsWith('Bearer ')){
    return authorization.replace('Bearer ', '')
  }

  return null
}

//finding all notes
notesRouter.get('/', async (request, response, next) => {
  try {

    const notes = await NoteDB
      .find({})
      .populate('user', {
        username: 1,
        name: 1
      })
  
    if (notes){
      response.json(notes)
      logger.info('Notes: ', notes)
    } else {
      logger.error('Error finding notes')
      response.status(404).end()
    } 

  } catch (error) {
    next(error)
  }
   
})

//finding a note by id
notesRouter.get('/:id', async(request, response, next) => {

  try {
    const id = request.params.id

    const note = await NoteDB.findById(id)

    if (note){
      logger.info('Find note by id: ', note)
      response.json(note)
    } else {
      logger.error('Error finding by id')
      response.status(404).end()
    }

  } catch (error) {
    next(error)
  }  
})


///adding a note
notesRouter.post('/', async (request, response, next) => {

  try {
    const body = request.body
    
    if (!body.content){
      return response.status(400).json({
        error: 'Bad Request: Content missing'
      })
    }
    
    const token = getToken(request)
    console.log('Token: ', token)
    
    const decodedToken = jwt.verify(token, process.env.SECRET)
    console.log('Decoded token: ', decodedToken)

    //antes del token
    //const userID = body.user
    const userID = decodedToken.id
    console.log('ID del user: ', userID)

    if (!userID){
      return response.status(401).json( { error: 'Token invalid' })
    }

    const user = await UserDB.findById(userID)
    console.log('User: ', user)
    
    const noteObject = new NoteDB({
      content: body.content,
      important: body.important === undefined
        ? false
        : body.important,
      user: user.id
    })

    const savedNote = await noteObject.save()
    user.notes = user.notes.concat(savedNote._id)
    await user.save()

    logger.info('Note added: ', savedNote)
    response.status(201).json(savedNote)
  
  } catch (error) {
    next(error)
  }
})

//Deleting a note
notesRouter.delete('/:id', async(request, response, next) => {
  
  try {
    const id = request.params.id
    console.log('Delete ID: ', id)

    await NoteDB.findByIdAndDelete(id)
    response.status(204).end()
    logger.info('Note deleted')
    
  } catch (error) {
    next(error) 
  }
})

//Updating a note
notesRouter.put('/:id', async (request, response, next) => {

  try {
    
    const { content, important } = request.body
    console.log('Update body: ', request.body)

    const id = request.params.id
    console.log('Update id: ', id)
  
    const noteUpdated = await NoteDB.findByIdAndUpdate(
      id, 
      { content, important }, 
      { new: true, runValidators: true, context:'query' }
    )
    
    response.json(noteUpdated)
    logger.info('Note updated: ', noteUpdated)

  } catch (error) {
    next(error)
  }
})

module.exports = notesRouter