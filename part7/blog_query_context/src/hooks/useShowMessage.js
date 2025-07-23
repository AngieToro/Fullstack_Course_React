import { useNotificationDispatch } from '../context/NotificationContext'

export const useShowMessage = () => {
  const dispatch = useNotificationDispatch()

  const showMessage = (type, message, duration) => {
    dispatch({
      type: 'SHOW',
      payload: { type, message }
    })

    setTimeout(() => {
      dispatch({ type: 'HIDE' })
    }, duration * 1000)
  }

  return showMessage
}