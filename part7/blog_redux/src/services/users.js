import axios from 'axios'
const baseUrl = '/api/users'

let token = null

const setToken = (newToken) => {

  token = newToken
    ? `Bearer ${ newToken }`
    : null
}

const getAll = () => {

  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

export default {
  setToken,
  getAll
}