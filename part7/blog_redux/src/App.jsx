import { useState, useEffect, useRef } from 'react'
import BlogShow from './components/BlogShow'
import BlogsShow from './components/BlogsShow'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import UsersShow from './components/UsersShow'
import UserShow from './components/UserShow'
import { useDispatch, useSelector } from 'react-redux'
import { setNotificacion } from './reducers/notificacionReducer'
import { initialBlogs, clearBlogs, deleteBlog, updateBlog } from './reducers/blogReducer'
import { initialUsers } from './reducers/usersReducer'
import { initialUser, loginUser, logOutUser } from './reducers/userReducer'
import { Routes, Route, NavLink, useNavigate  } from 'react-router-dom'


const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const blogFormRef = useRef()
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blog)
  const user = useSelector(state => state.user)
  const users = useSelector(state => state.users)
  const navigate = useNavigate()

  useEffect(() => {

    dispatch(initialUser())

  }, [dispatch])

  useEffect(() => {

    if (user){

      dispatch(initialBlogs())
      dispatch(initialUsers())

    }
  }, [user])

  const Home = () => (

    <div>
      <h1>Notes App</h1>
      <p>Welcome to the Notes App</p>
    </div>
  )

  const handleLoginSubmit = async (event) => {

    event.preventDefault()

    try {

      await dispatch(loginUser({ username, password }))
      setUsername('')
      setPassword('')
      dispatch(setNotificacion('Welcome','success'))
      navigate('/')

    } catch (error) {
      dispatch(setNotificacion('Wrong credentials','error'))
    }
  }

  const handleLogout = () => {

    dispatch(logOutUser())
    dispatch(clearBlogs())
    dispatch(setNotificacion('Logged out successfully', 'success'))
    navigate('/login')
  }

  const handleLikeBlogSubmit = async (blog) => {

    try {

      dispatch(updateBlog(blog.id, blog))
      dispatch(setNotificacion(`The blog ${ blog.title }  has received a like`, 'success'))

    } catch (error) {
      dispatch(setNotificacion(`The blog ${ blog.title } could not be updated `, 'error'))
      console.error('The blog could not be updated', error)
    }
  }

  const handleDeleteBlogSubmit = (blog) => {

    if (window.confirm(`Are you sure you want to delete this blog ${blog.title} ?`)){

      try {

        dispatch(deleteBlog(blog.id))
        dispatch(setNotificacion(`Blog ${blog.title} was deleted`, 'success'))
        navigate('/blogs')

      } catch (error) {
        dispatch(setNotificacion(`The blog ${ blog.title } could not be removed`, 'error'))
        console.error('The blog could not be removed', error)
      }
    }
  }

  return (
    <div>
      <div>
        <nav className="menu">
          <NavLink className='menu-link' to='/'> Home </NavLink>
          <NavLink className='menu-link' to='/blogs'> Blogs </NavLink>
          <NavLink className='menu-link' to='/users'> Users </NavLink>
          { user
            ? (
              <div>
                <em className='welcome-text'> Welcome { user.name } </em>
                <button className="menu-link" onClick={ handleLogout }>Logout</button>
              </div>
            )
            : <NavLink className='menu-link' to='/login'> Login </NavLink>
          }
        </nav>
      </div>
      <br />
      <div>
        <Notification/>
        <Routes>
          <Route path='/' element={ <Home/> } ></Route>
          <Route path='/login' element={ <LoginForm
            username = { username }
            password = { password }
            handleUsernameChange = { ( { target } ) => setUsername(target.value) }
            handlePasswordChange = { ( { target }) => setPassword(target.value)}
            handleLoginSubmit = { handleLoginSubmit} />}>
          </Route>
          <Route path='/blogs' element={ <BlogsShow
            blogs={ blogs }
            blogFormRef={ blogFormRef }
            user = { user } /> } >
          </Route>
          <Route path='/blogs/:id' element= { <BlogShow
            blogs = { blogs }
            handleDeleteBlogSubmit = { handleDeleteBlogSubmit }
            handleLikeBlogSubmit = { handleLikeBlogSubmit }
            user = { user } /> }>
          </Route>
          <Route path='/users' element={ <UsersShow
            users= { users}
            user = { user }  /> } >
          </Route>
          <Route path='/users/:id' element={ <UserShow
            users = { users } /> } >
          </Route>
        </Routes>
      </div>
      <footer>
        <div>
          <br />
          <em>Blog App - Practice Redux</em>
        </div>
      </footer>
    </div>
  )
}

export default App