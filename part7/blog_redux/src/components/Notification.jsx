import { useSelector } from 'react-redux'

const Notification = () => {

  const notification = useSelector ( ( state ) => state.notification )

  if ( !notification ) return null

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