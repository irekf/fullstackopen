import {useEffect, useState} from 'react'

import Filter from './components/Filter'
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"
import personsService from "./services/persons"

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [prefix, setPrefix] = useState('')

    useEffect(() => {
        personsService.getAll()
            .then((remotePersons) => setPersons(remotePersons))
            .catch((error) => alert(`Persons not fetched: \"${error}\"`))
    }, [])

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
            personsService.add(newName, newNumber)
                .then((newEntry) => {
                    setPersons(persons.concat(newEntry))
                    setNewName('')
                    setNewNumber('')
                })
                .catch((error) => alert(`New entry not added: \"${error}\"`))
        } else {
            alert(`${newName} is already added to phonebook`)
        }
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter prefix={prefix} onPrefixChange={(e) => setPrefix(e.target.value)}/>
            <h3>Add a new entry</h3>
            <PersonForm name={newName} onNameChange={(e) => setNewName(e.target.value)}
                        phoneNumber={newNumber} onPhoneNumberChange={(e) => setNewNumber(e.target.value)}
                        onSubmit={addNumber}/>
            <h3>Numbers</h3>
            <Persons persons={persons} prefix={prefix}/>
        </div>
    )
}

export default App
