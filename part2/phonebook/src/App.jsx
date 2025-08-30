import {useState} from "react";
import Persons from "./components/Persons.jsx";
import PersonForm from "./components/PersonForm.jsx";
import Filter from "./components/Filter.jsx";

const App = () => {
    const [persons, setPersons] = useState([
        {name: 'Arto Hellas', number: '040-123456', id: 1},
        {name: 'Ada Lovelace', number: '39-44-5323523', id: 2},
        {name: 'Dan Abramov', number: '12-43-234345', id: 3},
        {name: 'Mary Poppendieck', number: '39-23-6423122', id: 4}
    ])

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
            id: persons.length + 1
        }

        setPersons(persons.concat(newPerson))
        setNewName('')
        setNewNumber('')
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
