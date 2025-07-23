import { useState } from 'react'

function App() {

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const handleAnecdoteClick = () => {
    let indexRandom 
    
    do {
      indexRandom = Math.floor(Math.random() * anecdotes.length)
      console.log('Index random: ', indexRandom)
      console.log('Anecdote: ', anecdotes[indexRandom])
      console.log('Select: ', selected)
    } while (indexRandom === selected)
   
      //forzar que al menos se genere un índice nuevo una vez, y repetir solo si es igual al actual. Esto evita mostrar la misma anécdota dos veces seguidas.
    setSelected(indexRandom)
  }

  const handleVoteClick = () => {
    const newVotes = [...votes]
    newVotes[selected] += 1
    console.log('New votes +: ', newVotes)
    setVotes(newVotes)
  }

  const maxVotes = Math.max(...votes)
  console.log('Max votes, ', maxVotes)

  const maxIndex = votes.indexOf(maxVotes)
  console.log('Max index', maxIndex)

  return (
      <div>
        <h1>The Anecdote is</h1>
        <p style={{ color: 'blue'}}>
          {anecdotes[selected]}
        </p>
        <p>
          Has <strong> {votes[selected]} </strong> votes
        </p>
        <p>
          <button onClick={handleAnecdoteClick}> Next Anecdote </button>
          <button onClick={handleVoteClick}>Vote</button>
        </p>
        <h2>Anecdotes List</h2>
        <ul>
          {anecdotes.map((anecdote, index) => (
          <li key={index}>
            <strong>{anecdote}</strong> ---- <strong>{votes[index]}</strong> votes
          </li>
          ))}
        </ul>
        <h1>Anecdote with most votes</h1>
        <p style={{ color: 'green'}}> {anecdotes[maxIndex]}</p>
      </div>
  )
}

export default App