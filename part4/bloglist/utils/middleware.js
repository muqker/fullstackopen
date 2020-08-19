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
  response.status(404).send( { error: `unkown endpoint: ${request.path}` })
}

const errorHandler = (error, request, response, next) => {
  if (error.name === 'ValidationError')
    return response.status(400).json({ error: error.message })
  if (error.name === 'CastError')
    return response.status(400).send({ error: 'malformatted id' })
  
  logger.error(error)
  
  next(error)
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler
}