import { useState, useEffect } from 'react'
import Note from "./components/Note"
import NoteServices from "./services/notes"
import Notification from "./components/Notification"
import Footer from "./components/Footer"

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  //const [errorMessage, setErrorMessage] = useState('Some error happened...')
  const [errorMessage, setErrorMessage] = useState(null)

  const hook = () => {
    console.log('Effect');
    NoteServices
      .getAll()
      //then controlado de eventos que permite acceder a los datos 
      .then(initialNotes => {
        setNotes(initialNotes)
        console.log('Notes: ', notes);      
      })
    }

  useEffect(hook, [])
  //[], el efecto solo se ejecuta junto con el primer renderizado del componente.

  console.log('Render: ', notes.length, 'notes');
  
  //La propiedad target del objeto de evento ahora corresponde al elemento input controlado y event.target.value se refiere al valor de entrada de ese elemento.
  const handleNoteChange = (event) => {
    console.log('Handle Note Change: ', event.target.value)
    setNewNote(event.target.value)
  }

  //Adding note
  const addNote = (event) => {
    event.preventDefault() // evitar el comportamiento por defecto de un evento del navegador (recargando la pagina) entonces permite controlar con el propio código
    //console.log('Button clicked', event.target);
    const noteObject = {
      content: newNote,
      import: Math.random() < 0.5
    }
    console.log('Objeto Nuevo: ', noteObject)

    NoteServices
      .create(noteObject)
      .then(returnedNote => {
        console.log('Response post: ', returnedNote);
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })

    console.log('Final Notes: ', notes);
  }

  //Finding notes
  const notesToShow = showAll
  ? notes
  : notes.filter(note => note.important)
   
  //Update note
  const toggleImportanceOf = (id) => {
  
    console.log(`Importance of ${id} need to be toggled`);

    const note = notes.find(n => n.id === id)
    const changedNote = {...note, important: !note.important}
    //copia exacta de la nota anterior, excepto por la propiedad important que tiene su valor cambiado (de true a false o de false a true).
    NoteServices
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note: returnedNote))
      })
      .catch(error => {
        //alert(`The note '${note.content}' was already deleted from server`)
        setErrorMessage(
          `Note ${note.content} was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        console.log('Error: ', error)
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  //Deleting a note
  const toggleDeleteOf = (id, content) => {
    console.log('ID Delete: ', id);

    if (window.confirm(`Are you sure you want to delete this note ${content} ?`)){
      NoteServices
        .deleteId(id)
        .then(() => {
          setNotes(notes.filter(note => note.id !== id))
          setErrorMessage(`Note ${content} was deleted`)
        })
        .catch(error => {
          console.error('Error to delete or refresh:', error)
          setNotes(notes.filter(note => note.id !== id))
          setErrorMessage(`Information of ${content} has already been removed from server`)
        })
    }
  }
     
  return (
    <div>
      <h1>All Notes</h1>
      <ul>
        {notes.map(note => 
          <Note key={note.id} note={note} />
        )}
      </ul>   
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange}></input>
        <button type="submit">Save</button>
      </form>
      <Notification message={errorMessage} />
      <p>
        <button onClick={() => setShowAll(!showAll)}>
          Show {showAll ? 'important' : 'all'}
        </button>
      </p>
      <h1>{showAll ? 'Important' : 'All'} Notes</h1>
      <ul>
        {notesToShow.map(note => 
          <Note 
            key={note.id} 
            note={note} 
            toggleImportance={() => toggleImportanceOf(note.id)}
            toggleDelete={() => toggleDeleteOf(note.id, note.content)}
          />
        )}
      </ul>
      <Footer />
    </div>
  )
}

export default App