import React from 'react'
import {  useParams } from 'react-router-dom'

const UserShow = ( { users } ) => {

  const id = useParams().id


  const user = users.find ( user => user.id === id )

  return (
    <div>
      <h2> User details </h2>
      { user  && (
        <div>
          <h4> { user.name } ( { user.username } ) </h4>
          { user.blogs
            .map( ( blog ) => (
              <div key={ blog.id } className='card'>
                <strong>{ blog.title }</strong>
                <span className='card-data'>
                  { blog.likes } likes
                </span>
                <span className='card-data'>
                  { blog.comments?.length > 0
                    ? `${blog.comments.length} comments`
                    : 'No comments yet' }
                </span>
              </div>
            ))
          }
        </div>
      )}
    </div>
  )
}

export default UserShow