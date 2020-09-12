import React from 'react'

const Blogs = ({ blogs, handleDeleteBlog }) => {
  return (
    <div>
      <h2>blogs</h2>
      <ol>
        {blogs.map((blog) =>
          <li key={blog.id}>
            <a href={blog.url}>
              {blog.title}
            </a>
            <i> by {blog.author} </i>
            <button onClick={() => handleDeleteBlog(blog.id)}>delete</button>
          </li>
        )}
      </ol>      
    </div>
  )
}

export default Blogs
