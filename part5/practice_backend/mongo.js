//acceder al parámetro que se pasa por la línea de comando
const mongoose = require('mongoose')

if ( process.argv.length < 3 ) {
  console.log('Give password as argument')
  process.exit(1)
}

const user = 'fullstackopen'
const password = process.argv[2] //1234567890
const dataBase = 'noteApp'

const url = `mongodb+srv://${user}:${password}@cluster0.ekqywow.mongodb.net/${dataBase}?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
  content: 'HTML is easy',
  important: true
})


note
  .save()
  .then( result => {
    console.log('Note saved in database: ', result)
  })
  .catch(error => {
    console.log('Error adding the note: ', error)
  })
  .finally(() => {
    mongoose.connection.close()
  })


Note   
  .find({})
  .then(allNotes => {
    allNotes.forEach(note => {
      console.log('Note: ', note)
    })

    return Note.find( { important: false } )
  })
  .then(importantNotes => {
    importantNotes.forEach(note => {
      console.log('Note important: ', note)
    })
  })
  .catch(error => {
    console.log('Error finding the note: ', error)
  })
  .finally(() => {
    mongoose.connection.close()
  })