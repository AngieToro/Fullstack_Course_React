import { useNotificationValue } from "../NotificationContext"

const Notification = () => {

  const notification = useNotificationValue()

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
    backgroundColor: '#f0f0f0',  
    borderRadius: 5,
    color: '#333',
    fontWeight: 'bold'
  }
  
  if (!notification) return null

  return (
    <div style={style}>
      { notification }
    </div>
  )
}

export default Notification
