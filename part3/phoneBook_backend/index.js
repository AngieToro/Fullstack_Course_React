require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const ContactDB = require ('./models/person')

const app = express()
const PORT = process.env.PORT

//json-parser
app.use(express.json())
//aceptar solicitudes desde cualquier lado
app.use(cors())

const requestLooger = (request, response, next) => {
  console.log('-----LOG-----')
  console.log('Method: ', request.method)
  console.log('Path: ', request.path)
  console.log('Body: ', request.body)
  console.log('----------')
  next()
}

// controlador de solicitudes con endpoint desconocido
const unknownEndpoint = (reques, response) => {
  response.status(400).send({
    error: 'Bad Request - Unknown Endpoint'
  })
}

// controlador de solicitudes que resulten en errores
const errorHandler = (error, request, response, next) => {
  console.error('Error: ', error.message)
  
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'Bad Request - Malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message })
  }
  next(error)
}

app.use(requestLooger)

app.use(morgan ((tokens, req, res) => {
  const log = [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms'
  ].join(' ')

  if (req.method === 'POST') {
    return `${log} - body: ${JSON.stringify(req.body)}`
  }

  return log
}))

app.get('/', (request, response) => {
  response.send('<h1> Hello Wolrd </h1>')
})

//Getting Info
app.get('/info', (request, response) => {

  ContactDB
    .countDocuments({})
    .then(count => {
      console.log('Count contacts: ', count)
      
      const message = `Phonebook has info for ${count} people`

      const now = new Date()
      console.log('Date: ', now)

      response.send(
        `<p> ${message} </p>
         <p>${now}</p>`
      )
    })  
    .catch(error => {
      console.log('Error counting contacts: ', error)
      response.status(404).send({ error: 'Not Found - Error counting contacts' })
    })
})

///Finding all contacts
app.get('/api/persons', (request, response) => {
  ContactDB
    .find({})
    .then(contact => {
      if (contact){
        response.json(contact)
        console.log('All contacts: ', contact)
      } else {
        response.status(400).send({ error: 'Bad Request - Error finding contacts' })
      }
    })  
    .catch(error => {
      console.log('Error finding contacts: ', error)
      response.status(400).send({ error: 'Bad Request - Error finding contacts' })
    })
})

//Finding contact for id
app.get('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  console.log('Param id: ', id)
    
  ContactDB
    .findById(id)
    .then(contact => {
      if (contact) {
        response.json(contact)
        console.log('Contact by id: ', contact)
      } else {
        response.status(404).send({ error: 'Not Found - Error adding a contact by id' })
      }})
    .catch(error => next(error))
})

//Adding a contact
app.post('/api/persons', (request, response, next) => {

  const body = request.body
  console.log('Body: ', body)
  
  if (!body.name  || !body.number){
    return response.status(400).json({
      error: 'Bad Request - Data missing'
    })
  }

  const personObject = new ContactDB({
    name: body.name,
    number: body.number
  })
  console.log('Person added: ', personObject)

  personObject
    .save()
    .then(contact => {
      response.json(contact)
      console.log('Contacts: ', contact)
    })
    .catch(error => next(error))
})

///Deleting a contact
app.delete('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  console.log('Delete id: ', id)

  ContactDB
    .deleteOne({ _id: id })
    .then(contact => {
      if (contact.deletedCount === 0){
        return response.status(404).send({ error: 'Contact not found' })
      }
      response.status(204).end()
      console.log('Contact deleting: ', contact)
    })
    .catch(error => next(error))
})

//Updating a contact
app.put('/api/persons/:id', (request, response, next) => {

  const id = request.params.id
  console.log('Update id: ', id)

  const { name, number } = request.body
 
  ContactDB
    .findByIdAndUpdate(
      id, 
      { name, number }, 
      { new: true, runValidators: true, context:'query' })
    .then(result => {
      response.json(result)
      console.log('Updated contact: ', result)
    })
    .catch(error => next(error))
})

app.use(unknownEndpoint)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})