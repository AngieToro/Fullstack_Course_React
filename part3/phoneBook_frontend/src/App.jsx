import { useState, useEffect } from 'react'
import PersonsService from './services/persons'
import PersonShow from './components/PersonShow'
import PersonForm from './components/PersonForm'
import FindPerson from './components/FindPerson'
import Notification from './components/Notification'

const App = () => {

const [persons, setPersons] = useState([])
const [newPerson, setNewPerson] = useState('')
const [newNumber, setNewNumber] = useState('')
const [find, setFind] = useState('')
const [messageSuccess, setMessageSuccess] = useState(null)
const [messageError, setMessageError] = useState(null)
  
const hook = () => {
  console.log('Effect');
  PersonsService
    .getAll()
    .then(persons => {
      setPersons(persons)
      console.log('Persons: ', persons);    
    })
  }
useEffect(hook, [])

const handlePersonChange = (event) => {
  setNewPerson(event.target.value)
}  

const handleNumberChange = (event) => {
  setNewNumber(event.target.value)
}  

const handleFindChange = (event) => { 
  setFind(event.target.value)
}
  
const showMessage = (type, text) => {
  if (type === 'success'){
    setMessageSuccess(text)
    setTimeout(() => setMessageSuccess(null), 5000)
  } else if (type === 'error'){
    setMessageError(text)
    setTimeout(() => setMessageError(null), 10000)
  }
}

const contactsToShow = find 
    ? persons.filter (person => 
      person.name.toLowerCase().includes(find.toLowerCase())) 
    :persons

//Adding or updating a contact
const addContact = (event) => {
  event.preventDefault() 

  const duplicatedPerson = persons.some(person => person.name.toLowerCase() === newPerson.toLowerCase())

  if (duplicatedPerson){
        
    if (window.confirm(`${newPerson} is already added to the phonebook, replace the old number with a new one?`)){
          
      const findPerson = persons.find(p => p.name.toLowerCase() === newPerson.toLowerCase())
      console.log('ID Person: ', findPerson.id);

      const updatePerson = {
        ...findPerson, 
        number: newNumber
      }

      console.log('Update Person: ', updatePerson);

      PersonsService
        .update(findPerson.id, updatePerson)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id !== findPerson.id ? person: returnedPerson))
          showMessage('success', `Updated ${returnedPerson.name} number`)
          setNewPerson('')
          setNewNumber('')
        })
        .catch(error => {
          const message = error.response?.data?.error || 'Unknown error'
          console.log('Error to update', message)
          
          if (error.response?.status === 404){
            showMessage('error', `Information of ${newPerson} has already been updated from server`)
            setPersons(persons.filter(person => person.id !== findPerson.id))  
          } else {
            showMessage('error', message)
          }
      })
        
      return    //stay in the update if newName = Name if not then create
    } 
  }
      
    const personObject = {
      name: newPerson,
      number: newNumber
    }

    PersonsService
      .create(personObject)
      .then(person => {
        console.log('New Person: ', person)
        setPersons(persons.concat(person))
        showMessage('success', `Added ${person.name}`)
        setNewPerson('')
        setNewNumber('')
      })
      .catch(error => {
        console.log('Error to add', error.response.data.error) 
        showMessage('error', `Error to add the contact ${error.response.data.error}`)
      })
}

//Delete Contact
const toggleDeleteOf = (id, name) => {
  console.log('ID Delete: ', id);

  if (window.confirm(`Are you sure you want to delete this contact ${name} ?`)){
    PersonsService
      .deleteId(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id))
         showMessage('success', `Deleted ${name}`)
      })
      .catch(error => {
        console.error('Error to delete or refresh:', error)
        setPersons(persons.filter(person => person.id !== id))
        showMessage('error', `Information of ${name} has already been removed from server`)
      })
  }
}

return (
  <div>
    <h1>Phonebook</h1>
    <Notification messageSuccess={messageSuccess}  messageError={messageError} />
    <h2>Find a Contact</h2>
    <FindPerson
      value={find} 
      onChange={handleFindChange}
    />
    <h2>Add a new Contact</h2>
    <PersonForm 
      onSubmit={addContact} 
      valuePerson={newPerson} 
      onChangePerson={handlePersonChange} 
      valueNumber={newNumber} 
      onChangeNumber={handleNumberChange}
    />
    <h2>Contacts</h2>
    <ul>
      {contactsToShow.map(person => 
        <PersonShow 
          key={person.id}  
          person={person} 
          toggleDelete={() => toggleDeleteOf(person.id, person.name)}/>
       )}
    </ul>
  </div>
  )
}

export default App