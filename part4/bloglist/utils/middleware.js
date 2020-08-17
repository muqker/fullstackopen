const logger = require('./logger')

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:', request.path)
  logger.info('Body:', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  //logger.error('unknown endpoint', request.path)
  response.status(404).send( { error: 'unkown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  //logger.log(error)
  if (error.name === 'ValidationError')
    response.status(400).json({ error: error.message })
  
  next(error)
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler
}