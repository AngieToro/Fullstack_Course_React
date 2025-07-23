import counterReducer from '../reducer'
import deepFreeze from 'deep-freeze'

describe('unicafe reducer', () => {

  const initialState = {
    good: 0,
    neutral: 0,
    bad: 0
  }

  test('should return a proper initial state when called with undefined state', () => {

    const state = {}
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = counterReducer(undefined, action)
    console.log('Final State: ', newState)

    expect(newState).toEqual(initialState)
  })

  test('good is incremented', () => {

    const action = {
      type: 'GOOD'
    }

    const state = initialState

    deepFreeze(state)

    const newState = counterReducer(initialState, action)
    console.log('Final State: ', newState)

    expect(newState).toEqual({
      good: 1,
      neutral: 0,
      bad: 0
    })

  })

  test('neutral is incremented', () => {

    const action = {
      type: 'NEUTRAL'
    }

    const state = initialState

    deepFreeze(state)

    const newState = counterReducer(initialState, action)
    console.log('Final State: ', newState)

    expect(newState).toEqual({
      good: 0,
      neutral: 1,
      bad: 0
    })

  })

  test('bad is incremented', () => {

    const action = {
      type: 'BAD'
    }

    const state = initialState

    deepFreeze(state)

    const newState = counterReducer(initialState, action)
    console.log('Final State: ', newState)

    expect(newState).toEqual({
      good: 0,
      neutral: 0,
      bad: 1
    })

  })

})
