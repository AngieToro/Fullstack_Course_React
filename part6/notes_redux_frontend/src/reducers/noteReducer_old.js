const initialState = [
  {
    content: 'Reducer defines how redux store works',
    important: true,
    id: 1,
  },
  {
    content: 'State of store can contain any data',
    important: false,
    id: 2,
  }
]

const noteReducer = ( state = initialState, action) => {

  switch (action.type) {
  case 'NEW_NOTE':
    return [...state, action.payload]
    //return state.concat(action.payload)
  case 'TOGGLE_IMPORTANCE' : {
    const id = action.payload.id
    const noteToChange =  state.find(note => note.id === id)

    const changedNote = {
      ...noteToChange,
      important: !noteToChange.important
    }

    // todas las notas del estado anterior, excepto la nota deseada, que se reemplaza con su copia ligeramente alterada
    return state.map(note =>
      note.id === id
        ? changedNote
        : note
    )
  }

  default:
    return state
  }
}

const generateId = () => {

  Number((Math.random() * 1000000).toFixed(0))
}

//action creators (creadores de acciones).
export const createNote = ( content ) => {

  console.log('Content note: ', content)

  return {
    type: 'NEW_NOTE',
    payload: {
      content,
      important: false,
      id: generateId()
    }
  }
}

export const toggleImportanceOf = ( id ) => {

  console.log('Id note: ', id)

  return {
    type: 'TOGGLE_IMPORTANCE',
    payload: {
      id
    }
  }
}

export default noteReducer