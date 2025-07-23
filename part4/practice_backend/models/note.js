const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
  content: { 
    type: String,
    minLength: 5,
    required: true
  },
  important: Boolean,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

//el resultado de la base de datos devuelve en la data de cada documento un  __v: 0, se quiere quitar del resultado final
//Tambien se quita _id ya que esa propiedad en realidad es un objeto de Mongoose aunque parezca un string. El método toJSON lo transforma en un string solo para estar seguros
noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()

    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Note =  mongoose.model('Note', noteSchema)
module.exports = Note