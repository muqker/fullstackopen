const config = require('./utils/config')
const logger = require('./utils/logger')
const express = require('express')
require('express-async-errors')
const mongoose = require('mongoose')
const app = express()

logger.info(`Connecting to ${config.MONGO_URL}`)
mongoose.connect(config.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(() => { logger.info('connected to MongoDB') })
  .catch((error) => { logger.error('error connecting to MongoDB:', error.message)})

const cors = require('cors')
app.use(cors())
app.use(express.json())
app.use(require('./utils/middleware').requestLogger)

app.get('/', (request, response) => {
  response.json({ message: 'api ready' })
})

app.use(require('./utils/middleware').authorization)

app.use('/api/blogs', require('./controllers/blogs'))
app.use('/api/users', require('./controllers/users'))
app.use('/api/login', require('./controllers/login'))

app.use(require('./utils/middleware').unknownEndpoint)
app.use(require('./utils/middleware').errorHandler)

module.exports = app
