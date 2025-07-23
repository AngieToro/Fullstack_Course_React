require('dotenv').config()
const express = require('express')
const cors = require('cors')
const NoteDB = require ('./models/note')

const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use(cors())

// Middleware para log de requests
const requestLooger = (request, response, next) => {
  console.log('Method: ', request.method)
  console.log('Path: ', request.path)
  console.log('Body: ', request.body)
  console.log('--------------')
  next()
}
app.use(requestLooger)

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
  }

  next(error)
}

app.get('/', (request, response) => {
  response.send('<h1> Hello Wolrd </h1>')
})

///finding all notes
app.get('/api/notes', (request, response) => {
  NoteDB  
    .find({})
    .then(notes => {
      response.json(notes)
      console.log('Notes: ', notes)
    })
    .catch(error => {
      console.log('Error finding notes: ', error)
      response.status(404).send( { error: 'Not Found - Error finding notes' } )
    })
})

///finding a note by id
app.get('/api/notes/:id', (request, response, next) => {
   
  const id = request.params.id
  console.log('ID: ', id)

  NoteDB
    .findById(id)
    .then(note => {
      if (note){
        console.log('Find note by id: ', note)
        response.json(note)
      } else {
        response.status(404).send( { error: 'Not Found - Error finding notes by id' } )
      }
    })
    .catch(error => next(error))
})

///adding a note
app.post('/api/notes', (request, response, next) => {

  const body = request.body
  console.log('Body: ', body)
  
  if (!body.content){
    return response.status(400).json({
      error: 'Bad Request: Content missing'
    })
  }

  const noteObject = new NoteDB({
    content: body.content,
    important: body.important || false
  })

  console.log('Note added: ', noteObject)

  noteObject
    .save()
    .then(note => {
      response.json(note)
    })
    .catch(error => next(error))
})

//Deleting a note
app.delete('/api/notes/:id', (request, response, next) => {
  const id = request.params.id
  console.log('Delete ID: ', id)

  NoteDB
    .findByIdAndDelete(id)
    .then(result => {
      response.status(204).end()
      console.log('Note deleting: ', result)
    }) 
    .catch(error => next(error))
})

//Updating a note
app.put('/api/notes/:id', (request, response, next) => {

  const { content, important } = request.body
  
  const id = request.params.id
  console.log('Update id: ', id)
  
  NoteDB
    .findByIdAndUpdate(
      id, 
      { content, important }, 
      { new: true, runValidators: true, context:'query' })
    .then(result => {
      response.json(result)
      console.log('Note update: ', result)
    })
    .catch(error => next(error))
})

app.use(unknownEndpoint)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})