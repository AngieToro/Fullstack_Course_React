import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAll, update } from './services/anecdote'
import { useNotificationDispatch, setNotification } from './NotificationContext'

const App = () => {

  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()

   const updateAnecdoteMutation = useMutation({
    mutationFn: update,
    onSuccess: ( updateAnecdote ) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(
        ['anecdotes'],
        anecdotes.map(anecdote => anecdote.id === updateAnecdote.id
          ? updateAnecdote
          : anecdote
        )
      )
      setNotification(dispatch,`The anecdote ${ updateAnecdote.content } was voted`,5)
    }
  })

  const handleVote = (anecdote) => {
    console.log('vote')

    updateAnecdoteMutation.mutate({
      ...anecdote,
      votes: anecdote.votes + 1
    })
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAll,
    refetchOnWindowFocus: false,
    retry: 3 //si no se quieren reintreros y dar error se pone false
  })

  console.log('Data: ', JSON.parse(JSON.stringify(result)))

  if (result.isLoading){
    return <div> Loading data...</div>
  }

  if (result.isError){
    return <div>Anecdote service not available due to problem in server</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h1>Anecdote app</h1>
    
      <Notification />
      <AnecdoteForm />
    
      <h2>Anecdote List</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            <strong> { anecdote.content} </strong> 
            has { anecdote.votes} votes 
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
