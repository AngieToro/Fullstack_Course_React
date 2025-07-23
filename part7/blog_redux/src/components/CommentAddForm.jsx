import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setNotificacion } from '../reducers/notificacionReducer'
import { setCommentBlog } from '../reducers/blogReducer'

const CommentAddForm = ( { idBlog } ) => {

  const [comment, setComment] = useState('')
  const dispatch = useDispatch()

  console.log('Id: ', idBlog)

  const handleAddCommentBlogSubmit = async( event ) => {

    try {

      event.preventDefault()

      await dispatch(setCommentBlog( comment, idBlog ))

      dispatch(setNotificacion('A new comment added','success',))

      setComment('')

    } catch (error) {
      const message = error?.response?.data?.error || 'Error adding the comment'
      dispatch(setNotificacion(message, 'error'))
    }
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