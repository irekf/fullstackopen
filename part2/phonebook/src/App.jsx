import {useState, useEffect} from 'react'

import axios from 'axios'

import Filter from './components/Filter'
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"

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

    useEffect(() => {
        axios.get("http://localhost:3001/persons").then((resp) => setPersons(resp.data))
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
