import { useState } from 'react'
import {
  Routes, Route, Link, Navigate,
  useParams, useNavigate, useMatch
} from 'react-router-dom'
// useParams como useNavigate son hooks
import { Table, Form, Button, Alert, Navbar, Nav } from 'react-bootstrap'

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
        <Table striped>
          <thead>
            <tr>
              <th>Content</th>
              <th>User</th>
            </tr>
          </thead>
          
          <tbody>
            { notes.map(note => 
              <tr key={ note.id } >
                <td>
                  <Link to={ `/notes/${ note.id }` }> { note.content } </Link>
                </td>
                
                <td>
                  { note.user }
                </td>
              </tr>
            )}
          </tbody>
        </Table>
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
        <Form onSubmit={ onSubmit }>
          <Form.Group>
            <Form.Label> Username: </Form.Label>
            <Form.Control
              type='text'
              name='username'
            />
          </Form.Group>
          <Form.Group>
            <Form.Label> Password: </Form.Label>
            <Form.Control
              type='password'
              name='password'
            />
          </Form.Group>
          <Button variant='primary' type='submit'> 
            Login 
          </Button>
        </Form>
      </div>
    )
  }

  const App = () => {

      const [ message, setMessage ] = useState(null)
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

    const padding = {
      padding: 5
    } 

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
      <div className='container'>
        { (message && 
          <Alert variant='success'>
            { message }
          </Alert>
        )}
        <div>  
          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link href='#' as='span'>
                    <Link style={padding} to='/'>Home</Link>
                  </Nav.Link>
                  <Nav.Link href='#' as='span'>
                    <Link style={padding} to='/notes'>Notes</Link>
                  </Nav.Link>
                  <Nav.Link href='#' as='span'>
                    <Link style={padding} to='/users'>Users</Link>
                  </Nav.Link>
                  <Nav.Link href='#' as='span'>
                    { user
                      ? <em>{ user } loggeg in </em>
                      : <Link style={padding} to='/login'>Login</Link>
                    }  
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
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
  )
}

export default App