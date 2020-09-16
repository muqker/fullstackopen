import React from 'react'
import BlogEntry from './BlogEntry'

const BlogList = ({ blogs, handleDeleteBlog }) => {
  return (
    <div>
      <h2>blogs</h2>
      {blogs.map((blog) =>
        <BlogEntry key={blog.id} blog={blog} handleDeleteBlog={handleDeleteBlog} />
      )}
    </div>
  )
}

export default BlogList
