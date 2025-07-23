import { createContext, useReducer, useContext } from "react"

// contexto almacena la gestión global del estado y puede proveer un contexto a sus componentes hijos
const NotificationContext = createContext()

//maneja las acciones y define cómo cambia el estado
const notificationReducer = ( state, action ) => {

  console.log('State: ', state)
  console.log('Action: ', action)  

  switch (action.type){
    case "SHOW":
      return action.payload
    case "HIDE": 
      return ''
    default: 
      return state
  }
}

export const useNotificationValue = () => {

    const notificatioValue = useContext(NotificationContext)

    return notificatioValue[0]
}

export const useNotificationDispatch = () => {

    const notificationDispatch = useContext(NotificationContext)

    return notificationDispatch[1]
}

export const NotificationContextProvider = ( props ) => {

    const [ notification, notificationDispatch ] = useReducer(notificationReducer, '')

    console.log('notification: ', notification)

    return (
        //comparte el estado con los componentes hijos
        <NotificationContext.Provider 
            value={ [ notification, notificationDispatch ]} 
        >
            { props.children }

        </NotificationContext.Provider>
    )
}

export const setNotification = (dispatch, message, seconds) => {
  
  dispatch ({ 
      type: 'SHOW',
      payload: message
    })

  setTimeout(() => {
    dispatch({
      type: 'HIDE'
    })
    } , seconds * 1000 
  )
}

export default NotificationContext