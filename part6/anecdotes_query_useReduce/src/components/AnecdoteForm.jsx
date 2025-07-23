import { useMutation, useQueryClient } from '@tanstack/react-query'
import { create } from '../services/anecdote'
import { useNotificationDispatch, setNotification } from '../NotificationContext'

const AnecdoteForm = () => {

  const dispatch = useNotificationDispatch()

  const queryClient = useQueryClient()
 
  const newAnecdoteMutation = useMutation({
    mutationFn: create,
    onSuccess: ( newAnecdote ) => {
      const anecdote = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(
        ['anecdotes'],
        anecdote.concat(newAnecdote)
      )
      setNotification(dispatch,`The anecdote ${ newAnecdote.content } was created`,5)
    },
    onError : ( error ) => {
      const errorMessage = error.response?.data?.error
        || error.message || 'An unexpected error occurred'
      
      setNotification(dispatch, errorMessage ,10)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

    newAnecdoteMutation.mutate({
      content,
      votes: 0
    })

    console.log('new anecdote')
}

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
