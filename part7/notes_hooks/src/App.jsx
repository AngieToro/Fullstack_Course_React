import { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  console.log('Resources: ', resources)

  const getAll = async () => {
      
      try {
        const response = await axios.get(baseUrl)
        setResources(response.data)
        console.log('Notes: ', response.data)

      } catch (error) {
        console.error('Error fetching data: ', error)
      }
    }

  useEffect(() => {
    getAll()
  }, [baseUrl])
  

  const create =  async(resource) => {

    console.log('Create: ', resource)

    try {

      const response = await axios.post(baseUrl, resource)
      await getAll()
      return response.data
    } catch (error) {
      console.error('Error adding data: ', error);
    } 
  }

  const service = {
    getAll, 
    create
  }

  return [
    resources, service
  ]
}

const App = () => {
  const content = useField('text')
  const name = useField('text')
  const number = useField('text')

  const [notes, noteService] = useResource('http://localhost:3005/notes')
  const [persons, personService] = useResource('http://localhost:3005/persons')
  
  const handleNoteSubmit = (event) => {
    event.preventDefault()

    const lastId = notes.length > 0
      ? Math.max(...notes.map(note => note.id))
      : 0
    const newId = lastId + 1

    const newObject = {
      content: content.value,
      id: newId
    }

    noteService.create( newObject )
  }
 
  const handlePersonSubmit = (event) => {
    event.preventDefault()

    const lastId = persons.length > 0
      ? Math.max(...persons.map(person => person.id))
      : 0
    const newId = lastId + 1

    const newObject = {
      name: name.value,
      number: number.value,
      id: newId
    }
    personService.create( newObject )
  }

  return (
    <div>
      <h2>Notes</h2>
      <form onSubmit={handleNoteSubmit}>
        Content: 
        <input {...content} />
        <button>Create</button>
      </form>

      <h3>Notes List </h3>
      {notes.map(n => <p key={n.id}>{n.content}</p>)}

      <h2>Persons</h2>
      <form onSubmit={handlePersonSubmit}>
        Name:  <input {...name} /> <br/>
        Number:  <input {...number} />
        <button>Create</button>
      </form>

      <h3>Persons List </h3>
      {persons.map(n => <p key={n.id}>{n.name} - {n.number}</p>)}
    </div>
  )
}

export default App