import React, { useState } from 'react'
import PropTypes from 'prop-types'

const CreateBlog = ({ handleCreateBlog }) => {
  const handleSubmit = async (event) => {
    event.preventDefault()
    const success = await handleCreateBlog({ title, author, url })
    console.log(success)
    if (success) {
      setTitle('')
      setAuthor('')
      setUrl('')
    }
  }

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        title: <input id="title" value={title} onChange={(event) => setTitle(event.target.value)} /><br />
        author: <input id="author" value={author} onChange={(event) => setAuthor(event.target.value)}  /><br />
        url: <input id="url" value={url} onChange={(event) => setUrl(event.target.value)}  /><br />
        <input id="create" type="submit" value="create" />
      </form>
    </div>
  )
}

CreateBlog.propTypes = {
  handleCreateBlog: PropTypes.func.isRequired
}

export default CreateBlog