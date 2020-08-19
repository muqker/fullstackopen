const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const { hashPassword, checkPassword } = require('../utils/user_helper')
const api = supertest(app)
const singleUser = require('./test_helper').singleUser
const multipleUsers = require('./test_helper').multipleUsers

beforeEach(async () => {
  await User.deleteMany({})
  for (let user of multipleUsers) {
    let obj = new User(user)
    await obj.save()
  }
})

describe('managing users', () => {
  test('user created', async () => {
    const newUser = singleUser[0]
    
    await api.post('/api/users').send(newUser)
      .expect(201)
      .expect('Content-type', /application\/json/)
    
    const response = await api.get('/api/users')

    expect(response.body.length).toBe(multipleUsers.length + 1)
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          username: newUser.username,
          name: newUser.name,
        })
      ])
    )

    expect(response.body.filter(item => item.passwordHash)).toHaveLength(0)
    expect(response.body.filter(item => item.password)).toHaveLength(0)
  })

  test('duplicate user creation', async () => {
    const newUser = { ...multipleUsers[0], password: 'something' }

    const response = await api.post('/api/users').send(newUser)
      .expect(400)
    expect(response.body.error).toContain('`username` to be unique')

    const finalCount = (await api.get('/api/users')).body.length
    expect(finalCount).toEqual(multipleUsers.length)
  })

  test('short name user creation', async () => {
    const newUser = {
      ...multipleUsers[0],
      password: 'something',
      username: '12'
    }

    const response = await api.post('/api/users').send(newUser)
      .expect(400)
    expect(response.body.error).toContain('is shorter')

    const finalCount = (await api.get('/api/users')).body.length
    expect(finalCount).toEqual(multipleUsers.length)
  })

  test('short password', async () => {
    const newUser = {
      ...multipleUsers[0],
      password: '12',
    }

    const response = await api.post('/api/users').send(newUser)
      .expect(400)
    expect(response.body.error).toContain('is shorter')

    const finalCount = (await api.get('/api/users')).body.length
    expect(finalCount).toEqual(multipleUsers.length)
  })

  test('missing password', async () => {
    const newUser = {
      ...multipleUsers[0],
    }
    delete newUser.password

    const response = await api.post('/api/users').send(newUser)
      .expect(400)
    expect(response.body.error).toContain('is shorter')

    const finalCount = (await api.get('/api/users')).body.length
    expect(finalCount).toEqual(multipleUsers.length)
  })

  test('retrieve users', async () => {
    const response = await api.get('/api/users')
      .expect(200)
    expect(response.body.map(item => item.username)).toContain(multipleUsers[1].username)
    expect(response.body.map(item => item.name)).toContain(multipleUsers[1].name)
    expect(response.body.filter(item => item.password)).toHaveLength(0)
    expect(response.body.filter(item => item.passwordHash)).toHaveLength(0)
  })

  test('retrieve one user', async () => {
    const user = singleUser[0]
    const userObj = await User(user).save()

    const response = await api.get(`/api/users/${userObj._id}`)
      .expect(200)
    expect(response.body.username).toBe(userObj.username)
    expect(response.body.id).toBe(String(userObj._id))
  })
})

describe('password', () => {
  test('correct password works', async () => {
    const pass = singleUser[0].password
    const hashed = await hashPassword(pass)
    const result = await checkPassword(pass, hashed)
    expect(result).toEqual(true)
  })

  test('wrong password fails', async () => {
    const pass = singleUser[0].password
    const hashed = await hashPassword(pass)
    const result = await checkPassword(`${pass}x`, hashed)
    expect(result).toEqual(false)
  })
})

afterAll(() => {
  const mongoose = require('mongoose')
  mongoose.connection.close()
})
