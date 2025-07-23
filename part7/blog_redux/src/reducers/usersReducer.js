import { createSlice } from '@reduxjs/toolkit'
import UserServices from '../services/users'

const usersSlice = createSlice({
  name: 'users',
  initialState: null,
  reducers: {
    setUsers (state, action){
      return action.payload
    }
  }
})

export const { setUsers } = usersSlice.actions

export const initialUsers = () => {
  return async dispatch => {
    const result = await UserServices.getAll()
    console.log('Uers:', result)
    dispatch(setUsers(result))
  }
}

export default usersSlice.reducer