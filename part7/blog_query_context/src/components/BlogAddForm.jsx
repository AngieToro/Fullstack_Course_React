import { useState } from 'react'
import BlogService from '../services/blogs'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useShowMessage } from '../hooks/useShowMessage'

const BlogAddForm = ( { togglableRef } ) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const queryClient = useQueryClient()
  const setNotification = useShowMessage()

  const newBlogMutation = useMutation({
    mutationFn: BlogService.create,
    onSuccess: ( newBlog ) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(
        ['blogs'],
        blogs.concat( newBlog )
      )
      setNotification('success',`A new blog ${ newBlog.title } by ${ newBlog.author } added`,5)

      if (togglableRef?.current) {
        togglableRef.current.toggleVisibility()
      }

      setTitle('')
      setAuthor('')
      setUrl('')
    },
    onError: ( error ) => {
      const message = error?.response?.data?.error || 'Error adding the blog'
      setNotification('error', message, 10)
    }
  })

  const handleAddBlogSubmit = ( event ) => {

    event.preventDefault()

    newBlogMutation.mutate({
      title,
      author,
      url
    })
  }

  return (
    <div className='card-form'>
      <h2>Create a Blog</h2>
      <form onSubmit={ handleAddBlogSubmit }>
        <div>
          Title
          <input
            name="title"
            value={ title }
            onChange={ ( { target } ) => setTitle(target.value ) }
            placeholder="Write a Title here"
          />
        </div>
        <div>
          Author
          <input
            name="author"
            value={ author }
            onChange={ ( { target } ) => setAuthor(target.value ) }
            placeholder="Write a Author here"
          />
        </div>
        <div>
          URL
          <input
            name="url"
            value={ url }
            onChange={ ( { target } ) => setUrl(target.value ) }
            placeholder="Write a URL here"
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