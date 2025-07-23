import { useState, useRef } from 'react'
import BlogsShow from './components/BlogsShow'
import BlogShow from './components/BlogShow'
import UsersShow from './components/UsersShow'
import UserShow from './components/UserShow'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useShowMessage } from './hooks/useShowMessage'
import { useUser } from './context/UserContext'
import BlogService from './services/blogs'
import UserService from './services/users'
import { Routes, Route, NavLink, useNavigate  } from 'react-router-dom'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { user, login, logout } = useUser()
  const blogFormRef = useRef()
  const queryClient = useQueryClient()
  const setNotification = useShowMessage()
  const navigate = useNavigate()

  const Home = () => (

    <div>
      <h1>Notes App</h1>
      <p>Welcome to the Notes App</p>
    </div>
  )

  const resultBlogs = useQuery({
    queryKey: ['blogs'],
    queryFn: BlogService.getAll,
    enabled: !!user,   // solo ejecuta si hay un usuario logueado
    refetchOnWindowFocus: false,
    retry: 1,
    onError: ( error ) => {
      const message =   error.response?.data?.error || error.message || 'Error getting blogs'
      setNotification('error', message, 10)
    }
  })

  const blogs = resultBlogs.data || []
  console.log('Blogs: ', blogs)

  const isLoadingBlogs = resultBlogs.isLoading
  const isErrorBlogs = resultBlogs.isError

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: ( ) => {
      setUsername('')
      setPassword('')
      setNotification('success', 'Welcome', 5)
      navigate('/')
    },
    onError: ( error ) => {
      const message =   error.response?.data?.error || error.message || 'Wrong credentials'
      setNotification('error',message,10)
    }
  })

  const handleLoginSubmit = (event) => {

    event.preventDefault()

    loginMutation.mutate( { username, password } )
  }

  const handleLogout = () => {

    logout()
    queryClient.removeQueries(['blogs'])
    setNotification('success', 'Logged out successfully', 5)
    navigate('/login')
  }

  const updateBlogMutation = useMutation({
    mutationFn: ( { id, data }) => BlogService.update(id, data),
    onSuccess: ( updateBlog ) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(
        ['blogs'],
        blogs.map(blog => blog.id !== updateBlog.id
          ? blog
          : updateBlog
        )
      )
      setNotification('success', `The blog ${ updateBlog.title }  has received a like`, 5)
    },
    onError: () => {
      setNotification('error', 'The blog could not be updated', 10)
    }

  })

  const handleLikeBlogSubmit = (blog) => {

    updateBlogMutation.mutate({
      id: blog.id,
      data: {
        ...blog,
        likes: blog.likes + 1
      }
    })
  }

  const deleteMutation = useMutation({
    mutationFn: (blog) => BlogService.deleteById(blog.id),
    onSuccess: ( _, blog ) => {
      const blogs = queryClient.getQueryData(['blogs'])

      queryClient.setQueryData(
        ['blogs'],
        blogs.filter(b => b.id !== blog.id)
      )
      setNotification('success', `Blog ${blog.title} was deleted`, 5)
      navigate('/blogs')
    },
    onError: ( error ) => {

      const message = error.response?.data?.error || error.message || 'The blog could not be removed'

      setNotification('error', message,10)
    }
  })

  const handleDeleteBlogSubmit = async (blog) => {

    if (window.confirm(`Are you sure you want to delete this blog ${blog.title} ?`)){

      deleteMutation.mutate(blog)
    }
  }

  const resultUsers = useQuery({
    queryKey: ['users'],
    queryFn: UserService.getAll,
    enabled: !!user,   // solo ejecuta si hay un usuario logueado
    refetchOnWindowFocus: false,
    retry: 1,
    onError: ( error ) => {
      const message = error.response?.data?.error || error.message || 'Error getting users'

      setNotification('error', message, 10)
    }
  })

  const users = resultUsers.data || []
  console.log('Users: ', users)

  const isLoadingUsers = resultUsers.isLoading
  const isErrorUsers = resultUsers.isError

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
        { isLoadingBlogs && <div> Loading blogs... </div> }
        { isLoadingUsers && <div> Loading users... </div>  }
        { isErrorBlogs && <div> Error Loading blogs </div> }
        { isErrorUsers && <div> Error Loading users </div> }
        { !isLoadingBlogs && !isErrorBlogs &&
          !isLoadingUsers && !isErrorUsers &&
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
               users = { users }
               user = { user }  /> } >
             </Route>
             <Route path='/users/:id' element={ <UserShow
               users = { users } /> } >
             </Route>
           </Routes>
        }
      </div>
      <footer>
        <div>
          <br />
          <em>Blog App - Practice QueryReact and Context </em>
        </div>
      </footer>
    </div>
  )
}

export default App