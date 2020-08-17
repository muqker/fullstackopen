const supertest = require('supertest')
const app = require('../app')
const multipleBlogs = require('./test_helper').multipleBlogs
const singleBlog = require('./test_helper').singleBlog
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of multipleBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

describe('get all blogs', () => {
  test('get blogs and check length', async () => {
    const response = await api.get('/api/blogs')
      .expect(200)
      .expect('Content-type', /application\/json/)

    expect(response.body).toHaveLength(multipleBlogs.length)
  })

  test('get blogs and check json', async () => {
    const response = await api.get('/api/blogs')
    
    const contents = response.body.map(item => item.title)
    expect(contents).toContain('React patterns')
    expect(contents).toContain('TDD harms architecture')
  })

  test('correct id field', async () => {
    const response = await api.get('/api/blogs')
    const blog = response.body[0]
    expect(blog.id).toBeDefined()
    expect(blog._id).not.toBeDefined()
  })
})

describe('posting blogs', () => {
  test('posted blog is returned and saved', async () => {
    const newBlog = {
      ...singleBlog[0]
    }
    delete newBlog._id

    const postResponse = await api.post('/api/blogs').send(newBlog)
      .expect(201)
      .expect('Content-type', /application\/json/)
    
    expect(postResponse.body.title).toBe(newBlog.title)

    const getResponse = await api.get('/api/blogs')
    expect(getResponse.body).toHaveLength(multipleBlogs.length + 1)

    const contents = getResponse.body.map(item => item.title)
    expect(contents).toContain(newBlog.title)
  })

  test('likes default to 0', async () => {
    const newBlog = {
      ...singleBlog[0]
    }
    delete newBlog._id
    delete newBlog.likes

    const postResponse = await api.post('/api/blogs').send(newBlog)
      .expect(201)
      .expect('Content-type', /application\/json/)

    expect(postResponse.body.likes).toStrictEqual(0)
  })

  test('posted blog must have title', async () => {
    const newBlog = {
      ...singleBlog[0]
    }
    delete newBlog._id
    delete newBlog.title

    const response = await api.post('/api/blogs').send(newBlog)
      .expect(400)
    
    expect(response.body.error).toContain('validation failed')
    expect(response.body.error).toContain('Path `title` is required')
  })

  test('posted blog must have url', async () => {
    const newBlog = {
      ...singleBlog[0]
    }
    delete newBlog._id
    delete newBlog.url

    const response = await api.post('/api/blogs').send(newBlog)
      .expect(400)
    
    expect(response.body.error).toContain('validation failed')
    expect(response.body.error).toContain('Path `url` is required')
  })
})

describe('deleting blogs', () => {
  test('delete with invalid id', async () => {
    await api.delete('/api/blogs/bogus')
      .expect(400)
    
    await api.delete('/api/blogs/555555555555555555555555')
      .expect(204) // no special error when the id was not found
  })

  test('delete a blog removes it', async () => {
    await api.delete(`/api/blogs/${multipleBlogs[1]._id}`)
      .expect(204)
    
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(multipleBlogs.length - 1)
  })
})

describe('update blogs', () => {
  test('put with invalid id', async () => {
    const newBlog = singleBlog[0]
    await api.put('/api/blogs/bogus').send(newBlog)
      .expect(400)

    await api.put('/api/blogs/555555555555555555555555').send(newBlog)
      .expect(200) // no special error when the id was not found
  })

  test('edit a blog', async () => {
    const newBlog = singleBlog[0]
    const putResponse = await api.put(`/api/blogs/${multipleBlogs[1]._id}`).send(newBlog)
    expect(putResponse.body.title).toBe(newBlog.title)
    expect(putResponse.body.likes).toBe(newBlog.likes)
    expect(putResponse.body.id).toBe(multipleBlogs[1]._id)
    
    const getResponse = await api.get('/api/blogs')
    const contents = getResponse.body.map(item => item.title)
    expect(contents).toContain(newBlog.title)
  })
})

afterAll(() => {
  const mongoose = require('mongoose')
  mongoose.connection.close()
})
