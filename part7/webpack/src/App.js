import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useNotes = ( url ) => {

  const [ notes, setNotes ] = useState([])

  useEffect(() => {

    axios
    .get(url)
    .then(response => {
      setNotes(response.data)
    })
  }, [ url ])

  return notes
}

const App = () => {

  const [ counter, setCounter ] = useState(0)
  const [ previousCounter, setPreviousCounter ] = useState([])
  //const url = 'https://notes2023.fly.dev/api/notes' lo mismo de abajo pero ahora se define en el webpack.config.js
  const notes = useNotes(BACKEND_URL) 

  const handleClick = () => {

    setCounter( counter + 1 )
    setPreviousCounter (previousCounter.concat(counter))
  }
 
  return (
    <div className='container'>
      <strong>
        Hello WebPack { counter } clicks 
      </strong>
      <br />
      <button onClick={ handleClick }>
        Press
      </button>
      <br />
      Counter sequence { previousCounter }
      <br/>
      <div>
        { notes.length } notes on server { BACKEND_URL }
      </div>
    </div>
  )
}

export default App