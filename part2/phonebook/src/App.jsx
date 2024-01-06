import { useState } from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        {
            id: 0,
            name: 'Arto Hellas',
            number: "040-7654321",
        }
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [prefix, setPrefix] = useState('')

    const addNumber = (event) => {
        event.preventDefault()
        if (newName.length === 0) {
            alert(`Enter a name`)
            return
        }
        if (newNumber.length === 0) {
            alert(`Enter a number`)
            return
        }
        if (!persons.find((element) => element.name === newName)) {
            setPersons(persons.concat({id: persons.length, name: newName, number: newNumber}))
            setNewName('')
            setNewNumber('')
        } else {
            alert(`${newName} is already added to phonebook`)
        }
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <div>filter shown with <input value={prefix} onChange={(e) => setPrefix(e.target.value)}/></div>
            <h2>add a new</h2>
            <form onSubmit={addNumber}>
                <div>
                    name: <input value={newName} onChange={(e) => setNewName(e.target.value)}/>
                </div>
                <div>
                    number: <input value={newNumber} onChange={(e) => setNewNumber(e.target.value)}/>
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            <ul>
                {persons.filter((person) => person.name.toLowerCase().startsWith(prefix.toLowerCase()))
                    .map((person) => <li key={person.id}>{person.name} {person.number}</li>
                    )}
            </ul>
        </div>
    )
}

export default App
