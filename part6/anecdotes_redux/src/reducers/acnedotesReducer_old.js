const initialState = [
  {
    acnedote: 'Reducer defines how redux store works',
    votes: 10,
    id: 1,
  },
  {
    acnedote: 'State of store can contain any data',
    votes: 5,
    id: 2,
  }
]

const acnedotesReducer = ( state = initialState, action) => {

  console.log('Reducer state actual: ', state)
  console.log('Reducer action type: ', action.type)
  console.log('Reducer action payload: ', action.payload)
    
  switch (action.type) {
  case 'NEW_ANECDOTE':
    return [...state, action.payload]
  case 'VOTE': {

    const id = action.payload.id
    console.log('Id recieved: ', id)
    
    const acnedoteToChange =  state.find( acnedote => acnedote.id === id)
    console.log('Acnedote found: ', acnedoteToChange)

    const changedAcnedote = {
      ...acnedoteToChange,
      votes: acnedoteToChange.votes + 1
    }

    console.log('Acnedote changed: ', changedAcnedote)
    
    return state.map(acnedote =>
      acnedote.id === id
        ? changedAcnedote
        : acnedote
    )
  
  }
    
  default:
    return state
  }
}

const generateId = () => Number((Math.random() * 1000000).toFixed(0))

export const createAcnedote = ( acnedote ) => {

  console.log('Acnedote: ', acnedote)

  return {
    type: 'NEW_ANECDOTE',
    payload: {
      acnedote,
      votes: 0,
      id: generateId()
    }
  }
}

export const toggleVote = ( id ) => {

  console.log('Anecdote id to vote: ', id);

  return {
    type: 'VOTE',
    payload: {
      id
    }
  }
  
}

export default acnedotesReducer