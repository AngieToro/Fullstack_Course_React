const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/user')


// Middleware para log de requests
const requestLogger = (request, response, next) => {
  logger.info('Method: ', request.method)
  logger.info('Path: ', request.path)
  logger.info('Body: ', request.body)
  logger.info('--------------')
  next()
}

//capturar solicitudes realizadas a rutas inexistentes
const unknownEndpoint = (request, response) => {
  response.status(400).send({
    error: 'Bad Request - Unknown Endpoint'
  })
}

const errorHandler = (error, request, response, next) => {
  
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'Bad Request - Malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).send( { error: error.message } )
  } else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
    return response.status(400).json({ error: 'expected `username`to be unique' })
  } else if (error.name === 'JsonWebTokenError'){
    return response.status(401).json({ error: 'Token invalid' })
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({ error: 'Token expired' })
  }

  next(error)
}

const tokenExtractor = (request, response, next) => {

  const authorization = request.get('authorization')
  console.log('authorization: ', authorization)  

  if (authorization && authorization.startsWith('Bearer ')){
    request.token = authorization.replace('Bearer ', '')
  } else {
    request.token = null
  }

  next()
}

const userExtractor = async(request, response, next) => {
  
  try {
    //se obtiene de tokenExtractor
    const token = request.token
    console.log('Token: ', token)  

    
    if (!token){
      return response.status(401).json({ error: 'Token missing' })
    }

    const decodedToken = jwt.verify(token, process.env.SECRET)
    console.log('Decoded token: ', decodedToken)

    const userID = decodedToken.id
    console.log('User ID: ', userID)

    if (!userID){
      return response.status(401).json( { error: 'Token invalid' })
    }

    request.user = await User.findById(userID)
    console.log('User: ', request.user)

    next()

  } catch (error) {
    next(error)
  }
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
}