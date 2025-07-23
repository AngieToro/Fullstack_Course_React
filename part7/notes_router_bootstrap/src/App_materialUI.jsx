import { useState } from 'react'
import {
  Routes, Route, Link, Navigate,
  useParams, useNavigate, useMatch
} from 'react-router-dom'
// useParams como useNavigate son hooks
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button, Alert, AppBar, Toolbar, IconButton} from '@mui/material'

  const Home = () => (

    <div>
      <h1>Notes App</h1>
      <p>Welcome to the Notes App</p>
    </div>
  )

  const Notes = ({ notes }) => {

     return (
      <div>
        <h2>Notes List</h2>

        <TableContainer component={ Paper }> 
          <Table>
            <TableHead>
              <TableCell>
                Content
              </TableCell>
              <TableCell>
                User
              </TableCell>
            </TableHead>
            <TableBody>
              { notes.map(note => (
                <TableRow key={ note.id }>
                  <TableCell>
                     <Link to={ `/notes/${ note.id }` }> { note.content } </Link>
                  </TableCell>
                  <TableCell>
                    { note.user }
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    )
  }

    const Note = ({ note }) => {

    //const id = useParams().id
    //const note = notes.find(n => n.id === Number(id))
    console.log('Note Link: ', note)
    
    return (
      <div>
        <h2>Note Details</h2>
        <p><strong>Content:</strong> { note.content}</p>
        <p><strong>Level: </strong> {note.important ? 'important' : 'not important'}</p>
        <p><strong>User:</strong> { note.user}</p>
      </div>
    )
  }

  const Users = () => (

    <div>
      <h2>Notes App</h2>
      <ul>
        <li>Angelica Toro</li>
      </ul>
    </div>
  )

  const Login = ( props ) => {

    const navigate = useNavigate()

    const onSubmit = (event) => {

      event.preventDefault()
      props.onLogin('angie')
      navigate('/')
    }

    return (

      <div>
        <h2>Login</h2>
        <form onSubmit={ onSubmit }>
          <div>
            <TextField label='Username:' />
          </div>
          <div>
            <TextField label='Password:' type='password'/>
          </div>
          <div>
            <Button variant='contained' color='primary' type='submit'> 
              Login 
            </Button>
          </div>
        </form>
      </div>
    )
  }

  const App = () => {

      const [ message, setMessage] = useState(null)
      const [ user, setUser ] = useState(null)
      const [ notes, setNotes ] = useState([
        {
          id: 1,
          content: 'HTML is easy',
          important: true,
          user: 'Matti Luukkainen'
        },
        {
          id: 2,
          content: 'Browser can execute only JavaScript',
          important: false,
          user: 'Matti Luukkainen'
        },
        {
          id: 3,
          content: 'Most important methods of HTTP-protocol are GET and POST',
          important: true,
          user: 'Arto Hellas'
        }
      ])

    const login = (user) => {

        setUser(user)

        setMessage(`Welcome ${ user }`)
        setTimeout(() => {
          setMessage(null)
        }, 10000)
    }

    // componente Note reciba solo la nota que debería mostrar
    //Si la URL coincide con /notes/:id, la variable match contendrá un objeto desde el cual se puede acceder a la parte parametrizada de la ruta, el id de la nota que se mostrará, y luego se busco la nota correcta para mostrar
    const match = useMatch('/notes/:id')
    const note = match
      ? notes.find(n => n.id === Number(match.params.id))
      : null

  return(
    <Container>
      <div>
          { (message && 
            <Alert severity='success'>
              { message }
            </Alert>
          )}
          <div>
            <AppBar position='static'>
              <Toolbar>
                <Button color='inherit' component={ Link } to='/'>
                  Home
                </Button>
                <Button color='inherit' component={ Link } to='/notes'>
                  Notes
                </Button>
                <Button color='inherit' component={ Link } to='/users'>
                  Users
                </Button>
                { user
                    ? <em>{ user } loggeg in </em>
                    : <Button color='inherit' component={ Link } to='/login'>
                      Login
                      </Button>
                }
              </Toolbar>
            </AppBar>
          </div>
        
          <Routes>
            <Route path='login' element={ <Login onLogin={ login } /> } />
            <Route path='/' element={ <Home /> } />
            <Route path='/notes' element={ <Notes notes = { notes }/> } />
            <Route path='/notes/:id' element={ <Note note = { note } /> } />
            <Route path='/users' element={ user ? <Users /> : <Navigate replace to = '/login' /> } />
          </Routes>

        <footer>
          <div>
            <br />
            <em>Note App - Practice</em>
          </div>
        </footer>
    </div>
  </Container>
  )
}

export default App