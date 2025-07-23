import { createSlice, current } from '@reduxjs/toolkit'
import AcnedoteServices from '../services/acnedote'

/*
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
*/
const acnedotesSlide = createSlice({

  name: 'acnedotes',
  initialState: [],
  reducers: {
    appendAcnedote(state, action) {

      console.log('appendAcnedote state: ', current(state))
      console.log('appendAcnedote action: ', action)

      state.push(action.payload)
    },
    setAcnedote(state, action){

      console.log('setAcnedote state: ', current(state))
      console.log('setAcnedote action: ', action)

      return action.payload
    },
    updateAcnedote(state, action){

      console.log('setUpdateAcnedote state: ', current(state))
      console.log('setUpdateAcnedote action: ', action)

      const updated = action.payload

      return state.map(acnedote => 
        acnedote.id === updated.id
          ? updated
          : acnedote
      )
    },
  }
})

export const { appendAcnedote, setAcnedote, updateAcnedote } = acnedotesSlide.actions

export const initializeAcnedotes = () => {

  return async dispatch => {
    const acnedotes = await AcnedoteServices.getAll()
    dispatch(setAcnedote(acnedotes))
  }
}

 export const createAcnedote = (content) => {
     
  console.log('Create acnedote: ', content)
      
  return async dispatch => {
    const acnedoteNew = await AcnedoteServices.create(content)
    dispatch(appendAcnedote(acnedoteNew))
  }
      
}

export const toggleVote = ( acnedote ) => {

  return async dispatch => {
    const acnedoteUpdate = await AcnedoteServices.update(acnedote)
    dispatch(updateAcnedote(acnedoteUpdate))
  }
}

export default acnedotesSlide.reducer