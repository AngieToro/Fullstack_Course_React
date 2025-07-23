import React from 'react'
import Togglable from './Togglable'
import BlogAddForm from './BlogAddForm'
import { Link } from 'react-router-dom'

const BlogsShow = ( { blogs, blogFormRef, user }) => {

  return (
    <div>
      <h2>Blogs</h2>
      <div>
        { user && (
          <Togglable buttonLabel='New blog' ref = { blogFormRef }>
            <BlogAddForm
              togglableRef = { blogFormRef }
            />
          </Togglable>
        )}
      </div>
      <div>
        { blogs
          .slice() //para no cambiar el array original
          .sort( (a, b) =>  b.likes - a.likes )  //de mayor a menor
          .map( ( blog ) => (
            <ul key={ blog.id } className="card" >
              <Link to={ `/blogs/${ blog.id }` }>
                { blog.title }
              </Link>
            </ul>
          ))
        }
      </div>
    </div>
  )
}

export default BlogsShow