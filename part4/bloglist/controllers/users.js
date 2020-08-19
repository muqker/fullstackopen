const usersRoute = require('express').Router()
const User = require('../models/user')
const hashPassword = require('../utils/user_helper').hashPassword

usersRoute.post('/', async (request, response) => {
  const password = request.body.password
  if (!password || password.length < 3) {
    return response.status(400).json({
      error: '`Password` is shorter than the minimum allowed length (3)'
    })
  }

  const passwordHash = await hashPassword(password)
  const newUser = new User({
    username: request.body.username,
    name: request.body.name,
    passwordHash: passwordHash
  })

  const createdUser = await newUser.save()

  response.status(201).json(createdUser)
})

usersRoute.get('/', async (request, response) => {
  response.json(await User.find({}).populate('blogs'))
})

usersRoute.get('/:id', async (request, response) => {
  const id = request.params.id
  return response.json(await User.findById(id).populate('blogs'))
})

module.exports = usersRoute
