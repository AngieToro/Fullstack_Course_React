import { useNotificationValue } from '../context/NotificationContext'

const Notification = () => {

  const notification = useNotificationValue()
  console.log('Notification: ', notification)

  if ( !notification || !notification.message ) return null

  const className = notification.type === 'success'
    ? 'messageSuccess'
    : notification.type === 'error'
      ? 'messageError'
      : ''

  return (

    <div className={ className }>
      { notification.message }
    </div>
  )

}

export default Notification