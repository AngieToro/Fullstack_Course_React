import axios from 'axios'

const baseUrl = '/api/notes'

let token = null

const setToken = (newToken) => {
  token = newToken
    ? `Bearer ${ newToken }`
    : null
}

const getAll = () => {

  const request = axios.get(baseUrl)
  console.log('Response gettAll note: ', request)

  return request.then(response => response.data)
}

const create = async (newObject) => {

  const config = {
    headers: {
      Authorization: token
    }
  }

  const response = await axios.post(baseUrl, newObject, config)
  console.log('Response create note: ', response)

  return response.data
}

const update = (id, newObject) => {

  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const deleteId = (id) => {

  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}

export default {
  getAll,
  create,
  update,
  deleteId,
  setToken
}