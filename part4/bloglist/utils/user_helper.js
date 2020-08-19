const bcrypt = require('bcrypt')
const SALT = require('../utils/config').SALT

const hashPassword = async (password) => await bcrypt.hash(password, SALT)
const checkPassword = async (password, hash) => await bcrypt.compare(password, hash)

module.exports = {
  hashPassword,
  checkPassword
}