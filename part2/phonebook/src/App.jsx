import {useEffect, useState} from "react";
import Persons from "./components/Persons.jsx";
import PersonForm from "./components/PersonForm.jsx";
import Filter from "./components/Filter.jsx";
import personsService from "./services/persons.js"
import Notification from "./components/Notification.jsx";
import "./index.css"

const App = () => {
    const [persons, setPersons] = useState([])

    useEffect(() => {
        personsService
            .getAll()
            .then(initialPersons => {
                setPersons(initialPersons)
            })
    }, [])

    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [searchStr, setSearchStr] = useState('')
    const [searchEntries, setSearchEntries] = useState(false)
    const [notification, setNotification] = useState(null)
    const [notificationType, setNotificationType] = useState(null)

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

    const msg = (text, type) => {
        setNotificationType(type)
        setNotification(text)
        setTimeout(() => {
            setNotificationType(null)
            setNotification(null)
        }, 5000)
    }

    const handleNewName = (e) => setNewName(e.target.value)

    const handleNewNumber = (e) => setNewNumber(e.target.value)

    const updatePersonNumber = (id, personObj) => {
        personsService
            .update(id, personObj)
            .then(response => {
                setPersons(
                    persons.map(person => person.id === id ? response : person)
                )
                msg(`Updated ${personObj.name}`, "success")
                setNewName("")
                setNewNumber("")
            })
            .catch(() => {
                msg(
                    `Information on ${personObj.name} has already been removed from server`,
                    "error"
                )

                // Remove person to align w/ db:
                setPersons(
                    persons.filter(person => person.id !== id)
                )
            })

    }


    const addPerson = (e) => {
        e.preventDefault()

        if (isEmpty(newName) || isEmpty(newNumber)) {
            return alert("Please enter both a mame and phone number")
        }

        if (!isValidNumberFormat(newNumber)) {
            return alert(`${newNumber} is not a valid phone number`)
        }

        const [personInPhonebook] = persons.filter(person =>
            person.name.toLowerCase() === newName.toLowerCase()
        )

        if (personInPhonebook) {
            const confirmNumberUpdate = confirm(`${personInPhonebook.name} is already in the phonebook, replace the old number with a new one?`)
            confirmNumberUpdate
                ? updatePersonNumber(personInPhonebook.id, {...personInPhonebook, number: newNumber})
                : (setNewName(""), setNewNumber(""))
            return
        }

        const newPerson = {
            name: newName,
            number: newNumber,
        }

        personsService
            .create(newPerson)
            .then(response => {
                setPersons(persons.concat(response))
                msg(`Added ${newPerson.name}`, "success")
                setNewName('')
                setNewNumber('')
            })
    }

    const deletePerson = (id) => {
        const [personToDelete] = persons.filter(person => person.id === id)
        const confirmDelete = confirm(`Are you sure you wish to delete ${personToDelete.name} ?`)

        if (confirmDelete) {
            personsService
                .remove(id)
                .then(() => {
                        setPersons(persons.filter(person => person.id !== id))
                        msg(`Deleted ${personToDelete.name}`, "success")
                    }
                )
                .catch(() => {
                    alert(`${personToDelete.name} has already been deleted from the server`)
                    setPersons(persons.filter(person => person.id !== id))
                })
        }
    }

    return (
        <>
            <h2>Phonebook</h2>
            <Notification message={notification} type={notificationType}/>
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
            <Persons persons={contactsToShow} deletePerson={deletePerson}/>
        </>
    )
}

export default App
