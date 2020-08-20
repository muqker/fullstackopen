const process = require('process')
require('dotenv').config()

const PORT = process.env.PORT
const MONGO_URL = process.env.NODE_ENV === 'test' ? process.env.TEST_MONGO_URL : process.env.MONGO_URL
const SALT = Number(process.env.SALT)
const SECRET = process.env.SECRET

module.exports = {
  PORT,
  MONGO_URL,
  SALT,
  SECRET
}