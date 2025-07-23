import { useState, useEffect } from 'react'
import PersonsService from './services/persons'
import PersonShow from './components/PersonShow'
import PersonForm from './components/PersonForm'
import FindPerson from './components/FindPerson'
import Notification from './components/Notification'

const App = () => {

const [persons, setPersons] = useState(null)
const [newPerson, setNewPerson] = useState('')
const [newNumber, setNewNumber] = useState('')
const [find, setFind] = useState('')
const [messageSuccess, setMessageSuccess] = useState(null)
const [messageError, setMessageError] = useState(null)
  
  const hook = () => {
    console.log('Effect');
    PersonsService
      .getAll()
      //then controlado de eventos que permite acceder a los datos 
      .then(initialPersons => {
        setPersons(initialPersons)
        console.log('Persons: ', initialPersons);    
      })
    }

  //[], The effect only runs together with the first render of the component
  //Specify how often the effect runs.
  //The principle is that the effect always runs after the first rendering of the component and when the value of the second parameter changes
  useEffect(hook, [])
  
  //Do not render anything if notes are still null
  if (!persons) {
    return null
  }
  
  console.log('Render: ', persons.length, 'contacts');

  const showMessage = (type, text) => {
    if (type === 'success'){
      setMessageSuccess(text)
      setTimeout(() => setMessageSuccess(null), 5000)
    } else if (type === 'error'){
      setMessageError(text)
      setTimeout(() => setMessageError(null), 5000)
    }
  }

  const addContact = (event) => {
    event.preventDefault() 

    const duplicatedPerson = persons.some(person => person.name.toLowerCase() === newPerson.toLowerCase()
    )

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
            console.error('Error to update or refresh:', error)
            //alert(`Failed to update the contact ${newPerson}`)
            setPersons(persons.filter(person => person.id !== findPerson.id))
            showMessage('error', `Information of ${newPerson} has already been updated from server`)
          })
        }
      
    return    //stay in the update if newName = Name if not then create
      
    } 
    
    const personObject = {
      name: newPerson,
      number: newNumber
    }

    PersonsService
      .create(personObject)
      .then(returnedPerson => {
        console.log('New Person: ', returnedPerson)
        setPersons(persons.concat(returnedPerson))
        showMessage('success', `Added ${returnedPerson.name}`)
        setNewPerson('')
        setNewNumber('')
      })

      console.log('Final Persons: ', persons);
    }

  const contactsToShow = find 
    ? persons.filter (person => 
      person.name.toLowerCase().includes(find.toLowerCase())) 
    :persons

  const toggleDeleteOf = (id, name) => {
    console.log('ID Delete: ', id);

    if (window.confirm(`Are you sure you want to delete this contact ${name} ?`)){
      PersonsService
        .deleteId(id)
        .then(returnedPerson => {
          console.log('Deleted Person: ', returnedPerson)
          setPersons(persons.filter(person => person.id !== id))
          showMessage('success', `Deleted ${returnedPerson.name}`)
        })
        .catch(error => {
          console.error('Error to delete or refresh:', error)
          //alert(`This contact ${name} was already deleted from the server`)
          setPersons(persons.filter(person => person.id !== id))
          showMessage('error', `Information of ${name} has already been removed from server`)
        })
    }
  }
 
  const handlePersonChange = (event) => {
    setNewPerson(event.target.value)
  }  

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }  

  const handleFindChange = (event) => { 
    setFind(event.target.value)
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