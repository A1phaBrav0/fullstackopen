import {useEffect, useState} from "react";
import Persons from "./components/Persons.jsx";
import PersonForm from "./components/PersonForm.jsx";
import Filter from "./components/Filter.jsx";
import axios from "axios";

const App = () => {
    const [persons, setPersons] = useState([])

    useEffect(() => {
        axios
            .get('http://localhost:3001/persons')
            .then(response => {
                setPersons(response.data)
            })
    }, [])

    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [searchStr, setSearchStr] = useState('')
    const [searchEntries, setSearchEntries] = useState(false)

    const isEmpty = (string) => !string.replace(/\s/g, '').length

    const isValidNumberFormat = (string) => {
        const numberFormat = /^(?:[0-9\-\\()\/.]\s?){6,15}[0-9]{1}$/
        return numberFormat.test(string)
    }

    const handleSearchFocus = (e) => {
        setSearchEntries(true)
        setSearchStr(e.target.value)
    }

    const contactsToShow = searchEntries
        ? persons.filter(person => person.name.toLowerCase().includes(searchStr.toLowerCase()))
        : persons

    const handleNewName = (e) => setNewName(e.target.value)

    const handleNewNumber = (e) => setNewNumber(e.target.value)

    const addPerson = (e) => {
        e.preventDefault()

        if (isEmpty(newName) || isEmpty(newNumber)) {
            return alert("Please enter both a mame and phone number")
        }

        const nameInPhonebook = persons.some(person =>
            person.name.toLowerCase() === newName.toLowerCase()
        )

        if (nameInPhonebook) {
            return alert(`${newName} has already been added to the phonebook`)
        }

        if (!isValidNumberFormat(newNumber)) {
            return alert(`${newNumber} is not a valid phone number`)
        }

        const newPerson = {
            name: newName,
            number: newNumber,
        }

        axios
            .post('http://localhost:3001/persons', newPerson)
            .then(response => {
                setPersons(persons.concat(response.data))
                setNewName('')
                setNewNumber('')
            })

    }

    return (
        <>
            <h2>Phonebook</h2>
            <Filter
                searchStr={searchStr}
                handleSearchFocus={handleSearchFocus}
            />
            <h2>Add a new contact</h2>
            <PersonForm
                onSubmit={addPerson}
                newName={newName}
                newNumber={newNumber}
                handleNewName={handleNewName}
                handleNewNumber={handleNewNumber}
            />
            <h2>Numbers</h2>
            <Persons persons={contactsToShow}/>
        </>
    )
}

export default App
