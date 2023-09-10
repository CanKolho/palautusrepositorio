const Persons = ({ persons, filterValue }) => {
  return (
    <>
      {persons
        .filter(person =>
          person.name.toLocaleLowerCase().includes(filterValue.toLocaleLowerCase())
        )
        .map(person =>
          <p key={person.id}>{person.name} {person.number}</p>
      )}
    </>
  )
}

export default Persons