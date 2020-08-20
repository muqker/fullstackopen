const User = require('../models/user')
const { checkPassword, generateToken } = require('../utils/user_helper')
const loginRouter = require('express').Router()

loginRouter.post('/', async (request, response) => {
  const username = request.body.username
  const password = request.body.password

  if (username) {
    const user = await User.findOne({ username: username })
    if (user) {
      const match = await checkPassword(password, user.passwordHash)
      if (match) {
        const token = generateToken(user)
        return response.status(200).send({
          token: token,
          username: user.username,
          name: user.name
        })
      }
    }
  }

  return response.status(401).json({error: 'invalid username or password'})
})

module.exports = loginRouter