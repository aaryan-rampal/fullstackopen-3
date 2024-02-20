const Person = ({person, deletePerson}) => {
  console.log('have gotten', person, deletePerson)
  return (
    // <p key={person.id}>{person.name} {person.number}
    //   {/* <button onClick={deletePerson}>delete</button></p> */}
    //   </p>
    <p key={person.name}>{person.name} {person.number}
      <button onClick={deletePerson}>delete</button></p>)
}

export default Person