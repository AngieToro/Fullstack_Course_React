import { createContext, useContext, useEffect, useState } from 'react'
import LoginServices from '../services/login'
import BlogService from '../services/blogs'

const UserContext = createContext()

export const UserProvider = ({ children }) => {

  const [user, setUser] = useState(null)

  useEffect(() => {

    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      BlogService.setToken(user.token)
    }
  }, [])

  const login = async (credentials) => {
    const user = await LoginServices.login(credentials)
    setUser(user)
    window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
    BlogService.setToken(user.token)
    return user
  }

  const logout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogAppUser')
    BlogService.setToken(null)
  }

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)