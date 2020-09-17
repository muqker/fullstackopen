import React from 'react'
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

export default BlogList
