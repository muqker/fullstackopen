import React, { useEffect, useState, useRef } from 'react'

import blogsService from './services/blogs'
import loginService from './services/login'

import Notification from './components/Notification'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import User from './components/User'
import CreateBlog from './components/CreateBlog'
import ToggleVisibility from './components/ToggleVisibility'

import './index.css'


const App = () => {
  const [notification, setNotification] = useState({})
  const [blogs, setBlogs] = useState([])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const toggleCreateRef = useRef()



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

  const handleCreateBlog = async (blogData) => {
    const result = await blogsService.create(blogData, authorization)
    if (result.success) {
      const newBlog = result.data
      setBlogs(blogs.concat(newBlog))
      fireNotification({ type: 'success', message: `a new blog ${newBlog.title} by ${newBlog.author} added` })
      toggleCreateRef.current.toggleShowContent()
      return true
    } else {
      const error = result.error
      console.log(error)
      fireNotification({ type: 'error', message: error })
      return false
    }
  }

  const handleDeleteBlog = async (blogId) => {
    await blogsService.remove(blogId, authorization) // at least wait for a potential exception
    setBlogs(blogs.filter((blog) => blog.id !== blogId))
    fireNotification({ type: 'success', message: 'blog deleted' })
  }

  const handleLikeBlog = async (blog) => {
    const result = await blogsService.like(blog, authorization)
    const updatedBlog = result.data
    setBlogs(blogs.map((i) => i.id === blog.id ? updatedBlog : i))
  }

  return (
    <>
      <h1>Welcome to our great BlogList cave</h1>
      <Notification notification={notification} />
      {! authorization &&
        <LoginForm setUsername={setUsername} setPassword={setPassword} handleLoginSubmit={handleLoginSubmit} />
      }
      {authorization &&
        <User authorization={authorization} handleLogout={handleLogout} />
      }
      
      {authorization &&
        <ToggleVisibility buttonLabel="new blog" ref={toggleCreateRef}>
          <CreateBlog handleCreateBlog={handleCreateBlog} />
        </ToggleVisibility>
      }
      {authorization &&
        <BlogList blogs={blogs} handleDeleteBlog={handleDeleteBlog} handleLikeBlog={handleLikeBlog} username={authorization.username} />
      }
    </>
  )
}

export default App
