const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const SALT = require('../utils/config').SALT
const SECRET = require('../utils/config').SECRET

const hashPassword = async (password) => await bcrypt.hash(password, SALT)
const checkPassword = async (password, hash) => await bcrypt.compare(password, hash)
const getDataFromToken = (token) => {
  if (!token)
    return null
  
  try {
    const decoded = jwt.verify(token, SECRET)
    if (!decoded)
      return null
  
    return decoded
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError)
      return null
  }
}

const generateToken = (user) => {
  const unencoded = { id: user.id }
  return jwt.sign(unencoded, SECRET)
}

module.exports = {
  hashPassword,
  checkPassword,
  getDataFromToken,
  generateToken
}