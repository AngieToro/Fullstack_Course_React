const PersonShow = ({ person, toggleDelete }) => {
    return (
      <li>
        {person.name} - {person.number}
        &nbsp;
        {toggleDelete && (
          <button onClick={toggleDelete}> Delete </button>
        )}
      </li> 
    )
  }

  export default PersonShow