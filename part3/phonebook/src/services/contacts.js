import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
  const result = axios.get(baseUrl).then(response => response.data)
  console.log(result)
  return result
}

const remove = id =>
  axios.delete(`${baseUrl}/${id}`)


const update = person =>
  axios.put(`${baseUrl}/${person.id}`, person).then(response => response.data)

const add = person =>
  axios.post(`${baseUrl}`, person).then(response => response.data)

export default { getAll, remove, update, add }
