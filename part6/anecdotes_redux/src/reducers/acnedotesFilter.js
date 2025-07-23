import { createSlice } from '@reduxjs/toolkit'

const acnedotesFilterSlice = createSlice ({

  name: 'acnedotesFilter',
  initialState: '',
  reducers:{
    filterChange (state, action){
      
      console.log('filterChange action: ', action)

      return action.payload

    }
  }
})

export const { filterChange } = acnedotesFilterSlice.actions

export default acnedotesFilterSlice.reducer