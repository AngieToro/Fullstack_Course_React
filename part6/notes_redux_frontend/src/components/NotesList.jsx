import { useSelector, useDispatch } from 'react-redux'
import { toggleImportanceOf } from '../reducers/noteReducer'

const NoteList = ( { note, handleClick }) => {

  return (
    <li onClick={ handleClick }>
      { note.content }
      <strong>
        { note.important
          ? ' important'
          : ''
        }
      </strong>
    </li>
  )
}

const Notes = () => {

  //permite que todos los componentes realicen cambios en el estado de Redux store.
  const dispatch = useDispatch()

  //El componente puede acceder a las notas almacenadas en el store con el hook useSelector
  const notes = useSelector ( ({ filter, notes }) => {

    console.log('List notes filtro: ', filter)
    console.log('List notes: ', notes)

    if (filter === 'ALL') {
      return notes
    }

    return filter === 'IMPORTANT'
      ? notes.filter(note => note.important)
      : notes.filter(note => !note.important)
  })


  return (
    <ul>
      { notes.map(note =>
        <NoteList
          key={ note.id }
          note={ note }
          handleClick={ () => dispatch(toggleImportanceOf(note.id)) }
        />
      )}
    </ul>
  )
}

export default Notes