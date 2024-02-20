import { useState, useEffect } from 'react'
import personService from './services/notes'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Person from './components/Person'


const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredValue, setFilteredValue] = useState('')

  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(filteredValue.toLowerCase()))

  const hook = () => {
    console.log('in hook')
    personService.getAll()
      .then(persons => {
        console.log('data received')
        setPersons(persons)
      })
  }

  useEffect(hook, [])
  console.log('rendered persons')

  const addEntry = (event) => {
    event.preventDefault()
    // console.log(event)
    const newPerson = {
      name: newName,
      number: newNumber
    }

    if (persons.some(person => person.name === newName)) {
      const person = persons.find(p => p.name == newName)
      if (!window.confirm(`${person.name} is already in the phonebook. Would you like to update their number?`))
        return

      console.log('want to update number');
      personService.update(person.id, newPerson).then(person => {
		personService.getAll()
		  .then(persons => {
			console.log('data received')
			setPersons(persons)
		  })
        setNewNumber('')
        setNewName('')

      })

    } else {
      personService.create(newPerson)
        .then(person => {
          console.log('creating this person ', newPerson)
          setPersons(persons.concat(newPerson))
          setNewNumber('')
          setNewName('')
        })
    }
  }

  const handleNameChange = (event) => {
    // console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    // console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    // console.log(event.target.value)
    setFilteredValue(event.target.value)
  }

  const deletePersonID = (person) => {
    // Implementation to delete a person with the given id
    console.log(`Deleting person with ID: ${person.id}`);
    // Perform actual deletion logic here
    if (!window.confirm(`Do you want to delete ${person.name}?`)) {
      return
    }

    //console.log('didn\'t return')
    console.log('going to delete person ', person.id)
    // console.log(persons)
    personService.del(person.id)
      .then(removedPerson => {
        //console.log('this is who i am going to remove', removedPerson)
        //console.log(persons)
        setPersons(persons.filter(p => p.id != person.id))
      })
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilter={handleFilter} filteredValue={filteredValue}></Filter>
      <PersonForm newName={newName} newNumber={newNumber} handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange} addEntry={addEntry}></PersonForm>
      <h2>Numbers</h2>
      {filteredPersons.map(person => {
        console.log('going to render ', person)
        return (
          <Person
            key={person.id}
            person={person}
            deletePerson={() => deletePersonID(person)}>
          </Person>
        )
      })
      }
    </div>
  )
}

export default App
