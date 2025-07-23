import { createSlice } from '@reduxjs/toolkit'
import BlogService from '../services/blogs'
import LoginServices from '../services/login'
import UserServices from '../services/users'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser (state, action){
      return action.payload
    },
    clearUser (){
      return null
    }
  }
})

export const { setUser, clearUser } = userSlice.actions

export const initialUser = () => {

  return async dispatch => {

    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')

    if (loggedUserJSON){

      const user = JSON.parse(loggedUserJSON)
      console.log('User connected: ', user.username)

      if (user && user.token){
        await BlogService.setToken(user.token)
        dispatch(setUser(user))
      }
    }
  }
}

export const loginUser = (credentials) => {
  return async dispatch => {
    try {

      console.log('Credentials: ', credentials)
      const user = await LoginServices.login( credentials)
      console.log('User conneted: ', user)

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      BlogService.setToken(user.token)
      dispatch(setUser(user))
    } catch (error) {
      console.error('Error login:', error)
      throw error
    }
  }
}

export const logOutUser = () => {
  return dispatch => {
    window.localStorage.removeItem('loggedBlogAppUser')
    BlogService.setToken(null)
    dispatch(clearUser())
  }
}

export default userSlice.reducer