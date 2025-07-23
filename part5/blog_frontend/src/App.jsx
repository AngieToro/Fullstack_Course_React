import { useState, useEffect, useRef } from 'react'
import BlogShow from './components/BlogShow'
import LoginForm from './components/LoginForm'
import BlogAddForm from './components/BlogAddForm'
import Togglable from './components/Togglable'
import BlogService from './services/blogs'
import LoginServices from './services/login'
import Notification from './components/Notification'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [messageSuccess, setMessageSuccess] = useState(null)
  const [messageError, setMessageError] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const blogFormRef = useRef()

  useEffect(() => {

    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')

    if (loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)

      if (user && user.token){
        setUser(user)
        BlogService.setToken(user.token)
      }
    }
  }, [])

  useEffect(() => {

    if (user){

      BlogService
        .getAll()
        .then(blogs => setBlogs( blogs ))
        .catch(error => {
          showMessage('error', 'Error getting blogs')
          console.error('Error getting blogs:', error)
        })
    }
  }, [user])

  const showMessage = (type, text) => {
    if (type === 'success'){
      setMessageSuccess(text)
      setTimeout(() => setMessageSuccess(null), 5000)
    } else if (type === 'error'){
      setMessageError(text)
      setTimeout(() => setMessageError(null), 10000)
    }
  }

  const handleLoginSubmit = async (event) => {

    event.preventDefault()

    try {

      const user = await LoginServices.login( { username, password })
      console.log('User conneted: ', user)

      window.localStorage.setItem(
        'loggedBlogAppUser',
        JSON.stringify(user)
      )

      BlogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')

      showMessage('success','Welcome')

    } catch (error) {
      showMessage('error','Wrong credentials')
      console.error('Error login:', error)
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
          handleLoginSubmit = { handleLoginSubmit}
        />
      </Togglable>
    </div>
  )


  const handleAddBlogSubmit = async( event ) => {

    event.preventDefault()

    const blogObject = {
      title,
      author,
      url
    }
    console.log('Blog: ', blogObject)

    try {

      blogFormRef.current.toggleVisibility()
      const result = await BlogService.create(blogObject)
      console.log('Response post: ', result)
      setBlogs(blogs.concat(result))
      setTitle('')
      setAuthor('')
      setUrl('')
      showMessage('success',`A new blog ${ title } by ${ author } added`)

    } catch (error) {
      showMessage('error', 'Error adding the blog', error)
      console.error('Error creating blog:', error)
    }
  }

  const addBlogForm = () => (

    <div>
      <Togglable buttonLabel='New blog' ref = { blogFormRef }>
        <BlogAddForm
          title = { title }
          author = { author }
          url = { url }
          handleTitleChange = { ( { target } ) => setTitle(target.value ) }
          handleAuthorChange = { ( { target } ) => setAuthor(target.value ) }
          handleUrlChange = { ( { target } ) => setUrl(target.value ) }
          handleAddBlogSubmit = { handleAddBlogSubmit }
        />
      </Togglable>
    </div>
  )

  const handleLogout = () => {

    setUser(null)
    setBlogs([])
    BlogService.setToken(null)
    window.localStorage.removeItem('loggedBlogAppUser')
    showMessage('success', 'Logged out successfully')
  }

  const handleLikeBlogSubmit = async (blog) => {

    try {

      console.log('Blog to update: ', blog)

      const blogObject = {
        ...blog,
        likes: blog.likes + 1
      }

      const response = await BlogService.update(blog.id, blogObject)
      console.log('The blog has updated: ', response )

      setBlogs(blogs.map(b => b.id === blog.id
        ? { ...response, user: b.user }
        : b
      ))

      showMessage('success', `The blog ${ blog.title }  has received a like`)

    } catch (error) {
      showMessage('error', `The blog ${ blog.title } could not be updated `)
      console.error('The blog could not be updated', error)
    }
  }

  const handleDeleteBlogSubmit = async (blog) => {

    console.log('Aqui: ',  blog)

    if (window.confirm(`Are you sure you want to delete this blog ${blog.title} ?`)){

      try {

        await BlogService.deleteById(blog.id)
        setBlogs(blogs.filter(b => b.id !== blog.id))
        showMessage('success', `Blog ${blog.title} was deleted`)

      } catch (error) {
        showMessage('error', `The blog ${ blog.title } could not be removed`)
        console.error('The blog could not be removed', error)
      }
    }
  }

  const getBlogForm = () => (
    <div>
      <h2>Blogs</h2>
      {blogs
        .slice() //para no cambiar el array original
        .sort( (a, b) =>  b.likes - a.likes )  //de mayor a menor
        .map( ( blog)  => (
          <BlogShow
            key = { blog.id }
            blog = { blog }
            handleDeleteBlogSubmit = { handleDeleteBlogSubmit }
            handleLikeBlogSubmit = { handleLikeBlogSubmit }
            user = { user }
          />
        ))
      }
    </div>
  )

  return (
    <div>
      <Notification
        messageSuccess={messageSuccess}
        messageError={messageError}
      />

      {
        user === null
          ? loginForm()
          : <div>
            <h1>Blog App</h1>
            <p> Welcome {user.name} </p>
            <p>
              <button onClick={handleLogout}>Logout</button>
            </p>
            { addBlogForm() }
            { getBlogForm() }
          </div>
      }
    </div>
  )
}

export default App