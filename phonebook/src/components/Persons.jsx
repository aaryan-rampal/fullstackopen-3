const Persons = ({ filteredPersons, deletePerson }) => {
  return (
    <div>
      {filteredPersons.map(person =>
        <p key={person.name}>{person.name} {person.number}
          <button onClick={deletePerson}>delete</button></p>)}
    </div>
  )
}

export default Persons