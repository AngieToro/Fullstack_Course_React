import Note from "./components/Note"
import { useState } from "react"

const App = (props) => {

  console.log('Initial Notes: ', props);
  
  const [notes, setNotes] = useState(props.notes)  
  const [newNote, setNewNote] = useState('A new note...')
  const [showAll, setShowAll] = useState(true)
  //true muestra todo
  //false muestra las notas con important en True

  const addNote = (event) => {
    event.preventDefault() // evitar el comportamiento por defecto de un evento del navegador (recargando la pagina) entonces permite controlar con el propio código
    //console.log('Button clicked', event.target);
    const noteObject = {
      content: newNote,
      import: Math.random() < 0.5,
      id: notes.length + 1
    }

    console.log('Objeto Nuevo: ', noteObject)

    setNotes(notes.concat(noteObject))
    setNewNote('')

    console.log('Final Notes: ', notes);
  }

  const handleNoteChange = (event) => {
    console.log('Handle Note Change: ', event.target.value)
    setNewNote(event.target.value)
  }
  //La propiedad target del objeto de evento ahora corresponde al elemento input controlado y event.target.value se refiere al valor de entrada de ese elemento.

  const notesToShow = showAll
  ? notes
  : notes.filter(note => note.important)
     
  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map(note => 
          <Note key={note.id} note={note} />
        )}
      </ul>   
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange}></input>
        <button type="submit">Save</button>
      </form>
      <p>
        <button onClick={() => setShowAll(!showAll)}>
          Show {showAll ? 'important' : 'all'}
        </button>
      </p>
      <h1>{showAll ? 'Important' : 'All'} Notes</h1>
      <ul>
        {notesToShow.map(noteToShow => 
          <Note key={noteToShow.id} note={noteToShow} />
        )}
      </ul>
    </div>
  )
}

export default App