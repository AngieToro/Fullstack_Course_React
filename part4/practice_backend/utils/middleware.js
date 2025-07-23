const logger = require('./logger')

// Middleware para log de requests
const requestLogger = (request, response, next) => {
  logger.info('Method: ', request.method)
  logger.info('Path: ', request.path)
  logger.info('Body: ', request.body)
  logger.info('--------------')
  next()
}

//capturar solicitudes realizadas a rutas inexistentes
const unknownEndpoint = (reques, response) => {
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

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler
}