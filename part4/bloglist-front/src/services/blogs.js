import axios from 'axios'

const getAllBlogs = async () => {
  const result = await axios.get('http://playground:3003/api/blogs')
  return result.data
}

const create = async (details, authorization) => {
  try {
    const result = await axios.post(
      'http://playground:3003/api/blogs',
      details,
      {
        headers: { Authorization: `bearer ${authorization.token}` },
      }
    )
    console.log(result)
    return {
      success: true,
      data: result.data
    }
  } catch (error) {
    if (error.response.status === 400)
      return {
        success: false,
        error: error.response.data.error
      }
    else
      throw error
  }
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