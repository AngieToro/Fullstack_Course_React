import axios from '../../../json-server/node_modules/axios'

const baseUrl = 'http://localhost:3000/notes' //ejemplo local (part2/json-server)
//const baseUrl = 'http://localhost:3001/api/notes' //server express (part3/practice)

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = (newObject) => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

export default { getAll, create, update: update }