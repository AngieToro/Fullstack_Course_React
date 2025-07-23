import { useState } from 'react'

const BlogShow = ({ blog, handleDeleteBlogSubmit, handleLikeBlogSubmit, user }) => {

  const [showDetails, setShowDetails] = useState(false)

  console.log('Show detail: ', showDetails)
  console.log('Blog: ', blog)
  console.log('User: ', user)
  console.log('User: ', blog.user)

  //console.log('Funcion like: ', typeof handleLikeBlogSubmit)
  //console.log('Funcion delete: ', typeof handleDeleteBlogSubmit)

  return (

    <div className="blog">
      <div className="blogTitleAuthor">
        <strong>{ blog.title } </strong> by { blog.author }
        <button onClick={ () => setShowDetails(!showDetails) }>
          { showDetails
            ? 'Hide'
            : 'View' }
        </button>
      </div>

      { showDetails && blog.user && (
        <div className='blog-detail'>
          <h2>Blog Details</h2>
          <p><strong>Title:</strong> { blog.title }</p>
          <p><strong>Author: </strong>{ blog.author }</p>
          <p><strong>URL:</strong> { blog.url }</p>
          <p className="likes">
            <strong>Likes: </strong>{ blog.likes }
            <button onClick={() => handleLikeBlogSubmit(blog)}>Like</button>
          </p>
          { blog.user && blog.user.username === user.username && (
            <button onClick={() => handleDeleteBlogSubmit(blog)}> Delete </button>
          )}
        </div>
      )}
    </div>
  )
}

export default BlogShow