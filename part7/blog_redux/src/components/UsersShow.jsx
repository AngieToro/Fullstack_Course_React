import React from 'react'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const UsersShow = ( { users, user }) => {

  console.log('Users: ', users)
  console.log('User: ', user)

  return (
    <div>
      <h2>Users</h2>
      { user && (
        <Table striped>
          <thead>
            <tr>
              <th>User</th>
              <th>Blogs created</th>
            </tr>
          </thead>
          <tbody>
            { users
              .map( ( user ) => (
                <tr
                  key={ user.id }
                  className='clickable-row'
                >
                  <td>
                    <Link to={ `/users/${ user.id }` }>
                      { user.name }
                    </Link>
                  </td>
                  <td> { user.blogs.length } </td>
                </tr>
              ))
            }
          </tbody>
        </Table>
      )}
    </div>
  )
}

export default UsersShow