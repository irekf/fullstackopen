const Persons = ({persons, prefix, onDelete}) => {
    return (
        <ul>
            {persons.filter((person) => person.name.toLowerCase().startsWith(prefix.toLowerCase()))
                .map((person) => <li key={person._id}>{person.name} {person.number}
                        &nbsp;
                        <button onClick={() => {
                            if (window.confirm(`Do you really want to delete ${person.name}?`)) {
                                onDelete(person)
                            }
                        }}>delete
                        </button>
                    </li>
                )}
        </ul>
    )
}

export default Persons