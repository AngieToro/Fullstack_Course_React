import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotificacion } from '../reducers/notificacionReducer'

const BlogAddForm = ( togglableRef ) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const dispatch = useDispatch()

  const handleAddBlogSubmit = async( event ) => {

    try {

      event.preventDefault()

      const blogObject = {
        title,
        author,
        url
      }

      await dispatch(createBlog(blogObject))

      dispatch(setNotificacion(`A new blog ${ title } by ${ author } added`, 'success' ))

      if (togglableRef && togglableRef.current) {
        togglableRef.current.toggleVisibility()
      }

      setTitle('')
      setAuthor('')
      setUrl('')

    } catch (error) {
      dispatch(setNotificacion('Error adding the blog', 'error' ))
    }
  }

  return (
    <div className='card-form'>
      <h2>Create a Blog</h2>
      <form onSubmit={ handleAddBlogSubmit }>
        <div>
          Title
          <input
            title="title"
            value={ title }
            onChange={ ( { target } ) => setTitle(target.value ) }
            placeholder="Write a Title here"
          />
        </div>
        <div>
          Author
          <input
            title="author"
            value={ author }
            onChange={ ( { target } ) => setAuthor(target.value ) }
            placeholder="Write a Author here"
          />
        </div>
        <div>
          URL
          <input
            title="url"
            value={ url }
            onChange={ ( { target } ) => setUrl(target.value ) }
            placeholder="Write URL here"
          />
        </div>
        <div>
          <button type="submit">Create</button>
        </div>
      </form>
    </div>
  )
}

export default BlogAddForm