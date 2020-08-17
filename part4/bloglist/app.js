const config = require('./utils/config')
const logger = require('./utils/logger')
const express = require('express')
const mongoose = require('mongoose')
const app = express()

logger.info(`Connecting to ${config.MONGO_URL}`)
mongoose.connect(config.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => { logger.info('connected to MongoDB') })
  .catch((error) => { logger.error('error connecting to MongoDB:', error.message)})

const cors = require('cors')
app.use(cors())
app.use(express.json())
app.use(require('./utils/middleware').requestLogger)
app.use(require('./utils/middleware').unknownEndpoint)

app.get('/', (request, response) => {
  response.json({ message: 'api ready' })
})

const blogsRouter = require('./controllers/blogs')
app.use('/api/blogs', blogsRouter)

module.exports = app
