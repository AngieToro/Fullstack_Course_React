import { createSlice, current } from '@reduxjs/toolkit'
import NoteService from '../services/notes'


/*
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
*/

//const generateId = () => Number((Math.random() * 1000000).toFixed(0))

const noteSlice = createSlice ({

  name: 'notes', // define el prefijo que se utiliza en los valores de tipo de la acción
  initialState: [],
  reducers:{
    //action -> notes/toggleImportanceOf
    toggleImportanceOf(state, action){

      console.log('toggleImportanceOf note state: ', current(state))
      console.log('toggleImportanceOf note action: ', action)

      const id = action.payload

      const noteToChange =  state.find(note => note.id === id)

      const changedNote = {
        ...noteToChange,
        important: !noteToChange.important
      }

      return state.map(note =>
        note.id === id
          ? changedNote
          : note
      )
    },
    appendNote(state, action) {

      console.log('appendNote state: ', current(state))
      console.log('appendNote action: ', action)

      state.push(action.payload)
    },
    setNotes(state, action){

      console.log('setNotes state: ', current(state))
      console.log('setNotes action: ', action)

      return action.payload
    }
  }
})

export const { toggleImportanceOf, appendNote ,setNotes } = noteSlice.actions

//action creators asíncronos
//primero se obtienen todas las notas del servidor y luego hace el dispatch de la acción setNotes, que las agrega al store
export const initializeNotes = () => {

  return async dispatch => {
    const notes = await NoteService.getAll()
    dispatch(setNotes(notes))
  }
}

//operación asíncrona
export const createNote = (content) => {

  console.log('Create note content: ', content)

  return async dispatch => {
    const newNote = await NoteService.create(content)
    dispatch (appendNote(newNote))
  }
}

export default noteSlice.reducer