const express = require('express')
const app = express()
app.use(express.json())
const morgan = require('morgan')
app.use(morgan('tiny'))

// let notes = [
//   {
//     id: 1,
//     content: "HTML is easy",
//     date: "2022-01-10T17:30:31.098Z",
//     important: true
//   },
//   {
//     id: 2,
//     content: "Browser can execute only Javascript",
//     date: "2022-01-10T18:39:34.091Z",
//     important: false
//   },
//   {
//     id: 3,
//     content: "GET and POST are the most important methods of HTTP protocol",
//     date: "2022-01-10T19:20:14.298Z",
//     important: true
//   }
// ]
let persons = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

const generateId = () => {
  const maxId = persons.length > 0
    ? Math.max(...persons.map(n => n.id))
    : 0
  return maxId + 1
}

// app.post('/api/notes', (request, response) => {
//   const body = request.body

//   if (!body.content) {
//     return response.status(400).json({ 
//       error: 'content missing' 
//     })
//   }

//   const note = {
//     content: body.content,
//     important: body.important || false,
//     date: new Date(),
//     id: generateId(),
//   }

//   notes = notes.concat(note)

//   response.json(note)
// })

app.post('/api/persons', (req, res) => {
  const body  = req.body

  if(!body.name){
      return res.status(400).json({error: 'name is missing'})
  }

  if(!body.number){
      return res.status(400).json({error: `must include number`})
  }
  if(persons.some(entry => entry.name === body.name)){
    return res.status(400).json({error: "this name already exists in the phonebook"})
  }
  let entry = {
    id: generateId(),
    name: body.name,
    number: body.number
  }

  person = persons.push(entry)

  res.json(entry)
})

// app.get('/api/notes', (req, res) => {
//   res.json(notes)
// })

// app.delete('/api/notes/:id', (request, response) => {
//   const id = Number(request.params.id)
//   notes = notes.filter(note => note.id !== id)
//   response.status(204).end()
// })

app.delete('/api/persons/:id',(req,res) => {
  const id = Number(req.params.id)
  persons = persons.filter(entry => entry.id != id)
  res.status(204).end()
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(persons => persons.id === id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.get('/api/persons', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(persons => persons.id === id)

  if (persons) {
    response.json(persons)
  } else {
    response.status(404).end()
  }
})

app.get('/info', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(persons => persons.id === id)
  const currentDate = new Date()

  if (persons) {
    response.send(`<h1>Phonebook has info for ${persons.length} people</h1>
                    <div>${currentDate}</div>`)
    console.log(response.date)
  } else {
    response.status(404).end()
  }
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})