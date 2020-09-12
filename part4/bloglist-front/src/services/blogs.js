import axios from 'axios'

const getAllBlogs = async () => {
  const result = await axios.get('http://playground:3003/api/blogs')
  return result.data
}

const create = async (details, authorization) => {
  const result = await axios.post(
    'http://playground:3003/api/blogs',
    details,
    {
      headers: { Authorization: `bearer ${authorization.token}` },
    }
  )
  console.log(result)
  return result.data
}

const remove = async (blogId, authorization) => {
  await axios.delete(
    `http://playground:3003/api/blogs/${blogId}`,
    {
      headers: { Authorization: `bearer ${authorization.token}` },
    }
  )
}

export default {
  getAllBlogs,
  create,
  remove
}