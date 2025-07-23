const mongoose = require('mongoose')

if (process.argv.length < 3){
  console.log('Give password as argument') 
  process.exit(1)
}

const user = 'fullstackopen'
const password = process.argv[2]
const dataBase = 'phonebookApp'

console.log('Parameter password: ', password)

const url = `mongodb+srv://${user}:${password}@cluster0.ekqywow.mongodb.net/${dataBase}?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const contactSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Contact = mongoose.model('Contact', contactSchema)

const name = process.argv[3]
console.log('Parameter Name: ', name)

const number = process.argv[4]
console.log('Parameter Number: ', number)

const contactObject = new Contact({
  name: name,
  number: number
})

console.log('Object contact: ', contactObject)
/*
contactObject
    .save()
    .then( result => {
        console.log('Contact saved in database: ', result)
    })
    .catch(error => {
       console.log('Error adding the contact: ', error)
    })
    .finally(() => {
        mongoose.connection.close()
    })
*/
if (!name && !number) {
 
  Contact   
    .find({})
    .then(result => {
      console.log('Phonebook:')
        
      result.forEach(contact => {
        console.log(`${contact.name} - ${contact.number}`)
      })
    })
    .catch(error => {
      console.log('Error finding the contact: ', error)
    })
    .finally(() => {
      mongoose.connection.close()
    })
}