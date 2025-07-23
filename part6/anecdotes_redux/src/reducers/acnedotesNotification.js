import { createSlice } from '@reduxjs/toolkit'

let timeOutId = null

const acnedotesNotificationSlice = createSlice ({

  name: 'acnedotesNotification',
  initialState: '',
  reducers:{
    showNotification (state, action){
      
      console.log('showNotification state: ', state      )
      console.log('showNotification action: ', action)

      return action.payload
    },
    clearNotification (){
      return ''
    }
  }
})

export const { showNotification, clearNotification } = acnedotesNotificationSlice.actions

export const setNotification = ( message, seconds) => { 

  return async dispatch => {

    if ( timeOutId ) {
      clearTimeout(timeOutId)
    }

    dispatch(showNotification(message))
    
    timeOutId = setTimeout(() => {
      dispatch(clearNotification())
      timeOutId = null
    }, seconds * 1000)

  }
}

export default acnedotesNotificationSlice.reducer