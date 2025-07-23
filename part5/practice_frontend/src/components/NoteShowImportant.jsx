const Note = ({ note, toggleImportance, toggleDelete }) => {

  const label = note.important
    ? 'Make not important'
    : 'Make important'

  return (
    <li className="note">
      {note.content}
      {toggleImportance && (
        <button onClick={toggleImportance}>{label}</button>
      )}
      {toggleDelete && (
        <button onClick={toggleDelete}> Delete </button>
      )}
    </li>
  )
}

export default Note