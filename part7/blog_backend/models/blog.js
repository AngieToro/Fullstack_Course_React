const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: { 
    type: String,
    minLength: 5,
    required: true
  },
  author: { 
    type: String,
    minLength: 5,
    required: true
  },
  url: { 
    type: String,
    minLength: 5,
    required: true
  },
  likes: {
    type: Number,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  comments: 
    [
      {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Comment'
      }
    ]
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString() //añade el id

    delete returnedObject._id                         //quita el _id
    delete returnedObject.__v                         //quita el _ _v
  }
})

module.exports = mongoose.model('Blog', blogSchema)