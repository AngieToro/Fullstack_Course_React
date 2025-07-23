const Note = require('../models/note')
const User = require('../models/user')

const initialNotes = [
  { content: 'HTML is easy', important: true },
  { content: 'Test...', important: true },
  { content: 'Test Refractor', important: true },
  { content: 'Hello', important: false },
  { content: 'Apple', important: true }
]

const nonExisingId = async () => {

  const note = new Note ({
    content: 'aaaa'    
  })

  await note.save()
  await note.deleteOne()

  return note._id.toString()
}

const notesInDB = async () => {
    
  const notes = await Note.find({})
    
  return notes.map(note => note.toJSON()) 
}

const usersInDB = async () => {

  const users = await User.find({})

  return users.map(user => user.toJSON())
}

module.exports = {
  initialNotes,
  nonExisingId,
  notesInDB,
  usersInDB
}