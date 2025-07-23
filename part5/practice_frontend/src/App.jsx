import { useState, useEffect, useRef } from 'react'
import Note from './components/NoteShowImportant'
import LoginForm from './components/LoginForm'
import NoteAddForm from './components/NoteAddForm'
import Togglable from './components/Togglable'
import NoteServices from './services/notes'
import LoginServices from './services/login'
import Notification from './components/Notification'
import Footer from './components/Footer'

const App = () => {

  const [notes, setNotes] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [messageSuccess, setMessageSuccess] = useState(null)
  const [messageError, setMessageError] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const noteFormRef = useRef()

  useEffect(() => {

    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')

    if (loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)

      if (user && user.token){
        setUser(user)
        NoteServices.setToken(user.token)
      }
    }
  }, [])

  useEffect(() => {
    console.log('Effect')

    if (user) {

      NoteServices
        .getAll()
        //then controlado de eventos que permite acceder a los datos
        .then(notes => setNotes(notes))
        .catch(error => {
          showMessage('error', 'Error getting notes')
          console.error('Error getting notes:', error)
        })
    }
  }, [ user ] )

  const handleLogout = () => {

    setUser(null)
    setNotes([])
    NoteServices.setToken(null)
    window.localStorage.removeItem('loggedNoteAppUser')
    showMessage('success', 'Logged out successfully')
  }

  const showMessage = (type, text) => {
    if (type === 'success'){
      setMessageSuccess(text)
      setTimeout(() => setMessageSuccess(null), 5000)
    } else if (type === 'error'){
      setMessageError(text)
      setTimeout(() => setMessageError(null), 10000)
    }
  }

  //Finding notes
  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

  //Update note
  const toggleImportanceOf = (id) => {

    console.log(`Importance of ${id} need to be toggled`)

    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }
    //copia exacta de la nota anterior, excepto por la propiedad important que tiene su valor cambiado (de true a false o de false a true).
    NoteServices
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note: returnedNote))
      })
      .catch(error => {
        //alert(`The note '${note.content}' was already deleted from server`)
        showMessage('error',`Note ${note.content} was already removed from server`)
        console.log('Error: ', error)
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  //Deleting a note
  const toggleDeleteOf = (id, content) => {
    console.log('ID Delete: ', id)

    if (window.confirm(`Are you sure you want to delete this note ${content} ?`)){
      NoteServices
        .deleteId(id)
        .then(() => {
          setNotes(notes.filter(note => note.id !== id))
          showMessage('success', `Note ${content} was deleted`)
        })
        .catch(error => {
          console.error('Error to delete or refresh:', error)
          setNotes(notes.filter(note => note.id !== id))
          showMessage('error', `Information of ${content} has already been removed from server`)
        })
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {

      const user = await LoginServices.login({
        username,
        password
      })
      console.log('User conneted: ', user)


      //crear el local storage para guardar los datos de sesion
      window.localStorage.setItem(
        'loggedNoteAppUser',
        JSON.stringify(user)
      )

      await NoteServices.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')

    } catch (error) {
      console.log('Error login: ', error)
      showMessage('error', 'Wrong credentials')
    }
  }

  const loginForm = () => (
    <div>
      <Togglable buttonLabel='Login'>
        <LoginForm
          username = { username }
          password = { password }
          handleUsernameChange = { ( { target } ) => setUsername(target.value) }
          handlePasswordChange = { ( { target }) => setPassword(target.value)}
          handleLoginSubmit = { handleLogin }
        />
      </Togglable>
    </div>
  )

  //Adding note
  const handleAddNote = async (noteObject) => {

    try {

      console.log('Note to add: ', noteObject)

      //ocultar el form luego que se haya creado la nota
      noteFormRef.current.toggleVisibility()

      const result = await NoteServices.create(noteObject)
      console.log('Note added: ', result)
      setNotes(notes.concat(result))
      showMessage('success', `Note ${result.content} was added`)

    } catch (error) {
      console.log('Error adding the note: ', error)
      showMessage('error', 'Error adding the note')
    }
  }

  //Pasar handleAddNote como prop al hijo NoteAddForm
  const noteForm = () => (
    <div>
      <Togglable buttonLabel='Create Note' ref={ noteFormRef }>
        <NoteAddForm
          createNote = { handleAddNote }
        />
      </Togglable>
    </div>
  )

  return (
    <div>
      <h1>Notes App</h1>

      <Notification
        messageSuccess={ messageSuccess }
        messageError={ messageError }
      />

      {
        user === null
          ? loginForm()
          : <div>
            <p> Welcome {user.name} </p>
            <p>
              <button onClick={handleLogout}>Logout</button>
            </p>
            { noteForm() }
            <h2>All Notes</h2>
            <ul>
              {notes.map(note =>
                <Note key={note.id} note={note} />
              )}
            </ul>

            <p>
              <button onClick={() => setShowAll(!showAll)}>
               Show {showAll ? 'important' : 'all'}
              </button>
            </p>

            <h2>{showAll ? 'Important' : 'All'} Notes</h2>
            <ul>
              {notesToShow.map(note =>
                <Note
                  key={note.id}
                  note={note}
                  toggleImportance={() => toggleImportanceOf(note.id)}
                  toggleDelete={() => toggleDeleteOf(note.id, note.content
                  )}
                />
              )}
            </ul>
          </div>
      }

      <Footer />
    </div>
  )
}

export default App