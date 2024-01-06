
const Persons = ({persons, prefix}) => {
    return (
        <ul>
            {persons.filter((person) => person.name.toLowerCase().startsWith(prefix.toLowerCase()))
                .map((person) => <li key={person.id}>{person.name} {person.number}</li>
                )}
        </ul>
    )
}

export default Persons