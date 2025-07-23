import { createAcnedote } from '../reducers/acnedotesReducer'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/acnedotesNotification'

const AnecdoteForm = () => {

  const dispatch = useDispatch()

  const addAcnedote = async ( event ) => {

    event.preventDefault()

    const acnedote = event.target.acnedote.value
    event.target.acnedote.value = ''

    dispatch (createAcnedote(acnedote))
    
    dispatch(setNotification(`Acnedote ${acnedote} was added`,5))
  }

  return (

    <form onSubmit={ addAcnedote }>
      Acnedote
      <input name="acnedote" />
      <button type="submit"> Add Acnedote</button>
    </form>
  )
}

export default AnecdoteForm