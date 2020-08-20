const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user')
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const id = request.params.id
  const blog = await Blog.findById(id).populate('user')
  response.json(blog)
})

blogsRouter.post('/', async (request, response) => {
  const decoded = request.token
  const user = (decoded && decoded.id) ? await User.findById(decoded.id) : null
  if (!user) {
    return response.status(401).json({error: 'invalid or missing token'})
  }

  const blog = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes,
    user: user._id
  }
  const newBlog = new Blog(blog)
  const result = await newBlog.save()

  user.blogs = user.blogs.concat(result._id)
  await user.save()

  response.status(201).json(result)
})

blogsRouter.delete('/:id', async (request, response) => {
  const id = request.params.id
  const blog = await Blog.findById(id)
  if (!blog) {
    return response.status(204).end() // nothing to delete
  }

  const decoded = request.token
  const userId = decoded ? decoded.id : null
  if (blog.user.toString() != userId) {
    return response.status(401).end()
  }
  
  await Blog.findByIdAndDelete(id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const id = request.params.id
  const blog = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes,
  }
  const newBlog = await Blog.findByIdAndUpdate(id, blog, { new: true })
  response.json(newBlog)
})

module.exports = blogsRouter
