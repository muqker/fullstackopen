const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const { singleBlog, multipleBlogs, singleUser } = require('./test_helper')
const User = require('../models/user')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of multipleBlogs) {
    let obj = new Blog(blog)
    await obj.save()
  }

  await User.deleteMany({})

  for (let user of singleUser) {
    let obj = new User(user)
    await obj.save()
  }
})

describe('get blogs', () => {
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

  test('get single blog', async () => {
    const newBlog = {
      ...singleBlog[0]
    }
    delete newBlog._id

    const postResponse = await api.post('/api/blogs').send(newBlog)
    const newId = postResponse.body._id

    const response = await api.get(`/api/blogs/${newId}`)
    expect(response.body._id).toBe(newId)
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
    expect(postResponse.body.id).toBeDefined()

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

describe('blogs belong to users', () => {
  test('blog object contains owner info', async () => {
    const newBlog = {
      ...singleBlog[0]
    }
    delete newBlog._id

    const postResponse = await api.post('/api/blogs').send(newBlog)
      .expect(201)
    
    const newId = postResponse.body.id

    const response = await api.get(`/api/blogs/${newId}`)
      .expect(200)
    const blog = response.body

    expect(blog.user).toBeDefined()
    expect(blog.user.username).toBeDefined()
    expect(blog.user.name).toBeDefined()
    expect(blog.user.id).toBeDefined()
    expect(blog.user.password).not.toBeDefined()
    expect(blog.user.passwordHash).not.toBeDefined()

    const userResponse = await api.get(`/api/users/${blog.user.id}`)
      .expect(200)
    const user = userResponse.body
    expect(user.blogs).toBeDefined()
    expect(user.blogs).toHaveLength(1)
    expect(user.blogs).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: newBlog.title,
          id: newId,
        })
      ])
    )
  })
})

afterAll(() => {
  const mongoose = require('mongoose')
  mongoose.connection.close()
})
