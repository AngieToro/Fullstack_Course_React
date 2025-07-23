import { useState } from 'react'
import BlogService from '../services/blogs'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useShowMessage } from '../hooks/useShowMessage'
import blogs from '../services/blogs'

const CommentAddForm = ( { idBlog } ) => {

  const [comment, setComment] = useState('')

  const queryClient = useQueryClient()
  const setNotification = useShowMessage()

  console.log('Id: ', idBlog)

  const newCommentBlogMutation = useMutation({
    mutationFn: ( { comment, blog }) => BlogService.blogComments ( comment, blog ),
    onSuccess: ( ) => {
      queryClient.invalidateQueries(['comments'])  // Fuerza recarga desde el backend

      setNotification('success','A new comment added',5)

      setComment('')
    },
    onError: ( error ) => {
      const message = error?.response?.data?.error || 'Error adding the comment'
      setNotification('error', message, 10)
    }
  })

  const handleAddCommentBlogSubmit = ( event ) => {

    event.preventDefault()

    newCommentBlogMutation.mutate({
      comment,
      blog: idBlog
    })
  }

  return (
    <div className='card-form'>
      <h2>Create a Comment</h2>
      <form onSubmit={ handleAddCommentBlogSubmit }>
        <div>
          <textarea
            name="comment"
            value={ comment }
            onChange={ ( { target } ) => setComment( target.value ) }
            placeholder="Write a Comment here"
            rows='5'
            cols='80'
          />
        </div>
        <div>
          <button type="submit">Post</button>
        </div>
      </form>
    </div>
  )
}

export default CommentAddForm