import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
  const result = axios.get(baseUrl).then(response => response.data)
  console.log(result)
  return result
}

const remove = id => {
  return axios.delete(`${baseUrl}/${id}`)
}

const update = person => {
  return axios.put(`${baseUrl}/${person.id}`, person).then(response => response.data)
}

const add = person => {
  return axios.post(`${baseUrl}`, person).then(response => response.data)
}

export default {getAll, remove, update, add}
