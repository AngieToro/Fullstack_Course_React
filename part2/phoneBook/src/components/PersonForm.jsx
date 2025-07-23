const PersonForm = ({onSubmit,valuePerson,onChangePerson,valueNumber, onChangeNumber}) => {
    return (
      <form onSubmit={onSubmit}>
          <p>
            Name: <input value={valuePerson} onChange={onChangePerson} />
          </p>
          <p>
            Number: <input value={valueNumber} onChange={onChangeNumber} />
          </p>
          <button type='submit'>Add Contact</button>
       </form>
    )
  }

  export default PersonForm