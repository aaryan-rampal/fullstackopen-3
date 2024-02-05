const express = require('express')
const { v4: uuidv4 } = require('uuid');
const app = express()
app.use(express.json())

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
	const num = persons.length
	const currentDate = new Date();
	console.log(num, currentDate)
	res.send(`
		<a href="/api/persons">Phonebook has info for ${num} ${num == 1 ? 'person' : 'people'}</a>
		<p>${currentDate.toString()}</p>
		`)
})

app.get('/api/persons', (req, res) => {
	res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
	const id = Number(req.params.id)
	const person = persons.find(person => person.id === id)

	if (person) {
		res.json(person)
	} else {
		res.statusMessage = "No such person exists"
		res.status(404).end()
	}
})

app.delete('/api/persons/:id', (req, res) => {
	const id = Number(req.params.id)
	persons = persons.filter(person => person.id != id)
	res.status(204).end()
})

app.post('/api/persons/', (req, res) => {
	const body = req.body
	console.log(req.body)
	console.log(persons.filter(p => p.name === body.name))
	console.log(persons.filter(p => p.name === body.name).length)

	if (!body.name || !body.number) {
		return res.status(400).json({
			error: 'content missing'
		})
	} else if (persons.filter(person => person.name === body.name).length != 0) {
		return res.status(400).json({
			error: 'name must be unique'
		})
	}

	const newPerson = {
		id: uuidv4(),
		name: body.name,
		number: body.number
	}

	persons = persons.concat(newPerson)
	res.json(newPerson)
})

const generateID = () => {
	return 
}

const PORT = 3001
app.listen(PORT, () => {
	console.log(`Server open on port ${PORT}`)
})