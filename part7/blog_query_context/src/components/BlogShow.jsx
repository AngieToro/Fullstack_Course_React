import {  useParams } from 'react-router-dom'
import CommentAddForm from './CommentAddForm'

const BlogShow = ({ blogs, handleDeleteBlogSubmit, handleLikeBlogSubmit, user }) => {

  const idBlog = useParams().id
  console.log('Blog id: ', idBlog)

  const blog = blogs.find ( b => b.id === idBlog )
  console.log('Blog encontrado: ', blog)

  if (!blog) {
    return <div> No blogs found</div>
  }


  /* const resultComments = useQuery({
    queryKey: ['comments'],
    queryFn: CommentService.getAll,
    enabled: !!user,
    refetchOnWindowFocus: false,
    retry: 1,
    onError: ( error ) => {
      const message =   error.response?.data?.error || error.message || 'Error getting comments'
      setNotification('error', message, 10)
    }
  })

  const comments = resultComments.data || []
  console.log('Comments: ', comments)

  const comment = comments.filter(c => c.blog.id === idBlog)
  console.log('Comments in blog: ', comment) */

  return (
    <div>
      <div>
        { blog.user && (
          <div className='blog-detail'>
            <h2>Blog Details</h2>
            <p><strong>Title:</strong> { blog.title }</p>
            <p><strong>Author: </strong>{ blog.author }</p>
            <p><strong>URL:</strong> { blog.url }</p>
            <p className="likes">
              <span><strong>Likes: </strong>{ blog.likes }</span>
              <button onClick={() => handleLikeBlogSubmit(blog)}>Like</button>
            </p>
            { blog.user && blog.user.username === user.username && (
              <button onClick={() => handleDeleteBlogSubmit(blog)}> Delete </button>
            )}
          </div>
        )}
      </div>
      <div>
        { blog.user && blog &&
          <div>
            <CommentAddForm  idBlog = { idBlog }/>
            <h2>Comments</h2>
            { Array.isArray(blog.comments) && blog.comments.length > 0
              ? blog.comments
                .slice()
                .sort( (a, b) =>  b.creationDate - a.creationDate)
                .map( ( comment ) => (
                  <div key={ comment.id } className='card'>
                    <p> { comment.comment } </p>
                    <span className='card-data'>
                      { comment.creationDate }
                    </span>
                  </div>
                ))
              : <p> No comments found</p>
            }
          </div>
        }
      </div>
    </div>
  )
}

export default BlogShow