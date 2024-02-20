const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const { v4: uuidv4 } = require('uuid');

const app = express()
app.use(express.json())
app.use(express.static('dist'))
app.use(cors())

app.use(morgan((tokens, req, res) => {
	return [
		tokens.method(req, res),
		tokens.url(req, res),
		tokens.status(req, res),
		tokens.res(req, res, 'content-length'), '-',
		tokens['response-time'](req, res), 'ms',
		JSON.stringify(req.body)
	].join(' ')
}))


let persons = [
	{
		"id": uuidv4(),
		"name": "Arto Hellas",
		"number": "040-123456"
	},
	{
		"id": uuidv4(),
		"name": "Ada Lovelace",
		"number": "39-44-5323523"
	},
	{
		"id": uuidv4(),
		"name": "Dan Abramov",
		"number": "12-43-234345"
	},
	{
		"id": uuidv4(),
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
	const id = req.params.id
	const person = persons.find(person => person.id === id)

	if (person) {
		res.json(person)
	} else {
		res.statusMessage = "No such person exists"
		res.status(404).end()
	}
})

app.delete('/api/persons/:id', (req, res) => {
	//console.log(req.params.id)
	const id = req.params.id
	//console.log(persons)
	// const deletedPerson = persons.find(person => {
	// 	console.log(person.id, typeof(person.id))
	// 	console.log(id, typeof(id))
	// 	console.log(id === person.id)
	// 	return id === person.id
	// })
	//console.log('in index.js, going to delete', deletedPerson)
	persons = persons.filter(person => person.id != id)
	//console.log(persons)
	res.status(204).end()
	
})

app.put('/api/persons/:id', (req, res) => {
	const body = req.body
	console.log('in put request, got this ', req.body)
	// console.log(persons.filter(p => p.name === body.name))
	// console.log(persons.filter(p => p.name === body.name).length)

	if (!body.name || !body.number) {
		return res.status(400).json({
			error: 'content missing'
		})
	} 
	  
	const idx = persons.findIndex(p => p.name === body.name)
	const newPerson = {
		id: persons[idx].id,
		name: body.name,
		number: body.number
	}

	persons = persons.map(p => p.id === persons[idx].id ? newPerson : p)

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
	res.status(204).end()
})

const generateID = () => {
	return
}

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
	console.log(`Server open on port ${PORT}`)
})
