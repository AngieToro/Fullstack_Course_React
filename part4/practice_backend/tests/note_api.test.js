const { test, describe, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app') // la aplicación Express
const Note = require('../models/note')
const helper = require('./test_helper')

//las pruebas pueden usarlo para realizar solicitudes HTTP al backend.
const api = supertest(app)
/*
beforeEach(async() => {
  await Note.deleteMany({})
  await Note.insertMany(helper.initialNotes)
})
*/

//inserta en BD como sea
beforeEach(async () => {
  await Note.deleteMany({})

  const noteObjects = helper.initialNotes
    .map(note => new Note(note))
  const promiseArray = noteObjects.map(note => note.save())

  //transformar una serie de promesas en una única promesa, que se cumplirá una vez que se resuelva cada promesa en el array que se le pasa como argumento
  await Promise.all(promiseArray)
})

//inserta en la BD en un orden estricto
/*
beforeEach(async () => {
  await Note.deleteMany({})

  for (let note of helper.initialNotes) {
    let noteObject = new Note(note)
    await noteObject.save()
  }
})
  */

describe('API note search test', () => {

  test('notes are returned as json', async() => {

    await api
      .get('/api/notes')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all notes are returned', async() => {
    
    const response = await helper.notesInDB()
    
    assert.strictEqual(response.length, helper.initialNotes.length)

  })

  test('a specific note is within the returned  notes', async() => {
    
    const response = await helper.notesInDB()
    
    const notes = response.map(note => note.content)
    
    assert(notes.includes('HTML is easy'))
  })

  test('a specific note can be viewed', async () => {

    const notesAll = await helper.notesInDB()

    const noteToView = notesAll[0] 
    
    const resultNote = await api
      .get(`/api/notes/${noteToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.deepStrictEqual(resultNote.body, noteToView)

  })
})

describe('API note add test', () => {

  //prueba que agregue una nueva nota y verifique que la cantidad de notas devueltas por la API aumenta y que la nota recién agregada esté en la lista.
  test('a valid note can be added ',async() => {

    const newNote = {
      content: 'async/await simplifies making async calls',
      important: true
    }

    await api
      .post('/api/notes')
      .send(newNote)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const notesAll = await helper.notesInDB()

    assert.strictEqual(notesAll.length, helper.initialNotes.length + 1)

    const notes = notesAll.map(note => note.content)

    assert(notes.includes('async/await simplifies making async calls'))

  })

  test('note without content is not added', async() => {

    const newNote = {
      important: true
    }

    await api
      .post('/api/notes')
      .send(newNote)
      .expect(400)

    const response = await helper.notesInDB()

    assert.strictEqual(response.length, helper.initialNotes.length)

  })

})
 

describe('API delete test', () => { 

  test('a note can be deleted', async() => {

    const notesAll = await helper.notesInDB()

    const noteToDelete = notesAll[0]
    console.log('Note to delete: ', noteToDelete.title) 
    
    await api
      .delete(`/api/notes/${noteToDelete.id}`)
      .expect(204)
  
    const notesAllAfterDelete = await helper.notesInDB()

    const notes = notesAllAfterDelete.map(note => note.content)
    assert(!notes.includes(noteToDelete.content))
      
    assert.strictEqual(notesAllAfterDelete.length, helper.initialNotes.length - 1)
  })
})

after(async () => {
  await mongoose.connection.close()
})

