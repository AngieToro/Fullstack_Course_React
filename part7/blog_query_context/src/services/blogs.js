import axios from 'axios'
const baseUrl = '/api/blogs'

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

const create = async (newObject) => {

  const config = {
    headers: {
      Authorization: token
    }
  }

  console.log('New objet: ', newObject)

  const response = await axios.post(baseUrl, newObject, config)

  return response.data
}

const deleteById = async (id) => {

  const config = {
    headers: {
      Authorization: token
    }
  }

  const response = await axios.delete(`${baseUrl}/${id}`, config)

  return response.data
}

const update = async (id, newObject) => {

  const config = {
    headers: {
      Authorization: token
    }
  }

  const response = await axios.put(`${baseUrl}/${id}`, newObject, config)

  return response.data
}

const blogComments = async( comment, blog ) => {

  const config = {
    headers: {
      Authorization: token
    }
  }

  console.log('Service comment: ', comment)
  console.log('Service ID: ', blog.id)

  const response = await axios.post(`${baseUrl}/${blog}/comments`, { comment }, config)

  return response.data

}

export default {
  setToken,
  getAll,
  create,
  deleteById,
  update,
  blogComments
}