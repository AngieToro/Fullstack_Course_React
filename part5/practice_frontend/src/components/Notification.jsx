const Notification = ({ messageSuccess, messageError }) => {

  if (messageSuccess) {
    return <div className="messageSuccess"> { messageSuccess}  </div>
  }

  if (messageError) {
    return <div className="messageError"> { messageError } </div>
  }

  return null

}

export default Notification