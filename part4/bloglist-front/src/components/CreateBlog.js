import React from 'react'

const CreateBlog = ({ setTitle, setAuthor, setUrl, handleCreateBlog }) => {
  const handleSubmit = (event) => {
    event.preventDefault()
    handleCreateBlog()
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        title: <input onChange={(event) => setTitle(event.target.value)} /><br />
        author: <input onChange={(event) => setAuthor(event.target.value)}  /><br />
        url: <input onChange={(event) => setUrl(event.target.value)}  /><br />
        <input type="submit" value="create" /><br />
      </form>
    </div>
  )
}

export default CreateBlog