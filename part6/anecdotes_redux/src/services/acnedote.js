import axios from 'axios'

const baseUrl =  'http://localhost:3001/anecdotes'

const getAll = async() => {

  const response = await axios.get(baseUrl)
  return response.data
}

const create = async( content ) => {

  const objectAcnedote = {
    content,
    votes: 0
  }

  const response = await axios.post(baseUrl, objectAcnedote)
  return response.data
}

const update = async( acnedote ) => {

  const id = acnedote.id
  
  const objectAcnedote = {
    ...acnedote,
    votes : acnedote.votes + 1
  } 

  const response = await axios.put(`${ baseUrl }/${ id }`, objectAcnedote)
  return response.data
}

export default {
  getAll,
  create,
  update
}