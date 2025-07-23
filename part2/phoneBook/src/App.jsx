import { useState } from 'react'
import PersonShow from './components/PersonShow'
import PersonForm from './components/PersonForm'
import FindPerson from './components/FindPerson'

const App = () => {
  
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newPerson, setNewPerson] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [find, setFind] = useState('')

  const addContact = (event) => {
    event.preventDefault() 

    const duplicatedPerson = persons.some(person => person.name.toLowerCase() === newPerson.toLowerCase()
    )

    if (duplicatedPerson){
      alert(`${newPerson} is already added to the phonebook`)
      return
    }

    const personObject = {
      name: newPerson,
      number: newNumber,
      id: persons.length + 1
    }

    console.log('New Person: ', personObject)
    setPersons(persons.concat(personObject))
    setNewPerson('')
    setNewNumber('')

    console.log('Final Persons: ', persons);
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
  const contactsToShow = find 
    ? persons.filter (person => 
      person.name.toLowerCase().includes(find.toLowerCase())) 
    :persons

  return (
    <div>
       <h1>Phonebook</h1>
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
          <PersonShow key={person.id} person={person} />
        )}
      </ul>
    </div>
  )
}

export default App