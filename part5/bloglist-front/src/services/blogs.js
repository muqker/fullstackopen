import axios from 'axios'

const getAllBlogs = async () => {
  const result = await axios.get('http://playground:3003/api/blogs')
  return result.data
}

const authorizationHeader = (authorization) => {
  return {
    headers: { Authorization: `bearer ${authorization.token}` },
  }
}

const create = async (details, authorization) => {
  try {
    const result = await axios.post(
      'http://playground:3003/api/blogs',
      details,
      authorizationHeader(authorization)
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
    authorizationHeader(authorization)
  )
}

const like = async (blog, authorization) => {
  const patch = {
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes + 1
  }

  const result = await axios.put(
    `http://playground:3003/api/blogs/${blog.id}`,
    patch
  )

  return {
    success: true,
    data: result.data
  }  
}

export default {
  getAllBlogs,
  create,
  remove,
  like
}