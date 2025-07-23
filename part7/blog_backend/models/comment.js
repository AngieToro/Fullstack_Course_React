const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true
  },
  creationDate: {
    type: Date,
    default: Date.now
  },
  blog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog'
  }
})

commentSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()

    const date = new Date(returnedObject.creationDate)

    if (!isNaN(date)){
      returnedObject.creationDate = date.toLocaleDateString('es-CL', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      })
    }

    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment