import { useState } from 'react'
//Tienes su propio estado local:
//NoteAddForm solo necesita saber cómo llamar a createNote, no qué hace por dentro.
const NoteAddForm = ( { createNote } ) => {

  const [newNote, setNewNote] = useState('')

  //La propiedad target del objeto de evento ahora corresponde al elemento input controlado y event.target.value se refiere al valor de entrada de ese elemento.
  const handleNewNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  //Adding note
  //El hijo (form) NO maneja directamente la petición al backend.
  //Solo junta los datos y pide al padre que lo maneje.
  const handleAddNote = (event) => {

    event.preventDefault() // evitar el comportamiento por defecto de un evento del navegador (recargando la pagina) entonces permite controlar con el propio código

    try {
      createNote ({
        content: newNote,
        import: true
      })

      setNewNote('')

    } catch (error) {
      console.log('Error adding a note: ', error)
    }
  }

  return (
    <div className='formDiv'>
      <h2>Create a new Note</h2>
      <form onSubmit={ handleAddNote }>
        <div>
          Content:
          <input
            value={ newNote }
            onChange={ handleNewNoteChange }
            placeholder='Write note content here'
            id='content-input'
          />
        </div>
        <div>
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  )
}

export default NoteAddForm