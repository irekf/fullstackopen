import { useState } from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        {id: 0, name: 'Arto Hellas'}
    ])
    const [newName, setNewName] = useState('')

    const addNumber = (event) => {
        event.preventDefault()
        if (newName.length === 0) {
            return
        }
        if (!persons.find((element) => element.name === newName)) {
            setPersons(persons.concat({id: persons.length, name: newName}))
            setNewName('')
        } else {
            alert(`${newName} is already added to phonebook`)
        }
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={addNumber}>
                <div>
                    name: <input value={newName} onChange={(e) => {
                    setNewName(e.target.value)
                }}/>
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            <ul>
                {persons.map((person) =>
                    <li key={person.id}>{person.name}</li>
                )}
            </ul>
        </div>
    )
}

export default App
