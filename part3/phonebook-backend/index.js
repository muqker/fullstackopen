const express = require('express')
const process = require('process')
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()
const Person = require('./models/person')

const logger = morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    // body
    Object.keys(req.body).length ? JSON.stringify(req.body) : ''
  ].join(' ')
})

const app = express()
app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(logger)

app.get('/info', (req, res) => {
  Person.find({}).then(persons => 
    res.send(
      `<p>Phonebook has info for ${persons.length} people</p>` 
      + `<p>${new Date()}</p>`
    )
  )
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => response.json(persons))
})

app.get('/api/persons/:id', (request, response, next) => {
  Person
    .findById(request.params.id)
    .then(person => {
      console.log(person)
      if (! person)
        return response.status(404).end()
      response.json(person)
    })
    .catch(error => {
      next(error)
    })  
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then((/*result*/) => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons/', (request, response, next) => {
  const body = request.body

  // add it 
  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save()
    .then(savedPerson => response.json(savedPerson))
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body
  const person = {
    name: body.name,
    number: body.number,
  }
  console.log(request.params.id)
  console.log(person)

  Person
    .findByIdAndUpdate(request.params.id, person, 
      {new: true, runValidators: true, context: 'query'})
    .then(updatedPerson => response.json(updatedPerson))
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  console.log('Error', error)
  if (error.name === 'CastError')
    return response.status(400).send({error: 'malformed id'})
  if (error.name === 'ValidationError')
    return response.status(400).json({error: error.message})
  next(error)
}

app.use(unknownEndpoint)
app.use(errorHandler)

const port = process.env.PORT
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
