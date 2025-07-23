import { createSlice } from '@reduxjs/toolkit'

let timeoutId

const notificationSlice = createSlice({

  name: 'notificacion',
  initialState: [],
  reducers: {
    showNotificacion ( state, action ) {

      console.log('Payload notificacion: ', action.payload)

      const { message, type } = action.payload

      return { message, type }
    },
    clearNotificacion (){
      return null
    }
  }
})

export const { showNotificacion, clearNotificacion } = notificationSlice.actions

export const setNotificacion = (message, type) => {
  return dispatch => {

    if (timeoutId){
      clearNotificacion(timeoutId)
    }

    dispatch(showNotificacion({ message, type }))

    timeoutId = setTimeout(() => {
      dispatch(clearNotificacion())
      timeoutId = null
    }, 5000)
  }
}

export default notificationSlice.reducer