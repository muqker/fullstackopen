import React, { useEffect, useState } from 'react'

import blogsService from './services/blogs'
import loginService from './services/login'

import Notification from './components/Notification'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import User from './components/User'
import CreateBlog from './components/CreateBlog'

import './index.css'

const App = () => {
  const [notification, setNotification] = useState({})
  const [blogs, setBlogs] = useState([])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const [authorization, setAuthorization] = useState(null)

  useEffect(() => {
    const updateBlogs = async () => {
      const updatedBlogs = await blogsService.getAllBlogs()
      setBlogs(updatedBlogs)
    }
    updateBlogs()
  }, [])

  useEffect(() => {
    const authorization = loginService.loadAuthorization()
    setAuthorization(authorization)
  }, [])

  const fireNotification = (notification) => {
    setNotification(notification)
    setTimeout(() => { setNotification({})}, 3000)
  }

  const handleLoginSubmit = async () => {
    const authorization = await loginService.requestAuthorization(username, password)
    setUsername('')
    setPassword('')
    fireNotification({
      type: authorization ? 'success' : 'error',
      message: authorization ? `${authorization.username} has logged in` : 'login failed'
    })

    loginService.persistAuthorization(authorization)
    setAuthorization(authorization)
  }

  const handleLogout = () => {
    loginService.persistAuthorization(null)
    setAuthorization(null)
    fireNotification({
      type: 'success',
      message: 'logged out'
    })
  }

  const handleCreateBlog = async () => {
    const newBlog = await blogsService.create({ title, author, url }, authorization)
    setBlogs(blogs.concat(newBlog))
    fireNotification({ type: 'success', message: `a new blog ${newBlog.title} by ${newBlog.author} added` })
  }

  const handleDeleteBlog = async (blogId) => {
    await blogsService.remove(blogId, authorization) // at least wait for a potential exception
    setBlogs(blogs.filter((blog) => blog.id !== blogId))
    fireNotification({ type: 'success', message: 'blog deleted' })
  }

  const loginFormPartial = () =>
    <LoginForm setUsername={setUsername} setPassword={setPassword} handleLoginSubmit={handleLoginSubmit} />

  const userPartial = () =>
    <User authorization={authorization} handleLogout={handleLogout} />

  const blogsPartial = () =>
    <Blogs blogs={blogs} handleDeleteBlog={handleDeleteBlog} />

  const createBlogPartial = () =>
    <CreateBlog setTitle={setTitle} setAuthor={setAuthor} setUrl={setUrl} handleCreateBlog={handleCreateBlog} />


  return (
    <>
      <h1>Welcome to our great BlogList cave</h1>
      <Notification notification={notification} />
      {authorization ? userPartial() : loginFormPartial()}
      {authorization && createBlogPartial()}
      {authorization && blogsPartial()}
    </>
  )
}

export default App
