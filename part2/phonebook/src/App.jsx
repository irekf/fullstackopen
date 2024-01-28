import {useEffect, useState} from 'react'

import Filter from './components/Filter'
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"
import Notification, {MessageType} from "./components/Notification"
import personsService from "./services/persons"

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [prefix, setPrefix] = useState('')
    const [messageType, setMessageType] = useState(MessageType.Info)
    const [messageText, setMessageText] = useState(null)

    const printTempMessage = (messageText, messageType) => {
        setMessageText(messageText)
        setMessageType(messageType)
        setTimeout(() => setMessageText(null), 5000)
    }

    useEffect(() => {
        personsService.getAll()
            .then((remotePersons) => setPersons(remotePersons))
            .catch((error) => {
                if (error.response.data.error) {
                    printTempMessage(`Persons not fetched: \"${error.response.data.error}\"`,
                        MessageType.Error)
                } else {
                    printTempMessage(`Persons not fetched: \"${error}\"`, MessageType.Error)
                }
            })
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
        const existingEntry = persons.find((element) => element.name === newName)
        if (!existingEntry) {
            personsService.add(newName, newNumber)
                .then((newEntry) => {
                    setPersons(persons.concat(newEntry))
                    setNewName('')
                    setNewNumber('')
                    printTempMessage(`Entry added for ${newName}`, MessageType.Info)
                })
                .catch((error) => {
                    if (error.response.data.error) {
                        printTempMessage(`New entry not added: \"${error.response.data.error}\"`,
                            MessageType.Error)
                    } else {
                        printTempMessage(`New entry not added: \"${error}\"`, MessageType.Error)
                    }
                })
        } else {
            if (window.confirm(`${newName} is already in the phone book. Update the number?`)) {
                personsService.update(existingEntry._id, newName, newNumber)
                    .then((updatedEntry) => {
                        setPersons(persons.map((entry) => updatedEntry._id === entry._id ? updatedEntry : entry))
                        setNewName('')
                        setNewNumber('')
                        printTempMessage(`Entry updated for ${newName}`, MessageType.Info)
                    })
                    .catch((error) => {
                        if (error.response.data.error) {
                            printTempMessage(`Existing entry not updated: \"${error.response.data.error}\"`,
                                MessageType.Error)
                        } else {
                            printTempMessage(`Existing entry not updated: \"${error}\"`, MessageType.Error)
                        }
                    })
            }
        }
    }

    return (<div>
            <h2>Phonebook</h2>
            <Notification message={messageText} messageType={messageType}/>
            <Filter prefix={prefix} onPrefixChange={(e) => setPrefix(e.target.value)}/>
            <h3>Add a new entry</h3>
            <PersonForm name={newName} onNameChange={(e) => setNewName(e.target.value)}
                        phoneNumber={newNumber} onPhoneNumberChange={(e) => setNewNumber(e.target.value)}
                        onSubmit={addNumber}/>
            <h3>Numbers</h3>
            <Persons persons={persons} prefix={prefix} onDelete={(person) => {
                personsService.remove(person._id)
                    .then((status) => {
                        setPersons(persons.filter((p) => p._id !== person._id))
                        printTempMessage(`Entry removed for ${person.name}`, MessageType.Info)
                    })
                    .catch((error) => {
                        if (error.response.data.error) {
                            printTempMessage(`Entry for ${person.name} not deleted: \"${error.response.data.error}\"`,
                                MessageType.Error)
                        } else {
                            printTempMessage(`Entry for ${person.name} not deleted: \"${error}\"`, MessageType.Error)
                        }
                    })
            }}/>
        </div>)
}

export default App
