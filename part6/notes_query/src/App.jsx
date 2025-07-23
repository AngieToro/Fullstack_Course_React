import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAll, create, update } from './services/notes'

const App = () => {

  const queryClient = useQueryClient()
 
  const newNoteMutation = useMutation({
    mutationFn: create,
    //se ejecuta después de que la mutación fue exitosa.
    //el parametro es la respuesta del servidor, o lo que create() devolvió.
    onSuccess: ( newNote ) => {
      //Obtiene del caché las notas actuales que ya estaban almacenadas 
      const notes = queryClient.getQueryData(['notes'])
      //Actualiza manualmente la caché de ['notes'] agregando la nueva nota al array anterior.
      queryClient.setQueryData(
        ['notes'],
        notes.concat(newNote)
      )
    }
  })

  const updateNoteMutation = useMutation({
    mutationFn: update,
    onSuccess: ( updateNote ) => {
      const notes = queryClient.getQueryData(['notes'])
      queryClient.setQueryData(
        ['notes'],
        notes.map(note => note.id === updateNote.id
          ? updateNote
          : note
        )
      )
    }
  })

   // la aplicación recupera datos del servidor y los renderiza en la pantalla sin usar los Hooks de React useState y useEffect. Los datos en el servidor ahora están completamente bajo la administración de la librería React Query
  const result = useQuery({
    queryKey: ['notes'],
    queryFn: getAll,
    refetchOnWindowFocus: false
  })

  console.log('Data: ', JSON.parse(JSON.stringify(result)))

  if (result.isLoading){
    return <div> Loading data...</div>
  }

  const notes = result.data

  const addNote = async (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
    console.log(content)

    newNoteMutation.mutate({
      content,
      important: false
    })
  }

  const toggleImportance = (note) => {

    updateNoteMutation.mutate({
      ...note,
      important: !note.important
    })
  }

  return(
    <div>
      <h1>Notes App</h1>
      <form onSubmit={addNote}>
        Note: 
        <input name="note" />
        <button type="submit">add</button>
      </form>
      <h2>Notes List</h2>
      {notes.map(note =>
        <li key={note.id} onClick={() => toggleImportance(note)}>
          {note.content} 
          <strong> {note.important ? 'important' : ''}</strong>
        </li>
      )}
    </div>
  )
}

export default App