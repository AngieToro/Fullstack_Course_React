import { useEffect } from 'react'
import NoteForm from './components/NoteForm'
import NotesList from './components/NotesList'
import NotesFilter from './components/NotesFilter'
//import noteService from './services/notes'
//import { setNotes } from './reducers/noteReducer'
import { useDispatch } from 'react-redux'
import { initializeNotes } from './reducers/noteReducer'

const App = ( ) => {

  const dispatch = useDispatch()

  useEffect(() => {

    dispatch(initializeNotes())
    /*
    noteService
      .getAll()
      .then( notes => dispatch(setNotes(notes)))
    */
  },[])

  return (
    <div>
      <h1>Notes</h1>
      < NoteForm />
      < NotesFilter />
      <h2>Note List</h2>
      < NotesList />
    </div>
  )
}

export default App