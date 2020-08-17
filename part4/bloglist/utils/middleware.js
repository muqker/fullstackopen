const logger = require('./logger')

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:', request.path)
  logger.info('Body:', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  logger.error('unknown endpoint')
  response.status(404).send( { error: 'unkown endpoint' })
}

module.exports = {
  requestLogger,
  unknownEndpoint
}