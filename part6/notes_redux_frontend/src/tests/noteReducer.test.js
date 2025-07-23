import noteReducer from '../reducers/noteReducer'
import deepFreeze from 'deep-freeze'

describe('note reducer', () => {

  test('return new state with action notes/createNote', () => {

    const state = []
    const action = {
      type: 'notes/createNote',
      payload: 'The app state is in reduz store'
    }

    // asegura que el reducer no cambie el estado del store que se le dio como parámetro. Si el reducer usa el comando push para manipular el estado, la prueba no pasará
    deepFreeze(state)
    const newState = noteReducer(state, action)

    expect(newState).toHaveLength(1)
    expect(newState.map(state => state.content)).toContainEqual(action.payload)
  })

  test('return new state with action notes/toggleImportanceOf', () => {

    const state = [
      {
        content: 'The app state is in reduz store',
        important: true,
        id: 1
      },
      {
        content: 'State changes are made with actions',
        important: false,
        id: 2
      }
    ]

    const action = {
      type: 'notes/toggleImportanceOf',
      payload: 2
    }

    deepFreeze(state)
    const newState = noteReducer(state, action)

    expect(newState).toHaveLength(2)
    expect(newState).toContainEqual(state[0])
    expect(newState).toContainEqual({
      content: 'State changes are made with actions',
      important: true,
      id: 2
    })
  })
})
