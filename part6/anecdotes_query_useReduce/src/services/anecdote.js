import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAll = () => axios
    .get(baseUrl)
    .then (response => response.data)

export const create = ( newAnecdote ) => axios
  .post(baseUrl, newAnecdote)
  .then (response => response.data)

export const update = ( updateAnecdote ) => axios
  .put(`${ baseUrl }/${ updateAnecdote.id }`, updateAnecdote)
  .then (response => response.data)