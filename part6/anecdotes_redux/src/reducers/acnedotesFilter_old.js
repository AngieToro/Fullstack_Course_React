const acnedotesFilter = (state = '', action ) => {

    console.log('Action type filter: ', action.type)
    console.log('Action payrload filter: ', action.payload)

    switch (action.type){
        case 'SET_FILTER': 
            return action.payload
        default: 
            return state
    }
}

export const filterChange = ( filter ) => {

  console.log('Anecdote filter: ', filter)

  return {
    type: 'SET_FILTER',
    payload: filter
  }

}


export default acnedotesFilter