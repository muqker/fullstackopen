import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogEntry = ({ blog, handleDeleteBlog, handleLikeBlog, username }) => {
  const [showDetails, setShowDetails] = useState(false)

  const visibleDetails = { display: showDetails ? '' : 'none' }
  const hiddenDetails = { display: showDetails ? 'none' : '' }

  const toggleDetails = () => {
    setShowDetails(!showDetails)
  }

  const onDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      handleDeleteBlog(blog.id)
    }
  }

  const onLike = () => {
    handleLikeBlog(blog)
  }

  console.log(blog)
  return (
    <div className="blog">
      {blog.title}<span> </span>
      <button style={hiddenDetails} onClick={toggleDetails}>view</button>
      <button style={visibleDetails} onClick={toggleDetails}>hide</button>
      <div style={visibleDetails}>
        likes: {blog.likes} <button onClick={onLike}>like</button> <br />
        <a href={blog.url}>
          {blog.url}
        </a> <br />
        <i> by {blog.author} </i> <br />
        {blog.user.username === username && <button onClick={onDelete}>remove</button>}
      </div>
    </div>
  )
}

BlogEntry.propTypes = {
  blog: PropTypes.object.isRequired,
  handleDeleteBlog: PropTypes.func.isRequired,
  handleLikeBlog: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired
}

export default BlogEntry
