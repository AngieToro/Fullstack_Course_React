import axios from 'axios'

const baseUrl = 'http://localhost:3001/notes'

export const getAll = () => axios
    .get(baseUrl)
    .then (response => response.data)

export const create = ( newNote ) => axios
  .post(baseUrl, newNote)
  .then (response => response.data)

export const update = ( updateNote ) => axios
  .put(`${ baseUrl }/${ updateNote.id }`, updateNote)
  .then (response => response.data)
