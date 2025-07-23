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

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength:5,
    require: [true, 'User name required']
  },
  number: {
    type: String,
    validate: {
      validator: function(v) {
        return /\d{2}-\d{4}/.test(v)
      },
      message: props => `${props.value} is not a valid phone number! Ex: 12-1234`
    },
    required: [true, 'User phone number required']
  }
})

contactSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()

    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Contact', contactSchema)
