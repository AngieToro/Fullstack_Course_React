const FindPerson = ({value,onChange}) => {
    return (
        <p>
            Filter shown with <input value={value} onChange={onChange} />
        </p>
    )
  }

  export default FindPerson