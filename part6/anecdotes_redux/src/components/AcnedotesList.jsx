import { useSelector, useDispatch } from 'react-redux'
import { toggleVote } from '../reducers/acnedotesReducer'
import { setNotification } from '../reducers/acnedotesNotification'

const AcnedoteComponent = ( { acnedote, handleVoteClick }) => {

  console.log('Acnedote: ', acnedote)

    return (
        <li> 
            <strong> { acnedote.content} </strong> 
            has { acnedote.votes} votes 
            <button onClick= { handleVoteClick }> Vote</button>
        </li>
    )
}

const AnecdoteList = () => {

  const dispatch = useDispatch()

  const acnedotes = useSelector (( { acnedotes, filter } ) => {

    console.log('List acnedotes filtro: ', filter)
    console.log('List acnedotes: ', acnedotes)

    if (filter) {
      return acnedotes.filter(a => a.acnedote.toLowerCase().includes(filter.toLowerCase()))
    }

    return acnedotes
    
  })

  const handleVote = (acnedote) => {

    dispatch(toggleVote(acnedote))
    dispatch(setNotification(`You voted: "${acnedote.content}"`,5))
}

  return (
    <div>
        <ul>
        { [... acnedotes ]
            .sort( (a, b) =>  b.votes - a.votes )
            .map(acnedote =>
                <AcnedoteComponent
                    key={ acnedote.id }
                    acnedote = { acnedote }
                    handleVoteClick = { () => handleVote (acnedote)}
                />
            )
        }
        </ul>
    </div>
  )
}

export default AnecdoteList