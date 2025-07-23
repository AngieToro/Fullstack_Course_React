import { createNote } from '../reducers/noteReducer'
import { useDispatch } from 'react-redux'
//import NoteService from '../services/notes'

const NewNote = ( ) => {

  const dispatch = useDispatch()

  const addNote = async( event ) => {

    event.preventDefault()

    const content = event.target.note.value
    event.target.note.value = ''

    //const newNote = await NoteService.create(content)
    //dispatch (createNote(newNote))

    dispatch(createNote(content))
  }

  return (

    <form onSubmit={ addNote }>
      Content
      <input name="note" />
      <button type="submit"> Add note</button>
    </form>
  )
}

export default NewNote