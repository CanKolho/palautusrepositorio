const Persons = ({ persons, filterValue, handleClick }) => {
  return (
    <>
      {persons
        .filter(person =>
          person.name.toLocaleLowerCase().includes(filterValue.toLocaleLowerCase())
        )
        .map(person =>
          <p key={person.id}>
            {person.name} {person.number}
            <button onClick={() => handleClick(person.id)}>Delete</button>
          </p>
        )
      }
    </>
  )
}

export default Persons