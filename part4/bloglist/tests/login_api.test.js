const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const { singleUser } = require('./test_helper')
const { getDataFromToken } = require('../utils/user_helper')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
  const user = singleUser[0]
  const result = await api.post('/api/users').send(user)
  user.id = result.body.id
})

describe('login', () => {
  test('correct login accepted', async () => {
    const user = singleUser[0]
    const result = await api.post('/api/login').send({ username: user.username, password: user.password })
      .expect(200)
    
    expect(result.body.token).toBeDefined()
    expect(result.body.username).toBe(user.username)
    expect(result.body.name).toBe(user.name)
  })

  test('incorrect login not accepted', async () => {
    const user = singleUser[0]
    const result = await api.post('/api/login').send({
      username: user.username,
      password: `${user.password}XX`
    })
      .expect(401)
    
    expect(result.body.error).toContain('invalid username or password')
    expect(result.body.token).not.toBeDefined()
  })
  
  test('token contains correct user id', async () => {
    const user = singleUser[0]
    const result = await api.post('/api/login').send({ username: user.username, password: user.password })
      .expect(200)
    
    const token = result.body.token
    const decoded = getDataFromToken(token)
    expect(decoded.id).toBe(user.id)
  })

  test('invalid tokens do not contain a user id', async () => {
    expect(getDataFromToken('')).toBe(null)
    expect(getDataFromToken('garbage')).toBe(null)
  })
})

afterAll(() => {
  const mongoose = require('mongoose')
  mongoose.connection.close()
})
