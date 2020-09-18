const testingRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

const reset = async (request, response) => {
  await Promise.all([
    Blog.deleteMany({}),
    User.deleteMany({})
  ])
  response.status(200).json({ 'message': 'blogs reset, users reset' })
}

testingRouter.get('/reset', reset) // not very rest, but a quickw ay to rest easily from the browser
testingRouter.post('/reset', reset)

module.exports = testingRouter