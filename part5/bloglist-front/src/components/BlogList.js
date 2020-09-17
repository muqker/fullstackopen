import React from 'react'
import PropTypes from 'prop-types'
import BlogEntry from './BlogEntry'

const BlogList = ({ blogs, handleDeleteBlog, handleLikeBlog, username }) => {
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  return (
    <div>
      <h2>blogs</h2>
      {sortedBlogs.map((blog) =>
        <BlogEntry key={blog.id} blog={blog} handleDeleteBlog={handleDeleteBlog} handleLikeBlog={handleLikeBlog} username={username} />
      )}
    </div>
  )
}

BlogList.propTypes = {
  blogs: PropTypes.array.isRequired,
  handleDeleteBlog: PropTypes.func.isRequired,
  handleLikeBlog: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired
}

export default BlogList
