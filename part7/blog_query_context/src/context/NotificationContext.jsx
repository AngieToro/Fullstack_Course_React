import { createContext, useReducer, useContext } from 'react'

const initialState = null

const notificationReducer = ( state, action ) => {

  console.log('State: ', state)
  console.log('Action: ', action)

  switch (action.type){
  case 'SHOW':
    return {
      message: action.payload.message,
      type: action.payload.type
    }
  case 'HIDE':
    return null
  default:
    return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = ( props ) => {

  const [ state, dispatch ] = useReducer(notificationReducer, initialState)

  return (
    <NotificationContext.Provider
      value={ { state, dispatch }}
    >
      { props.children }

    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => {

  const context = useContext(NotificationContext)

  return context.state
}

export const useNotificationDispatch = () => {

  const context = useContext(NotificationContext)

  return context.dispatch
}

export default NotificationContext