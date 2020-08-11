const mongoose = require('mongoose')
const process = require('process')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]
const connString = `mongodb+srv://muqker:${password}@cluster0.eufzv.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(connString, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length < 5) {
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
} else {
  const name = process.argv[3]
  const number = process.argv[4]
  const person = new Person({
    name: name,
    number: number
  })
  
  person.save().then((/*result*/) => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
}
