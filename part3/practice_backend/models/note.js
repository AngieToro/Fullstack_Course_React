require('dotenv').config()
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const user = process.env.MONGO_DB_USER
console.log('User: ', user)

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node index.js <password>')
  process.exit(1)
}

const password = process.argv[2]
console.log('Password: ', password)
 
const db = process.env.MONGO_DB_NAME
console.log('DB: ', db)

const cluster = process.env.MONGO_DB_CLUSTER
console.log('Cluster: ', cluster)

const url  = `mongodb+srv://${user}:${password}@${cluster}/${db}?retryWrites=true&w=majority`
console.log('Connecting to: ', url)

mongoose.connect(url)
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch(error => {
    console.log('Error connecting to MongoDB: ', error.message)
  })

const noteSchema = new mongoose.Schema({
  content: { 
    type: String,
    minLength: 5,
    required: true
  },
  important: Boolean
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

module.exports = mongoose.model('Note', noteSchema)