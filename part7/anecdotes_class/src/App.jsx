
import React from 'react'
import axios from 'axios'

// los componentes de clase el estado de un componente de clase es un solo objeto y que el estado se actualiza utilizando el método setState
class App extends React.Component {

  constructor(props){
    super(props)

    //estado del componente 
    this.state = {  
      anecdotes: [],
      current: 0    //índice de la anécdota que se muestra actualmente.
    }    
  }

  handleClick = () => {

    const current = Math.floor(Math.random() * this.state.anecdotes.length)

    this.setState( { current })
  } 

  componentDidMount = () => {
    
    const baseUrl = 'http://localhost:3001/anecdotes'
    axios
      .get(baseUrl)
      .then(response => {
        this.setState( { anecdotes: response.data })
      })
  }

  render() {

    if (this.state.anecdotes.length === 0 ){
      return <div> No anecdotes </div>
    }

    return (
      <div>
        <h1> Anecdote of the day </h1>       
        <div>
          { this.state.anecdotes[this.state.current].content }
        </div>
        <button onClick={ this.handleClick }> Next </button>
      </div>

    )
  }
}

export default App
