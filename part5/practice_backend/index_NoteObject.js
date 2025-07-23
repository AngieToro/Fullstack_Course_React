//const http = require('http') 
// pra creacion de servidor web manual 
// importa el módulo de servidor web integrado de Node... LO mismo import http from 'http'

const express = require('express')
const cors = require('cors')

const app = express()
const PORT = 3001

//Activar json-parser e implementar un controlador inicial para manejar las solicitudes HTTP POST
//El json-parser funciona para que tome los datos JSON de una solicitud, los transforme en un objeto JavaScript y luego los adjunte a la propiedad body del objeto request antes de llamar al controlador de ruta
app.use(express.json())
app.use(cors())

let notes = [
  {
    id: 1,
    content: 'HTML is easy',
    important: true
  },
  {
    id: 2,
    content: 'Browser can execute only JavaScript',
    important: false
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of HTTP protocol',
    important: true
  }
]

const requestLooger = (request, response, next) => {
  console.log('Method: ', request.method)
  console.log('Path: ', request.path)
  console.log('Body: ', request.body)
  console.log('--------------')
  next()
}

app.use(requestLooger)
//controlador de eventos, que se utiliza para manejar las solicitudes HTTP GET realizadas a la raíz / de la aplicación
app.get('/', (request, response) => {
  response.send('<h1> Hello Wolrd </h1>')
})

app.get('/api/notes', (request, response) => {
  response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  console.log('Param id: ', id)
    
  const note = notes.find(note => {
    console.log(note.id, typeof note.id, id, typeof id, note.id === id)
      
    return note.id === id
  })
  console.log('Find note id: ', note)
    
  if (note){
    response.json(note)
  } else {
    response.status(404).end()
  }
})

const generateId = () => {

  const maxId = notes.length > 0 ?
    Math.max(...notes.map(n => n.id)) : 
    0
  console.log('Max Id: ', maxId)
  return maxId + 1
}

app.post('/api/notes', (request, response) => {

  const body = request.body

  if (!body.content){
    return response.status(400).json({
      error: 'Content missing'
    })
  }

  const note = {
    content: body.content,
    important: Boolean(body.important) || false,
    id : generateId()
  }

  console.log('Note added: ', note)

  notes = notes.concat(note)
  response.json(note)
})

app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter(note => note.id !== id)

  response.status(204).end()
})

//capturar solicitudes realizadas a rutas inexistentes
const unknownEndpoint = (reques, response) => {
  response.status(400).send({
    error: 'Unknown Endpoint'
  })
}

app.use(unknownEndpoint)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

/* creacion de servidor web manual
const app = http.createServer((request, response) => {
    //response.writeHead(200, {'content-type': 'text/plain'})
    response.writeHead(200, {'content-type': 'application/json'})
    response.end(JSON.stringify(notes)) //espera un string o un buffer

app.listen(PORT)
console.log(`Server running on port ${PORT}`);

})*/