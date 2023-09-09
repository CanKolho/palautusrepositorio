const Persons = ({ persons, filterValue }) => {
  return (
    <>
      {persons
        .filter(person =>
          person.name.toLocaleLowerCase().includes(filterValue.toLocaleLowerCase())
        )
        .map(person =>
          <p key={person.name}>{person.name} {person.number}</p>
      )}
    </>
  )
}

export default Persons